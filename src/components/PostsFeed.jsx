import React from 'react';
import { Clock3, Wrench } from 'lucide-react';

export default function PostsFeed() {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-950/50 text-violet-300">
          <Wrench className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-neutral-50">
            Посты и загрузка временно недоступны
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Раздел сейчас на техническом обслуживании. Публикация постов и
            загрузка из Telegram будут возвращены после обновления.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/40 px-3 py-2 text-xs text-neutral-300">
            <Clock3 className="h-4 w-4 text-neutral-400" />
            Тех. обслуживание
          </div>
        </div>
      </div>
    </section>
  );
}
