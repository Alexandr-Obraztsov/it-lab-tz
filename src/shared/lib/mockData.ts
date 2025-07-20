import type { User, Profile, Photo, UserPreferences, Location } from '../types'

// Мокнутые фотографии
const mockPhotos: Photo[][] = [
	[
		{
			id: '1-1',
			url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
			order: 0,
			isMain: true,
		},
		{
			id: '1-2',
			url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
			order: 1,
			isMain: false,
		},
	],
	[
		{
			id: '2-1',
			url: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400',
			order: 0,
			isMain: true,
		},
		{
			id: '2-2',
			url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
			order: 1,
			isMain: false,
		},
	],
	[
		{
			id: '3-1',
			url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
			order: 0,
			isMain: true,
		},
		{
			id: '3-2',
			url: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400',
			order: 1,
			isMain: false,
		},
	],
	[
		{
			id: '4-1',
			url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
			order: 0,
			isMain: true,
		},
		{
			id: '4-2',
			url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
			order: 1,
			isMain: false,
		},
	],
	[
		{
			id: '5-1',
			url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
			order: 0,
			isMain: true,
		},
		{
			id: '5-2',
			url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
			order: 1,
			isMain: false,
		},
	],
]

// Мокнутые предпочтения
const mockPreferences: UserPreferences = {
	ageRange: { min: 18, max: 35 },
	maxDistance: 50,
	showMeOnTinder: true,
	discoverySettings: { men: true, women: true },
}

// Мокнутые локации
const mockLocations: Location[] = [
	{ latitude: 55.7558, longitude: 37.6176, city: 'Москва', country: 'Россия' },
	{
		latitude: 59.9311,
		longitude: 30.3609,
		city: 'Санкт-Петербург',
		country: 'Россия',
	},
	{
		latitude: 56.8431,
		longitude: 60.6454,
		city: 'Екатеринбург',
		country: 'Россия',
	},
	{
		latitude: 55.0415,
		longitude: 82.9346,
		city: 'Новосибирск',
		country: 'Россия',
	},
	{
		latitude: 47.2357,
		longitude: 39.7015,
		city: 'Ростов-на-Дону',
		country: 'Россия',
	},
]

// Мокнутые пользователи
export const mockUsers: User[] = [
	{
		id: '1',
		email: 'alex@example.com',
		name: 'Александр',
		age: 28,
		bio: 'Люблю путешествия, фотографию и хорошую компанию. Работаю в IT, увлекаюсь горными лыжами.',
		photos: mockPhotos[0],
		tags: ['Путешествия', 'Фотография', 'Спорт', 'Технологии'],
		preferences: mockPreferences,
		location: mockLocations[0],
		isVerified: true,
		createdAt: '2024-01-15T10:00:00Z',
		updatedAt: '2024-01-20T15:30:00Z',
	},
	{
		id: '2',
		email: 'maria@example.com',
		name: 'Мария',
		age: 25,
		bio: 'Художница и любительница кофе. Ищу интересного собеседника для прогулок по городу.',
		photos: mockPhotos[1],
		tags: ['Искусство', 'Кофе', 'Прогулки', 'Кино'],
		preferences: {
			...mockPreferences,
			discoverySettings: { men: true, women: false },
		},
		location: mockLocations[1],
		isVerified: true,
		createdAt: '2024-01-10T08:20:00Z',
		updatedAt: '2024-01-22T12:15:00Z',
	},
	{
		id: '3',
		email: 'dmitry@example.com',
		name: 'Дмитрий',
		age: 32,
		bio: 'Музыкант и программист. Играю на гитаре, люблю рок-концерты и вечера с друзьями.',
		photos: mockPhotos[2],
		tags: ['Музыка', 'Программирование', 'Гитара', 'Концерты'],
		preferences: mockPreferences,
		location: mockLocations[2],
		isVerified: false,
		createdAt: '2024-01-05T14:45:00Z',
		updatedAt: '2024-01-18T09:00:00Z',
	},
	{
		id: '4',
		email: 'elena@example.com',
		name: 'Елена',
		age: 29,
		bio: 'Дизайнер и йога-инструктор. Люблю здоровый образ жизни, медитации и творчество.',
		photos: mockPhotos[3],
		tags: ['Йога', 'Дизайн', 'Здоровье', 'Медитация'],
		preferences: { ...mockPreferences, ageRange: { min: 25, max: 40 } },
		location: mockLocations[3],
		isVerified: true,
		createdAt: '2024-01-12T16:30:00Z',
		updatedAt: '2024-01-25T11:20:00Z',
	},
	{
		id: '5',
		email: 'sergey@example.com',
		name: 'Сергей',
		age: 26,
		bio: 'Спортсмен и тренер. Занимаюсь кроссфитом, люблю активный отдых и новые вызовы.',
		photos: mockPhotos[4],
		tags: ['Спорт', 'Кроссфит', 'Активность', 'Тренировки'],
		preferences: mockPreferences,
		location: mockLocations[4],
		isVerified: true,
		createdAt: '2024-01-08T13:15:00Z',
		updatedAt: '2024-01-21T14:45:00Z',
	},
]

// Мокнутые профили для свайпов
export const mockProfiles: Profile[] = mockUsers
	.slice(1)
	.map((user, index) => ({
		id: user.id,
		user,
		distance: Math.floor(Math.random() * 30) + 1, // 1-30 км
		isOnline: Math.random() > 0.5,
		lastSeen: new Date(
			Date.now() - Math.random() * 24 * 60 * 60 * 1000
		).toISOString(),
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	}))

// Текущий пользователь (первый из списка)
export const mockCurrentUser: User = mockUsers[0]

// Дополнительные моки для расширения списка профилей
export const generateMoreProfiles = (count: number): Profile[] => {
	const moreUsers: User[] = []
	const names = [
		'Анна',
		'Владимир',
		'Екатерина',
		'Михаил',
		'Олеся',
		'Роман',
		'Татьяна',
		'Игорь',
		'Наталья',
		'Андрей',
		'Юлия',
		'Максим',
		'Светлана',
		'Павел',
		'Ольга',
		'Виктор',
	]

	const bios = [
		'Люблю активный отдых и путешествия',
		'Ценю искренность и чувство юмора',
		'Увлекаюсь спортом и здоровым питанием',
		'Работаю в сфере образования',
		'Занимаюсь фотографией в свободное время',
		'Люблю читать и изучать новое',
		'Предпочитаю вечера дома с хорошим фильмом',
		'Активно занимаюсь волонтерством',
	]

	const tagSets = [
		['Спорт', 'Путешествия', 'Фотография'],
		['Музыка', 'Кино', 'Книги'],
		['Готовка', 'Танцы', 'Искусство'],
		['Технологии', 'Игры', 'Наука'],
		['Природа', 'Йога', 'Медитация'],
	]

	for (let i = 0; i < count; i++) {
		const id = `generated_${i + 6}`
		const name = names[i % names.length]
		const age = 20 + Math.floor(Math.random() * 15) // 20-34 года
		const bio = bios[i % bios.length]
		const tags = tagSets[i % tagSets.length]
		const location = mockLocations[i % mockLocations.length]
		const photoIndex = i % mockPhotos.length

		moreUsers.push({
			id,
			email: `${name.toLowerCase()}${i}@example.com`,
			name,
			age,
			bio,
			photos: mockPhotos[photoIndex].map(photo => ({
				...photo,
				id: `${id}_${photo.id}`,
			})),
			tags,
			preferences: mockPreferences,
			location,
			isVerified: Math.random() > 0.3,
			createdAt: new Date(
				Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
			).toISOString(),
			updatedAt: new Date(
				Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
			).toISOString(),
		})
	}

	return moreUsers.map(user => ({
		id: user.id,
		user,
		distance: Math.floor(Math.random() * 50) + 1,
		isOnline: Math.random() > 0.6,
		lastSeen: new Date(
			Date.now() - Math.random() * 48 * 60 * 60 * 1000
		).toISOString(),
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	}))
}

// Доступные теги для регистрации
export const availableTags = [
	'Спорт',
	'Путешествия',
	'Музыка',
	'Кино',
	'Книги',
	'Искусство',
	'Фотография',
	'Готовка',
	'Танцы',
	'Игры',
	'Технологии',
	'Природа',
	'Йога',
	'Медитация',
	'Дизайн',
	'Мода',
	'Автомобили',
	'Мотоциклы',
	'Рыбалка',
	'Охота',
	'Садоводство',
	'Домашние животные',
	'Волонтерство',
	'Наука',
	'История',
	'Политика',
	'Экономика',
	'Психология',
	'Философия',
]

// Функция для получения случайного профиля
export const getRandomProfile = (): Profile => {
	const profiles = [...mockProfiles, ...generateMoreProfiles(10)]
	return profiles[Math.floor(Math.random() * profiles.length)]
}

// Функция для получения пакета профилей
export const getProfilesBatch = (count: number = 10): Profile[] => {
	return generateMoreProfiles(count)
}
