import fs from 'node:fs/promises';
import path from 'node:path';

function getArgValue(argv, name) {
  const idx = argv.indexOf(name);
  if (idx === -1) return null;
  const value = argv[idx + 1];
  if (!value || value.startsWith('--')) return null;
  return value;
}

function hasFlag(argv, name) {
  return argv.includes(name);
}

function usage() {
  // eslint-disable-next-line no-console
  console.log(
    [
      '',
      'Telegram public channel → posts (via https://t.me/s/<channel>)',
      '',
      'Пример:',
      '  npm run telegram:channel -- --channel "my_channel" --out "src/content/telegram-posts.js" --limit 40',
      '',
      'Опции:',
      '  --channel  username канала или ссылка (обязательно)',
      '  --out      куда сохранить модуль (по умолчанию: stdout)',
      '  --limit    сколько постов взять (по умолчанию: 40)',
      '  --help     помощь',
      '',
      'Ограничения:',
      '  - Работает только для публичных каналов.',
      '  - Это парсинг HTML и может ломаться, если Telegram поменяет верстку.',
      '  - Обычно вытягивает текст/ссылки/переносы строк, но не 100% всех вложений.',
      '',
    ].join('\n')
  );
}

function normalizeChannel(input) {
  const raw = String(input || '').trim();
  if (!raw) return '';

  const m = raw.match(/t\.me\/(?:s\/)?([A-Za-z0-9_]{4,})/i);
  if (m) return m[1];
  return raw.replace(/^@/, '');
}

function decodeHtmlEntities(s) {
  return String(s || '')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&#x27;', "'")
    .replaceAll('&#x2F;', '/');
}

function stripTags(html) {
  return String(html || '')
    .replaceAll(/<br\s*\/?>/gi, '\n')
    .replaceAll(/<\/p>\s*<p>/gi, '\n\n')
    .replaceAll(/<\/?p[^>]*>/gi, '')
    .replaceAll(/<\/?strong[^>]*>/gi, '')
    .replaceAll(/<\/?b[^>]*>/gi, '')
    .replaceAll(/<\/?em[^>]*>/gi, '')
    .replaceAll(/<\/?i[^>]*>/gi, '')
    .replaceAll(/<\/?u[^>]*>/gi, '')
    .replaceAll(/<\/?span[^>]*>/gi, '')
    .replaceAll(/<\/?div[^>]*>/gi, '')
    .replaceAll(/<\/?a[^>]*>/gi, '')
    .replaceAll(/<[^>]+>/g, '');
}

function escapeJsString(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\r', '')
    .replaceAll('\n', '\\n');
}

function makeTitle(text) {
  const clean = String(text || '').trim().replaceAll(/\s+/g, ' ');
  if (!clean) return 'Без названия';
  if (clean.length <= 56) return clean;
  return `${clean.slice(0, 56).trim()}…`;
}

function pickTextFromMessageBlock(blockHtml) {
  const m = blockHtml.match(
    /tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/i
  );
  if (!m) return '';
  const html = m[1];
  const text = decodeHtmlEntities(stripTags(html));
  return text.trim();
}

function pickDateFromMessageBlock(blockHtml) {
  const m = blockHtml.match(
    /tgme_widget_message_date[^>]*>[\s\S]*?<time[^>]*datetime="([^"]+)"/i
  );
  return m ? String(m[1]).trim() : '';
}

function pickPostIdFromMessageBlock(blockHtml) {
  const m = blockHtml.match(/data-post="([^"]+)"/i);
  if (!m) return null;
  const v = String(m[1] || '');
  const parts = v.split('/');
  const idRaw = parts[1] || '';
  const id = Number.parseInt(idRaw, 10);
  return Number.isFinite(id) ? id : null;
}

function parseMessagesFromPage(html) {
  const blocks = [];
  const re = /<div class="tgme_widget_message[^"]*"[^>]*data-post="[^"]+"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
  let m;
  while ((m = re.exec(html))) blocks.push(m[0]);

  const out = [];
  for (const block of blocks) {
    const postId = pickPostIdFromMessageBlock(block);
    const date = pickDateFromMessageBlock(block);
    const text = pickTextFromMessageBlock(block);
    if (!text) continue;
    if (!postId) continue;

    out.push({ postId, date: date || '', text });
  }
  return out;
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
      accept: 'text/html',
    },
  });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} (${url})`);
  }
  return res.text();
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const argv = process.argv.slice(2);
  if (hasFlag(argv, '--help') || hasFlag(argv, '-h')) {
    usage();
    process.exit(0);
  }

  const channelArg = getArgValue(argv, '--channel');
  if (!channelArg) {
    usage();
    process.exit(1);
  }
  const channel = normalizeChannel(channelArg);
  if (!channel) {
    usage();
    process.exit(1);
  }

  const outPath = getArgValue(argv, '--out');
  const limitRaw = getArgValue(argv, '--limit');
  const limit = limitRaw ? Number.parseInt(limitRaw, 10) : 40;
  const max = Number.isFinite(limit) && limit > 0 ? limit : 40;

  const all = [];
  let before = null;

  while (all.length < max) {
    const url = before
      ? `https://t.me/s/${encodeURIComponent(channel)}?before=${before}`
      : `https://t.me/s/${encodeURIComponent(channel)}`;

    const html = await fetchPage(url);
    const items = parseMessagesFromPage(html);
    if (!items.length) break;

    for (const it of items) {
      if (all.length >= max) break;
      all.push(it);
    }

    const last = items[items.length - 1];
    before = last?.postId;
    if (!before) break;

    await sleep(450);
  }

  const posts = all.map((m) => {
    const dateIso = m.date || new Date().toISOString();
    const idDate = dateIso.slice(0, 10) || 'unknown-date';
    const id = `${idDate}-tg-${m.postId}`;
    const firstLine = m.text.split('\n')[0];

    return {
      id,
      date: dateIso,
      title: makeTitle(firstLine),
      tags: ['telegram'],
      text: m.text,
    };
  });

  const header =
    `// Generated from https://t.me/${channel}\n` +
    `// Generated at: ${new Date().toISOString()}\n` +
    `// Tip: this file is safe to commit.\n`;

  const body =
    'export const telegramPosts = [\n' +
    posts
      .map((p) => {
        const tags = p.tags.map((t) => `'${escapeJsString(t)}'`).join(', ');
        return (
          `  {\n` +
          `    id: '${escapeJsString(p.id)}',\n` +
          `    date: '${escapeJsString(p.date)}',\n` +
          `    title: '${escapeJsString(p.title)}',\n` +
          `    tags: [${tags}],\n` +
          `    text: '${escapeJsString(p.text)}',\n` +
          `  }`
        );
      })
      .join(',\n') +
    '\n];\n';

  const output = header + body;

  if (!outPath) {
    // eslint-disable-next-line no-console
    console.log(output);
    return;
  }

  const abs = path.resolve(process.cwd(), outPath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, output, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Saved: ${outPath} (${posts.length} posts)`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

