# Redux State Management - Приложение знакомств

Этот документ описывает архитектуру и использование Redux state для приложения знакомств.

## Структура State

### 1. Auth State (аутентификация)

```typescript
interface AuthState {
	isAuthenticated: boolean
	token: string | null
	refreshToken: string | null
	user: User | null
	isLoading: boolean
	error: string | null
}
```

**Основные действия:**

- `loginStart()` - начало процесса входа
- `loginSuccess({ token, refreshToken, user })` - успешный вход
- `loginFailure(error)` - ошибка входа
- `logout()` - выход из аккаунта
- `updateUser(userData)` - обновление данных пользователя

**Пример использования:**

```typescript
import { useAppDispatch, useAppSelector } from 'shared'
import { loginSuccess, selectIsAuthenticated } from 'app'

const dispatch = useAppDispatch()
const isAuthenticated = useAppSelector(selectIsAuthenticated)

// Логин пользователя
dispatch(
	loginSuccess({
		token: 'jwt_token',
		refreshToken: 'refresh_token',
		user: userData,
	})
)
```

### 2. User State (профиль пользователя)

```typescript
interface UserState extends LoadingState {
	profile: User | null
	isEditing: boolean
}
```

**Основные действия:**

- `setProfile(user)` - установка профиля
- `updateBasicInfo({ name, age, bio })` - обновление основной информации
- `addPhoto(photo)` - добавление фото
- `removePhoto(photoId)` - удаление фото
- `updateTags(tags)` - обновление тегов
- `updatePreferences(preferences)` - обновление настроек

**Пример использования:**

```typescript
import { updateBasicInfo, selectUser } from 'app'

const userState = useAppSelector(selectUser)

// Обновление профиля
dispatch(
	updateBasicInfo({
		name: 'Новое имя',
		age: 25,
		bio: 'Новое описание',
	})
)
```

### 3. Registration State (регистрация)

```typescript
interface RegistrationState {
	currentStep: number
	steps: {
		name: RegistrationStep
		tags: RegistrationStep
		photos: RegistrationStep
	}
	isCompleted: boolean
}
```

**Основные действия:**

- `nextStep()` - следующий шаг
- `prevStep()` - предыдущий шаг
- `updateNameStep({ name, email, age })` - обновление шага с именем
- `addTag(tag)` - добавление тега
- `addPhoto(photo)` - добавление фото
- `completeRegistration()` - завершение регистрации

**Пример использования:**

```typescript
import { nextStep, updateNameStep, selectRegistrationProgress } from 'app'

const progress = useAppSelector(selectRegistrationProgress)

// Переход к следующему шагу
dispatch(nextStep())

// Обновление данных шага
dispatch(
	updateNameStep({
		name: 'Имя',
		email: 'email@example.com',
		age: 25,
	})
)
```

### 4. Profiles State (профили для свайпов)

```typescript
interface ProfilesState extends LoadingState {
	profiles: Profile[]
	currentIndex: number
	hasMore: boolean
	filters: FilterSettings
	totalProfiles: number
}
```

**Основные действия:**

- `setProfiles(profiles)` - установка списка профилей
- `addProfiles(profiles)` - добавление новых профилей
- `nextProfile()` - следующий профиль
- `removeProfile(profileId)` - удаление профиля
- `updateFilters(filters)` - обновление фильтров

**Пример использования:**

```typescript
import { setProfiles, nextProfile, selectCurrentProfile } from 'app'
import { mockProfiles } from 'shared'

const currentProfile = useAppSelector(selectCurrentProfile)

// Загрузка профилей
dispatch(setProfiles(mockProfiles))

// Переход к следующему профилю
dispatch(nextProfile())
```

### 5. Swipe State (свайпы и лайки)

```typescript
interface SwipeState {
	currentProfileIndex: number
	profiles: Profile[]
	swipeHistory: SwipeAction[]
	matches: Match[]
	likes: Like[]
	isAnimating: boolean
	canUndo: boolean
}
```

**Основные действия:**

- `swipeLeft(profileId)` - дизлайк
- `swipeRight({ profileId, isMatch })` - лайк
- `swipeUp({ profileId, isMatch })` - суперлайк
- `undoLastSwipe()` - отмена последнего свайпа
- `addMatch(match)` - добавление мэтча

**Пример использования:**

```typescript
import { swipeRight, swipeLeft, undoLastSwipe, selectSwipeStats } from 'app'

const swipeStats = useAppSelector(selectSwipeStats)

// Лайк профиля
dispatch(swipeRight({ profileId: 'profile_1', isMatch: false }))

// Дизлайк профиля
dispatch(swipeLeft('profile_2'))

// Отмена последнего действия
dispatch(undoLastSwipe())
```

## Селекторы

### Основные селекторы:

- `selectAuth` - состояние аутентификации
- `selectUser` - состояние профиля пользователя
- `selectRegistration` - состояние регистрации
- `selectProfiles` - состояние профилей
- `selectSwipe` - состояние свайпов

### Вычисляемые селекторы:

- `selectCurrentUser` - текущий пользователь
- `selectIsAuthenticated` - авторизован ли пользователь
- `selectCurrentProfile` - текущий профиль для свайпа
- `selectRegistrationProgress` - прогресс регистрации
- `selectSwipeStats` - статистика свайпов

## Mock Data и Actions

### Mock данные:

```typescript
import {
	mockUsers,
	mockProfiles,
	mockCurrentUser,
	generateMoreProfiles,
} from 'shared'
```

### Mock действия:

```typescript
import {
	mockLogin,
	mockFetchProfiles,
	mockSwipeProfile,
	mockUploadPhoto,
} from 'shared'

// Использование mock действий
dispatch(mockLogin({ email: 'demo@example.com', password: 'demo123' }))
dispatch(mockFetchProfiles({ count: 10, page: 1 }))
dispatch(mockSwipeProfile({ profileId: 'profile_1', action: 'like' }))
```

## Примеры использования в компонентах

### 1. Компонент входа:

```typescript
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector, mockLogin } from 'shared';
import { selectAuth } from 'app';

export const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(mockLogin({ email, password }));
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};
```

### 2. Компонент свайпа:

```typescript
import React from 'react';
import { useAppDispatch, useAppSelector } from 'shared';
import { swipeLeft, swipeRight, selectCurrentProfile, selectSwipe } from 'app';

export const SwipeComponent = () => {
  const dispatch = useAppDispatch();
  const currentProfile = useAppSelector(selectCurrentProfile);
  const { isAnimating } = useAppSelector(selectSwipe);

  const handleLike = () => {
    if (currentProfile) {
      dispatch(swipeRight({ profileId: currentProfile.id }));
    }
  };

  const handleDislike = () => {
    if (currentProfile) {
      dispatch(swipeLeft(currentProfile.id));
    }
  };

  if (!currentProfile) return <div>Нет профилей</div>;

  return (
    <div className={isAnimating ? 'animating' : ''}>
      <h3>{currentProfile.user.name}, {currentProfile.user.age}</h3>
      <p>{currentProfile.user.bio}</p>
      <button onClick={handleDislike}>👎</button>
      <button onClick={handleLike}>👍</button>
    </div>
  );
};
```

### 3. Компонент регистрации:

```typescript
import React from 'react';
import { useAppDispatch, useAppSelector } from 'shared';
import { nextStep, updateNameStep, selectRegistration } from 'app';

export const RegistrationComponent = () => {
  const dispatch = useAppDispatch();
  const { currentStep, steps } = useAppSelector(selectRegistration);

  const handleNameUpdate = (name: string) => {
    dispatch(updateNameStep({ name }));
  };

  const handleNext = () => {
    if (steps.name.isCompleted) {
      dispatch(nextStep());
    }
  };

  return (
    <div>
      <div>Шаг {currentStep} из 3</div>
      {currentStep === 1 && (
        <div>
          <input
            placeholder="Введите имя"
            onChange={(e) => handleNameUpdate(e.target.value)}
          />
          <button
            onClick={handleNext}
            disabled={!steps.name.isCompleted}
          >
            Далее
          </button>
        </div>
      )}
    </div>
  );
};
```

## Рекомендации по использованию

1. **Используйте типизированные хуки** `useAppDispatch` и `useAppSelector` вместо обычных хуков Redux
2. **Группируйте связанные действия** в одном dispatch или используйте RTK Query для сложных операций
3. **Используйте селекторы** для получения производных данных из state
4. **Обрабатывайте состояния загрузки** для улучшения UX
5. **Используйте mock данные** для разработки и тестирования

## Структура файлов

```
src/
├── app/
│   ├── store/
│   │   ├── index.ts              # Конфигурация store
│   │   └── slices/
│   │       ├── authSlice.ts      # Слайс аутентификации
│   │       ├── userSlice.ts      # Слайс пользователя
│   │       ├── registrationSlice.ts # Слайс регистрации
│   │       ├── profilesSlice.ts  # Слайс профилей
│   │       └── swipeSlice.ts     # Слайс свайпов
│   └── providers/               # React провайдеры
└── shared/
    ├── types/                   # TypeScript типы
    ├── lib/
    │   ├── hooks.ts             # Типизированные хуки
    │   ├── mockData.ts          # Mock данные
    │   └── mockActions.ts       # Mock действия
    └── index.ts                 # Экспорты shared слоя
```
