# NeuroHire Layout Implementation Task

## Main Task
Создать основной компонент приложения с разделением кода на UI и логику, поддержкой локализации, переиспользуемым Layout и навигацией. Учесть мобильную адаптивность. Каждый этап согласовывается отдельно.

## Implementation Steps

### 1. Layout Architecture and Approaches
Предложить варианты реализации Layout, кратко описать возможные структуры и подходы (без кода).

### 2. Layout Generation
Создать переиспользуемый Layout с Sidebar (боковая панель) и основной рабочей областью.
- Sidebar должен поддерживать два режима: нормальный и компактный.
- Sidebar реализовать как отдельный компонент с навигацией.
- Навигационное меню должно быть отдельным компонентом, принимающим список пунктов меню и компонент, который должен открываться при выборе соответствующего пункта меню.

Структура для MainLayout:
```
frontend/src/
├── layouts/
│   └── MainLayout/
│       ├── index.tsx (основной компонент MainLayout)
│       ├── components/
│       │   ├── Sidebar/
│       │   │   ├── index.tsx
│       │   │   ├── styles.ts
│       │   │   ├── types.ts
│       │   │   └── locales/
│       │   │       ├── en.json
│       │   │       ├── ru.json
│       │   │       └── de.json
│       │   ├── NavigationMenu/
│       │   │   ├── index.tsx
│       │   │   ├── styles.ts
│       │   │   ├── types.ts
│       │   │   └── locales/
│       │   │       ├── en.json
│       │   │       ├── ru.json
│       │   │       └── de.json
│       │   ├── MobileNavigation/
│       │   │   ├── index.tsx
│       │   │   ├── styles.ts
│       │   │   ├── types.ts
│       │   │   └── locales/
│       │   │       ├── en.json
│       │   │       ├── ru.json
│       │   │       └── de.json
│       │   └── Header/
│       │       ├── index.tsx
│       │       ├── styles.ts
│       │       ├── types.ts
│       │       └── locales/
│       │           ├── en.json
│       │           ├── ru.json
│       │           └── de.json
│       ├── hooks/
│       │   ├── useSidebar.ts
│       │   └── useNavigation.ts
│       ├── styles.ts
│       └── types.ts
```

### 3. Main Application Component Architecture
Предложить варианты реализации Основного Компонента Приложения, кратко описать возможные структуры и подходы (без кода).

### 4. Main Application Component
Создать основной компонент приложения, использующий Layout.
В навигации разместить разделы:
- Main
- Candidates
- Projects
- Applications
- Administration
- Users
- DataBase

### 5. Dashboard
После успешного логина открывать компонент Dashboard (главная страница после логина).

### 6. CandidatesTable Integration
В компонент Dashboard добавить компонент CandidatesTable.

## Requirements for all steps:
- Классы, переменные и компоненты должны иметь осмысленные имена.
- Логика и UI разделены по разным файлам (hooks и компоненты).
- Поддержка локализации.
- Layout должен быть переиспользуемым для других разделов.
- Все компоненты должны быть адаптивны для мобильных устройств.
- Перед каждым шагом необходимо вспоминать основную задачу.
- После выполнения каждого шага:
  - проверка через запуск "npm run type-check."
  - подтверждение на продолжение. 