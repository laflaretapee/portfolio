import React, { useMemo, useState } from 'react';
import { Calendar, Copy, Hash, Plus, Search, X } from 'lucide-react';
import { posts as seedPosts } from '../content/posts';
import { isAdminSession, logoutAdmin } from '../auth/admin';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function toRuDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function normalizeText(text) {
  return String(text || '').trim();
}

function escapeJsString(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\r', '')
    .replaceAll('\n', '\\n');
}

function buildPostSnippet({ title, tags, text, dateIso }) {
  const safeTitle = escapeJsString(title);
  const safeText = escapeJsString(text);
  const safeTags = tags
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `'${escapeJsString(t)}'`);

  const shortDate = (dateIso || new Date().toISOString()).slice(0, 10);
  const slug = safeTitle
    .toLowerCase()
    .replaceAll(/[^a-z0-9а-яё]+/gi, '-')
    .replaceAll(/^-+|-+$/g, '')
    .slice(0, 48);
  const id = `${shortDate}-${slug || 'post'}`;

  return `{
  id: '${escapeJsString(id)}',
  date: '${escapeJsString(dateIso || new Date().toISOString())}',
  title: '${safeTitle}',
  tags: [${safeTags.join(', ')}],
  text: '${safeText}',
}`;
}

function Chip({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs no-underline transition',
        active
          ? 'border-violet-400/50 bg-violet-500/15 text-neutral-100'
          : 'border-neutral-800 bg-neutral-900/50 text-neutral-200 hover:border-neutral-700'
      )}
    >
      <Hash className="h-3.5 w-3.5 text-neutral-400" />
      {children}
    </button>
  );
}

export default function PostsFeed() {
  const isAdmin = isAdminSession();

  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [draftTitle, setDraftTitle] = useState('');
  const [draftTags, setDraftTags] = useState('');
  const [draftText, setDraftText] = useState('');
  const [draftDate, setDraftDate] = useState(() => new Date().toISOString());

  const posts = useMemo(() => {
    return [...seedPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  const tags = useMemo(() => {
    const set = new Set();
    for (const p of posts) {
      for (const t of p.tags || []) set.add(String(t));
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const text = `${p.title || ''}\n${p.text || ''}\n${(p.tags || []).join(
        ' '
      )}`.toLowerCase();
      const matchesQuery = !q || text.includes(q);
      const matchesTag = !tag || (p.tags || []).includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, tag]);

  const snippet = useMemo(() => {
    return buildPostSnippet({
      title: draftTitle,
      tags: draftTags.split(','),
      text: draftText,
      dateIso: draftDate,
    });
  }, [draftTitle, draftTags, draftText, draftDate]);

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-neutral-50">
              Посты / заметки
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Лента в стиле Telegram: коротко, по делу, с тегами и поиском.
            </p>
            {isAdmin ? (
              <p className="mt-2 text-xs text-neutral-500">
                Режим автора включён. Добавляй посты и копируй сниппет в{' '}
                <span className="font-medium text-neutral-300">
                  src/content/posts.js
                </span>
                .
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {isAdmin ? (
              <>
                <button
                  onClick={() => setComposerOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-violet-400"
                >
                  <Plus className="h-4 w-4" />
                  Новый пост
                </button>
                <button
                  onClick={() => {
                    logoutAdmin();
                    setComposerOpen(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-700"
                >
                  Выйти
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative flex-1">
            <span className="sr-only">Поиск</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по тексту и тегам…"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/40 py-2 pl-10 pr-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-violet-400/50 focus:outline-none"
            />
          </label>

          {tag ? (
            <button
              onClick={() => setTag('')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-700"
            >
              Сбросить тег
              <X className="h-4 w-4 text-neutral-500" />
            </button>
          ) : null}
        </div>

        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Chip key={t} active={t === tag} onClick={() => setTag(t)}>
                {t}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/35 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur"
          >
            <div className="flex gap-4">
              <div className="mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/40">
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-neutral-200">
                  DZ
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="text-sm font-semibold text-neutral-50">
                    {p.title || 'Без названия'}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{toRuDate(p.date)}</span>
                  </div>
                </div>

                <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-neutral-200/90">
                  {normalizeText(p.text)}
                </div>

                {(p.tags || []).length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(p.tags || []).map((t) => (
                      <Chip
                        key={`${p.id}-${t}`}
                        active={t === tag}
                        onClick={() => setTag(t === tag ? '' : t)}
                      >
                        {t}
                      </Chip>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}

        {!filtered.length ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/35 p-6 text-sm text-neutral-400">
            Ничего не найдено. Попробуй изменить запрос или сбросить тег.
          </div>
        ) : null}
      </div>

      {composerOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setComposerOpen(false)}
          />
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-800 px-5 py-4 sm:px-6">
              <div>
                <div className="text-sm text-neutral-400">Пост</div>
                <h3 className="mt-1 text-lg font-semibold text-neutral-50">
                  Новый пост (сниппет)
                </h3>
              </div>
              <button
                onClick={() => setComposerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/40 text-neutral-200 hover:bg-neutral-900"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-3">
                <label className="grid gap-1">
                  <span className="text-xs text-neutral-400">Заголовок</span>
                  <input
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-violet-400/50 focus:outline-none"
                    placeholder="Например: Как я дебажил прод ночью"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs text-neutral-400">
                    Теги (через запятую)
                  </span>
                  <input
                    value={draftTags}
                    onChange={(e) => setDraftTags(e.target.value)}
                    className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-violet-400/50 focus:outline-none"
                    placeholder="fastapi, postgres, заметки"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs text-neutral-400">Дата (ISO)</span>
                  <input
                    value={draftDate}
                    onChange={(e) => setDraftDate(e.target.value)}
                    className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-violet-400/50 focus:outline-none"
                    placeholder="2026-02-05T17:00:00+03:00"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs text-neutral-400">Текст</span>
                  <textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    rows={6}
                    className="resize-y rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-violet-400/50 focus:outline-none"
                    placeholder="Пиши как в Telegram: короткие абзацы, переносы строк."
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={copySnippet}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-violet-400"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Скопировано' : 'Скопировать сниппет'}
                </button>
                <div className="text-xs text-neutral-500">
                  Вставь сниппет в{' '}
                  <span className="font-medium text-neutral-300">
                    src/content/posts.js
                  </span>{' '}
                  и перезапусти dev-сервер.
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-xs text-neutral-400">Сниппет</div>
                <pre className="overflow-auto rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4 text-xs leading-relaxed text-neutral-200">
                  {snippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
