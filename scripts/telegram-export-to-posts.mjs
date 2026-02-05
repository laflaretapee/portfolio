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

function normalizeTelegramText(text) {
  if (typeof text === 'string') return text;
  if (!Array.isArray(text)) return '';

  let out = '';
  for (const part of text) {
    if (typeof part === 'string') {
      out += part;
      continue;
    }
    if (part && typeof part === 'object' && 'text' in part) {
      out += String(part.text ?? '');
      continue;
    }
  }
  return out;
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

function usage() {
  // eslint-disable-next-line no-console
  console.log(
    [
      '',
      'Telegram export → posts (for portfolio feed)',
      '',
      'Как получить JSON:',
      '  Telegram Desktop → Settings → Advanced → Export Telegram data',
      '  Выбери чат/канал → формат JSON → экспортируй.',
      '',
      'Пример:',
      '  npm run telegram:export -- --in ./telegram/result.json --out ./src/content/telegram-posts.js --from "Динар Зиязетдинов" --limit 50',
      '',
      'Опции:',
      '  --in    путь к JSON (обязательно)',
      '  --out   куда сохранить модуль (по умолчанию: stdout)',
      '  --from  фильтр по полю "from" (опционально)',
      '  --limit максимум сообщений (опционально)',
      '  --help  помощь',
      '',
    ].join('\n')
  );
}

async function main() {
  const argv = process.argv.slice(2);

  if (hasFlag(argv, '--help') || hasFlag(argv, '-h')) {
    usage();
    process.exit(0);
  }

  const inPath = getArgValue(argv, '--in');
  if (!inPath) {
    usage();
    process.exit(1);
  }

  const outPath = getArgValue(argv, '--out');
  const fromFilter = getArgValue(argv, '--from');
  const limitRaw = getArgValue(argv, '--limit');
  const limit = limitRaw ? Number.parseInt(limitRaw, 10) : null;

  const raw = await fs.readFile(inPath, 'utf8');
  const data = JSON.parse(raw);
  const messages = Array.isArray(data?.messages) ? data.messages : [];

  const items = [];
  for (const m of messages) {
    if (!m || m.type !== 'message') continue;
    if (fromFilter && String(m.from || '').trim() !== fromFilter) continue;

    const text = normalizeTelegramText(m.text).trim();
    if (!text) continue;

    const date = String(m.date || '').trim();
    const idSuffix = m.id != null ? String(m.id) : String(items.length + 1);
    const idDate = date ? date.slice(0, 10) : 'unknown-date';

    items.push({
      id: `${idDate}-tg-${idSuffix}`,
      date: date || new Date().toISOString(),
      title: makeTitle(text.split('\n')[0]),
      tags: ['telegram'],
      text,
    });

    if (limit && items.length >= limit) break;
  }

  const name = String(data?.name || '').trim();
  const header = `// Generated from Telegram export (${escapeJsString(
    name || path.basename(inPath)
  )}).\n// Tip: merge this array into src/content/posts.js\n`;

  const body =
    'export const telegramPosts = [\n' +
    items
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
  console.log(`Saved: ${outPath} (${items.length} posts)`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
