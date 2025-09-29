# sync-sum-ui

Современный React UI для сервиса счетчика с автоматическим обновлением и интуитивным интерфейсом.

## Возможности

- 🎯 **Простой интерфейс** — одна кнопка "Увеличить" и отображение текущего значения счетчика
- 🔄 **Автоматическое обновление** — счетчик обновляется каждые 3 секунды без взаимодействия пользователя
- ⚡ **Мгновенная обратная связь** — кнопка увеличивает счетчик с немедленным отображением результата
- 🎨 **Современный дизайн** — красивый UI с анимациями и адаптивной версткой
- 🔧 **Гибкая конфигурация** — настройка API URL и частоты обновления через переменные окружения
- 📱 **Адаптивность** — работает на всех устройствах

## Архитектура

```mermaid
flowchart TB
    subgraph "Frontend (React)"
        UI[CounterDisplay Component]
        Hook[useCounter Hook]
        API[Counter API Client]
        Config[Environment Config]
    end
    
    subgraph "Backend (sync-sum-api)"
        REST[REST API]
        DB[(PostgreSQL)]
    end
    
    UI --> Hook
    Hook --> API
    API --> REST
    REST --> DB
    
    Config --> API
    Config --> Hook
    
    Hook -.->|Auto-refresh| API
    
    style UI fill:#e1f5fe
    style Hook fill:#f3e5f5
    style API fill:#e8f5e8
    style REST fill:#fff3e0
    style DB fill:#fce4ec
```

## Технологический стек

- **React 18** — современная библиотека для создания пользовательских интерфейсов
- **TypeScript** — типизированный JavaScript для надежности кода
- **Vite** — быстрый инструмент сборки и разработки
- **Tailwind CSS** — utility-first CSS фреймворк для стилизации
- **Axios** — HTTP клиент для API запросов
- **Lucide React** — современные иконки
- **ESLint** — линтер для поддержания качества кода

## Структура проекта

```
sync-sum-ui/
├── src/
│   ├── components/          # React компоненты
│   │   └── CounterDisplay.tsx
│   ├── hooks/               # Пользовательские хуки
│   │   └── useCounter.ts
│   ├── lib/                 # Утилиты и API клиент
│   │   ├── api.ts
│   │   └── counterApi.ts
│   ├── main.tsx            # Точка входа приложения
│   └── index.css           # Глобальные стили
├── public/                 # Статические файлы
├── package.json            # Зависимости и скрипты
├── vite.config.ts          # Конфигурация Vite
├── tailwind.config.js      # Конфигурация Tailwind
├── tsconfig.json           # Конфигурация TypeScript
└── env.example             # Пример переменных окружения
```

## Поток данных

```mermaid
sequenceDiagram
    participant U as User
    participant C as CounterDisplay
    participant H as useCounter Hook
    participant A as API Client
    participant S as Backend Service
    
    Note over H: Initial Load
    H->>A: getCounter()
    A->>S: GET /counter
    S-->>A: { value: 42 }
    A-->>H: CounterResponse
    H-->>C: counter = 42
    
    Note over H: Auto-refresh (every 3s)
    loop Every 3 seconds
        H->>A: getCounter()
        A->>S: GET /counter
        S-->>A: { value: 42 }
        A-->>H: CounterResponse
        H-->>C: counter = 42
    end
    
    Note over U: User clicks "Увеличить"
    U->>C: Click increment button
    C->>H: increment()
    H->>A: incrementCounter()
    A->>S: POST /counter/increment
    S-->>A: { value: 43 }
    A-->>H: CounterResponse
    H-->>C: counter = 43
    C-->>U: Display updated counter
```

## Установка и запуск

### Требования

- Node.js 18+ 
- npm или yarn
- Запущенный сервис sync-sum-api

### Установка зависимостей

```bash
npm install
```

### Настройка переменных окружения

Скопируйте файл с примером переменных окружения:

```bash
cp env.example .env
```

Отредактируйте `.env` файл под ваши нужды:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080
VITE_REFRESH_INTERVAL=3000
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

### Предварительный просмотр продакшен сборки

```bash
npm run preview
```

## Конфигурация

### Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `VITE_API_BASE_URL` | Базовый URL API сервиса | `http://localhost:8080` |
| `VITE_REFRESH_INTERVAL` | Интервал автообновления в миллисекундах | `3000` |

### Настройка API

API клиент автоматически подключается к сервису sync-sum-api и использует следующие эндпоинты:

- `GET /counter` — получение текущего значения счетчика
- `POST /counter/increment` — увеличение счетчика на 1

## Компоненты

### CounterDisplay

Основной компонент приложения, который отображает:

- Текущее значение счетчика
- Кнопку "Увеличить"
- Кнопку "Обновить" 
- Индикаторы состояния (загрузка, ошибки)
- Информацию о конфигурации

### useCounter Hook

Пользовательский хук, который управляет:

- Состоянием счетчика
- Загрузкой данных
- Обработкой ошибок
- Автоматическим обновлением
- Ручным обновлением и инкрементом

## API Client

### counterApi

Модуль для взаимодействия с backend API:

- `getCounter()` — получение текущего значения
- `incrementCounter()` — увеличение счетчика
- Автоматическая обработка ошибок
- Типизированные ответы

## Стилизация

Приложение использует Tailwind CSS с кастомными компонентами:

- **Цветовая схема**: Синяя палитра с градиентами
- **Анимации**: Плавные переходы и индикаторы загрузки
- **Адаптивность**: Мобильно-первый подход
- **Доступность**: Поддержка клавиатурной навигации и screen readers

## Разработка

### Доступные скрипты

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Проверка типов TypeScript
npm run type-check

# Линтинг кода
npm run lint

# Исправление ошибок линтера
npm run lint:fix

# Предварительный просмотр сборки
npm run preview
```

### Структура кода

- **Компоненты**: Функциональные компоненты с TypeScript
- **Хуки**: Кастомные хуки для логики состояния
- **API**: Типизированные функции для работы с API
- **Стили**: Utility-first подход с Tailwind CSS

## Обработка ошибок

Приложение включает комплексную обработку ошибок:

- **Сетевые ошибки**: Отображение сообщений о проблемах с подключением
- **Ошибки сервера**: Показ статус-кодов и сообщений от API
- **Таймауты**: Автоматическое прерывание долгих запросов
- **Fallback UI**: Отображение состояния ошибки вместо краша

## Производительность

- **Автоматическое обновление**: Оптимизировано для минимального потребления ресурсов
- **Мемоизация**: Использование useCallback для предотвращения лишних ререндеров
- **Ленивая загрузка**: Компоненты загружаются по требованию
- **Оптимизация сборки**: Vite обеспечивает быструю сборку и HMR

## Безопасность

- **Валидация данных**: Проверка типов на уровне TypeScript
- **Санитизация**: Очистка пользовательского ввода
- **HTTPS**: Поддержка защищенных соединений
- **CORS**: Правильная настройка для работы с API

## Тестирование

Для тестирования рекомендуется использовать:

- **Jest** — для unit тестов
- **React Testing Library** — для тестирования компонентов
- **Cypress** — для e2e тестов
- **MSW** — для мокирования API

## Развертывание

### Docker

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx конфигурация

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://sync-sum-api:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Лицензия

MIT

## Поддержка

Для вопросов и предложений создавайте issues в репозитории проекта.
