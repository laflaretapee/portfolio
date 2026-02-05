import React, { useMemo, useState } from 'react';
import { ArrowLeft, KeyRound, LogIn, ShieldCheck } from 'lucide-react';
import { isAdminSession, loginAdmin, logoutAdmin } from '../auth/admin';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function parseHashSearch() {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return new URLSearchParams();
  return new URLSearchParams(hash.slice(qIndex + 1));
}

function goToHome() {
  if (typeof window === 'undefined') return;
  window.location.hash = '';
}

export default function Login() {
  const initialParams = useMemo(() => parseHashSearch(), []);
  const [user, setUser] = useState(initialParams.get('u') || '');
  const [pass, setPass] = useState(initialParams.get('p') || '');
  const [error, setError] = useState('');

  const authed = isAdminSession();

  function onSubmit(e) {
    e.preventDefault();
    setError('');
    const res = loginAdmin({ user, pass });
    if (!res.ok) {
      setError('Неверный логин или пароль.');
      return;
    }
    goToHome();
  }

  function onLogout() {
    logoutAdmin();
    setError('');
  }

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_15%,rgba(139,92,246,0.22),transparent_60%),radial-gradient(900px_circle_at_80%_40%,rgba(34,211,238,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.9))]" />
      </div>

      <div className="mx-auto w-full max-w-xl px-4 pt-10 sm:pt-14">
        <button
          onClick={goToHome}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-700 hover:bg-neutral-950/60"
        >
          <ArrowLeft className="h-4 w-4 text-neutral-500" />
          Назад
        </button>

        <div className="mt-6 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-neutral-400">Автор</div>
              <h1 className="mt-1 text-2xl font-semibold text-neutral-50">
                Вход для постов
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Это клиентский «замок» для режима автора. Для GH Pages это не
                является настоящей защитой: пароль можно найти в исходниках.
              </p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950/30">
              <KeyRound className="h-5 w-5 text-violet-300" />
            </div>
          </div>

          {authed ? (
            <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-50">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Вы уже вошли
              </div>
              <div className="mt-2 text-sm text-neutral-400">
                Теперь в разделе «Посты» доступна кнопка «Новый пост».
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={goToHome}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-violet-400"
                >
                  Перейти на сайт
                </button>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-700"
                >
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <label className="grid gap-1">
                <span className="text-xs text-neutral-400">Логин</span>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-violet-400/50 focus:outline-none"
                  placeholder="dinar"
                  autoComplete="username"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs text-neutral-400">Пароль</span>
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-violet-400/50 focus:outline-none"
                  placeholder="••••••"
                  autoComplete="current-password"
                />
              </label>

              {error ? (
                <div className="rounded-xl border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className={cx(
                  'mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition',
                  'bg-violet-500 text-neutral-950 hover:bg-violet-400'
                )}
              >
                <LogIn className="h-4 w-4" />
                Войти
              </button>

              <div className="text-xs text-neutral-500">
                Быстрый вход через ссылку:{' '}
                <span className="font-medium text-neutral-300">
                  #/login?u=dinar&amp;p=123
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

