# Telegram → Posts

## Вариант А (самый простой): публичный канал по ссылке

Если канал публичный (есть страница `https://t.me/<channel>`), можно парсить веб-версию:

1) Один раз задай переменную репозитория `TELEGRAM_CHANNEL`:
   `Settings → Secrets and variables → Actions → Variables`
2) Workflow **Telegram channel → posts** будет запускаться по расписанию (каждые ~5 минут)
3) При необходимости можно запускать вручную и передавать `channel` и `limit`

Workflow сгенерирует `src/content/telegram-posts.js` и закоммитит.

Ограничения: это парсинг HTML (может ломаться при изменениях Telegram), лучше подходит для последних N постов.

## Вариант B (надёжнее): экспорт Telegram Desktop (JSON)

1) Экспортируешь данные из Telegram Desktop в JSON
2) Кладёшь файл в репозиторий: `telegram/result.json`
3) Workflow **Telegram export → posts** генерирует `src/content/telegram-posts.js` и коммитит

`Settings → Advanced → Export Telegram data`

- Выбери нужный чат/канал
- Формат: **JSON**
- Экспортируй

Дальше скопируй получившийся JSON в `telegram/result.json`.

## Важно про приватность

Если репозиторий публичный, **не коммить личные чаты** — файл может содержать много персональных данных.
Для публичного репо лучше использовать отдельный канал/чат только под публикации.
