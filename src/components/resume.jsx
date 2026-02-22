import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Brain,
  Briefcase,
  Code,
  Github,
  GraduationCap,
  Mail,
  Phone,
  Send,
  User,
  X,
} from 'lucide-react';
import DinarPhoto from './Dinar.jpg';
import PostsFeed from './PostsFeed';

const personalInfo = {
  name: 'Динар Зиязетдинов',
  title: 'Backend разработчик',
  tagline: 'FastAPI / Django • Telegram боты • Flutter • немного фронта',
  email: 'dinar.ziyazetdinov@bk.ru',
  phone: '+7 (927) 636-2683',
  github: 'https://github.com/laflaretapee',
  telegram: 'https://t.me/dinar_ziyazetdinov',
  telegramHandle: '@dinar_ziyazetdinov',
};

const experience = [
  {
    role: 'Младший разработчик',
    company: 'Roscomtech',
    period: '2024 — настоящее время',
    description:
      'Создание и поддержка веб-приложений (FastAPI, Django), разработка Telegram-ботов на Python, участие в мобильной разработке (Flutter).',
  },
];

const education = [
  {
    place: 'Уфимский университет науки и технологий',
    period: '2022 — н.в.',
    description:
      'Информатика и вычислительная техника, кафедра автоматизированных систем управления.',
  },
];

const projects = [
  {
    title: 'Сайт-визитка для Радмира Фаизова',
    description:
      'Лендинг для привлечения людей, которые хотят узнать больше об основателе компании JSAN.',
    href: 'https://radmirfaizov.ru/',
    tags: ['HTML', 'CSS', 'JS', 'WordPress'],
  },
  {
    title: 'Todo приложение в Telegram',
    description:
      'Система для отслеживания достижения задач. Пэт-проект (сейчас отключен от хостинга).',
    href: 'https://t.me/Progressoforlife_bot',
    tags: ['FastAPI', 'Python', 'Aiogram', 'React', 'PostgreSQL'],
  },
  {
    title: 'Сайт-визитка для дизайнера',
    description: 'Лендинг для привлечения клиентов для дизайнера.',
    href: 'https://davletovadesigner.ru/',
    tags: ['HTML', 'CSS', 'JS', 'WordPress'],
  },
  {
    title: 'Сайт-визитка для ораторского мастерства',
    description:
      'Лендинг для Светланы Пискарёвой (ораторское мастерство).',
    href: 'https://piskareva.pro/',
    tags: ['HTML', 'CSS', 'JS', 'WordPress'],
  },
  {
    title: 'AI Chat Bot',
    description:
      'Telegram бот с интеграцией OpenAI API для общения с искусственным интеллектом.',
    href: 'https://t.me/my_ai_chat_tbot',
    tags: ['Python', 'Aiogram', 'OpenAI API'],
  },
  {
    title: 'Pomodoro Tasky Bot',
    description: 'Telegram бот для тайм-менеджмента по технике Pomodoro.',
    href: 'https://t.me/PomodoroTasky_bot',
    tags: ['Python', 'Aiogram'],
  },
];

const skillGroups = [
  {
    title: 'Backend',
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
  },
  { title: 'Frontend', skills: ['React', 'Tailwind', 'HTML', 'CSS', 'JS'] },
  { title: 'Tools', skills: ['Git', 'Linux', 'CI/CD', 'Nginx'] },
  { title: 'Other', skills: ['Golang (base)', 'Flutter (base)'] },
];

const navItems = [
  { id: 'about', label: 'Обо мне', icon: User },
  { id: 'experience', label: 'Опыт', icon: Briefcase },
  { id: 'education', label: 'Образование', icon: GraduationCap },
  { id: 'skills', label: 'Навыки', icon: Code },
  { id: 'thoughts', label: 'Посты', icon: Brain },
];

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-xs text-neutral-200">
      {children}
    </span>
  );
}

function Card({ title, subtitle, children, actions }) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-neutral-50">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>
      <div className="mt-4 text-sm text-neutral-200/90">{children}</div>
    </section>
  );
}

const Resume = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [showProjects, setShowProjects] = useState(false);

  const activeNav = useMemo(
    () => navItems.find((it) => it.id === activeSection),
    [activeSection]
  );

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_15%_20%,rgba(139,92,246,0.25),transparent_60%),radial-gradient(900px_circle_at_85%_35%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(900px_circle_at_50%_85%,rgba(244,114,182,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.9))]" />
      </div>

      <header className="mx-auto w-full max-w-5xl px-4 pt-10 sm:pt-14">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/35 p-4 sm:w-auto sm:border-0 sm:bg-transparent sm:p-0">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left">
                <div className="h-36 w-36 overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-900 shadow-sm sm:h-28 sm:w-28 sm:rounded-2xl">
                  <img
                    src={DinarPhoto}
                    alt="Фото профиля"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-200 sm:text-4xl">
                    {personalInfo.name}
                  </h1>
                  <p className="mt-1 text-sm text-neutral-300 sm:text-base">
                    {personalInfo.title}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">
                    {personalInfo.tagline}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 no-underline hover:border-neutral-700 hover:bg-neutral-950/60 sm:w-auto"
              >
                <Mail className="h-4 w-4 text-violet-300" />
                Email
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 no-underline hover:border-neutral-700 hover:bg-neutral-950/60 sm:w-auto"
              >
                <Github className="h-4 w-4 text-neutral-200" />
                GitHub
                <ArrowUpRight className="h-4 w-4 text-neutral-500" />
              </a>
              <a
                href={personalInfo.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-neutral-950 no-underline hover:bg-violet-400 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {personalInfo.telegramHandle}
              </a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
              <div className="text-xs text-neutral-400">Фокус</div>
              <div className="mt-1 text-sm text-neutral-100">
                Backend + продукты
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
              <div className="text-xs text-neutral-400">Стек</div>
              <div className="mt-1 text-sm text-neutral-100">
                Python • FastAPI • Postgres
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
              <div className="text-xs text-neutral-400">Контакт</div>
              <div className="mt-1 flex items-center gap-2 text-sm text-neutral-100">
                <Phone className="h-4 w-4 text-neutral-400" />
                <span className="truncate">{personalInfo.phone}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
              <div className="text-xs text-neutral-400">Сейчас</div>
              <div className="mt-1 text-sm text-neutral-100">
                Открыт к предложениям
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-20 mt-6 border-y border-neutral-800 bg-neutral-950/60 backdrop-blur">
        <div className="mx-auto w-full max-w-5xl px-2 py-2 sm:px-4">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.id === activeSection;
              const isLastOddMobile =
                navItems.length % 2 !== 0 && index === navItems.length - 1;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cx(
                    'flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition sm:flex-1 sm:text-sm',
                    isLastOddMobile ? 'col-span-2' : '',
                    isActive
                      ? 'border border-neutral-800 bg-neutral-900 text-neutral-50'
                      : 'text-neutral-300 hover:text-neutral-50'
                  )}
                >
                  <Icon
                    className={cx(
                      'h-4 w-4',
                      isActive ? 'text-violet-300' : 'text-neutral-400'
                    )}
                  />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-neutral-400">
          <div className="h-1.5 w-1.5 rounded-full bg-violet-400/70" />
          <span className="truncate">{activeNav?.label}</span>
        </div>

        {activeSection === 'about' && (
          <Card
            title="Обо мне"
            subtitle="Коротко, по делу и без воды — как я люблю в коде."
          >
            <div className="space-y-4 leading-relaxed">
              <p>
                Я делаю веб-приложения и ботов с упором на надежность, скорость
                и понятную архитектуру. Люблю, когда сервисы «не падают», а
                интерфейсы не мешают пользователю.
              </p>
              <p className="text-neutral-300">
                Этот сайт — портфолио и мини-блог. В разделе «Посты» я буду
                публиковать заметки про разработку, идеи, короткие разборы и
                то, что хочется сохранить «на потом».
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Chip>Backend</Chip>
                <Chip>APIs</Chip>
                <Chip>Telegram</Chip>
                <Chip>PostgreSQL</Chip>
                <Chip>Docker</Chip>
              </div>
            </div>
          </Card>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-5">
            <Card
              title="Опыт"
              subtitle="Работа, задачи и что я реально делал."
              actions={
                <button
                  onClick={() => setShowProjects(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-violet-400"
                >
                  Проекты
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              }
            >
              <div className="space-y-4">
                {experience.map((item) => (
                  <div
                    key={`${item.company}-${item.role}`}
                    className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm font-medium text-neutral-50">
                        {item.role}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {item.period}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-neutral-300">
                      {item.company}
                    </div>
                    <p className="mt-3 text-sm text-neutral-200/90">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              title="Что я ищу"
              subtitle="Формат и задачи, где я буду максимально полезен."
            >
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <li className="rounded-xl border border-neutral-800 bg-neutral-950/30 p-3 text-neutral-200">
                  Разработка backend-сервисов и интеграций
                </li>
                <li className="rounded-xl border border-neutral-800 bg-neutral-950/30 p-3 text-neutral-200">
                  Автоматизация и Telegram-экосистема
                </li>
                <li className="rounded-xl border border-neutral-800 bg-neutral-950/30 p-3 text-neutral-200">
                  Упор на качество: тесты, логирование, мониторинг
                </li>
                <li className="rounded-xl border border-neutral-800 bg-neutral-950/30 p-3 text-neutral-200">
                  Продуктовая разработка: скорость и предсказуемость
                </li>
              </ul>
            </Card>
          </div>
        )}

        {activeSection === 'education' && (
          <Card title="Образование" subtitle="Основное и то, что продолжаю качать.">
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.place}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm font-medium text-neutral-50">
                      {item.place}
                    </div>
                    <div className="text-xs text-neutral-400">{item.period}</div>
                  </div>
                  <p className="mt-3 text-sm text-neutral-200/90">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-5">
            <Card
              title="Навыки"
              subtitle="Стек, который реально использую в задачах."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4"
                  >
                    <div className="text-sm font-medium text-neutral-50">
                      {group.title}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <Chip key={skill}>{skill}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              title="Принципы"
              subtitle="Как я обычно принимаю решения в разработке."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
                  <div className="text-sm font-medium text-neutral-50">
                    Предсказуемость
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">
                    Контракты API, миграции, логирование — чтобы всё было
                    понятно и воспроизводимо.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
                  <div className="text-sm font-medium text-neutral-50">
                    Наблюдаемость
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">
                    Метрики, алерты, трассировки — чтобы знать, что происходит
                    в проде.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
                  <div className="text-sm font-medium text-neutral-50">
                    Простота
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">
                    Меньше магии, больше ясных решений, которые можно поддерживать.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-4">
                  <div className="text-sm font-medium text-neutral-50">
                    Скорость без хаоса
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">
                    Быстро — да. Но так, чтобы через месяц не было стыдно.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'thoughts' && <PostsFeed />}
      </main>

      <footer className="mt-10 border-t border-neutral-800 bg-neutral-950/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:underline"
            >
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="no-underline hover:underline"
            >
              Email
            </a>
            <a
              href={personalInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:underline"
            >
              {personalInfo.telegramHandle}
            </a>
          </div>
        </div>
      </footer>

      {showProjects && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowProjects(false)}
          />
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-800 px-5 py-4 sm:px-6">
              <div>
                <div className="text-sm text-neutral-400">Проекты</div>
                <h3 className="mt-1 text-lg font-semibold text-neutral-50">
                  Подборка работ
                </h3>
              </div>
              <button
                onClick={() => setShowProjects(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/40 text-neutral-200 hover:bg-neutral-900"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projects.map((p) => (
                  <a
                    key={p.title}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 no-underline transition hover:border-neutral-700 hover:bg-neutral-900/55"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-neutral-50">
                          {p.title}
                        </div>
                        <p className="mt-2 text-sm text-neutral-300">
                          {p.description}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500 transition group-hover:text-violet-300" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
