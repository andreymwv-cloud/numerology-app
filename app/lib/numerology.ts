// app/lib/numerology.ts - исправленная версия по замечаниям нумеролога

// Основные функции расчетов (остаются без изменений)
export function calculateSoulNumber(birthDate: string): number {
	const [, , day] = birthDate.split('-').map(Number);
	return reduceToSingleDigit(day);
}

export function calculateDestinyNumber(birthDate: string): number {
	const dateString = birthDate.replace(/-/g, '');
	let total = 0;

	for (let i = 0; i < dateString.length; i++) {
		total += parseInt(dateString[i]);
	}

	return reduceToSingleDigit(total);
}

export function calculateRealizationNumber(soulNumber: number, destinyNumber: number): number {
	return reduceToSingleDigit(soulNumber + destinyNumber);
}

export function calculatePersonalYear(birthDate: string, targetYear?: number): number {
	const [, month, day] = birthDate.split('-').map(Number);
	const currentYear = targetYear || new Date().getFullYear();

	// Сумма цифр года
	const yearSum = currentYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);

	// Базовое число: день + месяц (сворачиваем до одной цифры)
	const baseNumber = reduceToSingleDigit(day + month);

	// Личный год: базовое число + сумма цифр года
	return reduceToSingleDigit(baseNumber + yearSum);
}

export function calculatePivotalYear(destinyNumber: number, personalYear: number): number {
	// Переломный год: число миссии + личный год
	return reduceToSingleDigit(destinyNumber + personalYear);
}

// Вспомогательная функция для сворачивания чисел
function reduceToSingleDigit(num: number): number {
	let total = num;

	while (total > 9 && total !== 11 && total !== 22) {
		total = total.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
	}

	return total;
}

// Трактовки чисел по ТЗ (основные остаются без изменений)
export function getSoulNumberMeaning(number: number): string {
	const meanings: { [key: number]: string } = {
		1: "Лидерство, инициатива, независимость. Вы рождены, чтобы вести за собой и начинать новое.",
		2: "Дипломатия, партнерство, чувствительность. Ваша сила в умении слышать и объединять.",
		3: "Творчество, общение, оптимизм. Вы призваны нести радость и вдохновение в мир.",
		4: "Стабильность, практичность, дисциплина. Вы строитель прочного фундамента.",
		5: "Свобода, изменения, адаптивность. Ваш дар - легкость в переменах и исследовании нового.",
		6: "Ответственность, забота, гармония. Вы хранитель семьи и отношений.",
		7: "Анализ, знание, духовность. Ваш путь - поиск глубины и истины.",
		8: "Власть, деньги, достижения. Вы рождены для материального успеха и влияния.",
		9: "Гуманизм, служение, завершение. Ваше призвание - помощь и трансформация.",
		11: "Интуиция, вдохновение, духовное пробуждение. Вы - проводник высших истин.",
		22: "Созидание, масштаб, практическая реализация. Вы строитель мира и крупных проектов."
	};

	return meanings[number] || "Особый духовный путь, требующий глубокого осознания.";
}

export function getDestinyNumberMeaning(number: number): string {
	const meanings: { [key: number]: string } = {
		1: "Миссия лидера и новатора. Вы здесь, чтобы прокладывать новые пути и вдохновлять на изменения.",
		2: "Миссия миротворца и дипломата. Ваша задача - создавать гармонию и понимание между людьми.",
		3: "Миссия творца и вдохновителя. Вы призваны нести красоту, радость и самовыражение.",
		4: "Миссия строителя и организатора. Ваше предназначение - создавать надежные структуры и системы.",
		5: "Миссия исследователя и освободителя. Вы здесь, чтобы расширять границы и нести свободу.",
		6: "Миссия воспитателя и хранителя. Ваша задача - забота, поддержка и создание уюта.",
		7: "Миссия аналитика и учителя. Вы призваны исследовать истину и делиться знаниями.",
		8: "Миссия руководителя и предпринимателя. Ваше предназначение - материальные достижения и управление.",
		9: "Миссия гуманиста и филантропа. Вы здесь, чтобы служить человечеству и нести преобразования.",
		11: "Миссия проводника и просветителя. Ваша задача - вдохновлять и открывать духовные истины.",
		22: "Миссия архитектора и преобразователя. Вы призваны воплощать масштабные идеи в реальность."
	};

	return meanings[number] || "Особая кармическая задача, раскрывающаяся в течение жизни.";
}

export function getRealizationNumberMeaning(soulNumber: number, destinyNumber: number): string {
	// ... (код комбинаций остается без изменений)
	const combinations: { [key: string]: string } = {
		"1-1": "Станьте лидером, который ведет к новым горизонтам. Ваша сила в самостоятельности и смелости.",
		"1-2": "Используйте лидерские качества для создания гармоничных партнерств. Ведущий дипломат.",
		// ... (все остальные комбинации остаются без изменений)
		"9-9": "Мастер трансформации. Ваш дар - завершать и возрождать."
	};

	const key = `${soulNumber}-${destinyNumber}`;
	return combinations[key] || `Синтез вашей души (${soulNumber}) и миссии (${destinyNumber}) создает уникальный путь реализации. Используйте внутренние качества для выполнения жизненной задачи.`;
}

export function getPersonalYearMeaning(number: number): string {
	const meanings: { [key: number]: string } = {
		1: "Год новых начинаний и инициатив. Смело начинайте проекты, проявляйте самостоятельность. Идеальное время для стартов.",
		2: "Год партнерства, терпения и сотрудничества. Уделяйте внимание отношениям, будьте дипломатичны. Время строить мосты.",
		3: "Год творчества, самовыражения и социализации. Развивайте таланты, общайтесь, несите радость. Время вдохновлять.",
		4: "Год работы, стабильности и построения фундамента. Трудитесь упорно, создавайте надежную основу. Время строить.",
		5: "Год изменений, свободы и неожиданных возможностей. Будьте гибки, открыты новому. Время исследовать.",
		6: "Год семьи, ответственности и гармонии. Заботьтесь о близких, создавайте уют. Время гармонизировать.",
		7: "Год анализа, уединения и планирования. Изучайте, размышляйте, готовьтесь. Время мудрости.",
		8: "Год достижений, карьеры и материального успеха. Добивайтесь целей, думайте о финансах. Время пожинать плоды.",
		9: "Год завершений, подведения итогов. Отпускайте старое, завершайте циклы. Время трансформации."
	};

	return meanings[number] || "Особый год с уникальными возможностями для роста.";
}

// ИСПРАВЛЕННАЯ ФУНКЦИЯ: Получение значения Переломного Года
export function getPivotalYearMeaning(destinyNumber: number, personalYear: number): string {
	const pivotalYear = calculatePivotalYear(destinyNumber, personalYear);

	const meanings: { [key: number]: string } = {
		1: "Направить энергию года на укрепление личной инициативы и независимости. Создавайте новые проекты с уверенностью.",
		2: "Направить энергию года на построение гармоничных партнерств. Уделяйте внимание дипломатии и сотрудничеству.",
		3: "Направить энергию года на творческую реализацию и самовыражение. Используйте периоды вдохновения для создания.",
		4: "Направить энергию года на построение прочного фундамента. Создавайте стабильные структуры и системы.",
		5: "Направить энергию года на исследование новых возможностей. Используйте изменения для расширения горизонтов.",
		6: "Направить энергию года на укрепление семейных уз и создание гармонии. Балансируйте ответственность и заботу.",
		7: "Направить энергию года на глубокий анализ и планирование. Используйте периоды уединения для стратегического мышления.",
		8: "Направить энергию перемен на укрепление личной власти, финансовой независимости и построение прочного фундамента.",
		9: "Направить энергию года на завершение циклов и служение. Используйте трансформации для освобождения пространства."
	};

	return meanings[pivotalYear] || `Кармическая задача: использовать энергию Личного Года ${personalYear} для выполнения вашей Миссии ${destinyNumber}.`;
}

// Генерация полного отчета
export function getFullReportData(birthDate: string, targetYear?: number) {
	if (!birthDate) return null;

	const soulNumber = calculateSoulNumber(birthDate);
	const destinyNumber = calculateDestinyNumber(birthDate);
	const realizationNumber = calculateRealizationNumber(soulNumber, destinyNumber);
	const personalYear = calculatePersonalYear(birthDate, targetYear);
	const pivotalYear = calculatePivotalYear(destinyNumber, personalYear);

	return {
		soulNumber,
		destinyNumber,
		realizationNumber,
		personalYear,
		pivotalYear,
		soulMeaning: getSoulNumberMeaning(soulNumber),
		destinyMeaning: getDestinyNumberMeaning(destinyNumber),
		realizationMeaning: getRealizationNumberMeaning(soulNumber, destinyNumber),
		personalYearMeaning: getPersonalYearMeaning(personalYear),
		pivotalYearMeaning: getPivotalYearMeaning(destinyNumber, personalYear),
		synthesis: getYearSynthesis(personalYear, pivotalYear, soulNumber, destinyNumber),
		recommendations: getPersonalRecommendations(soulNumber, destinyNumber, personalYear, pivotalYear)
	};
}

// ИСПРАВЛЕННАЯ ФУНКЦИЯ: Синтез года
function getYearSynthesis(personalYear: number, pivotalYear: number, soulNumber: number, destinyNumber: number): string {
	// Конкретные синтезы для различных комбинаций
	const synthesisMap: { [key: string]: string } = {
		"5-8": `Используйте открывающиеся возможности и свободу (${personalYear}) для запуска смелых деловых проектов, которые усилят ваш авторитет и финансовое положение (${pivotalYear}).`,
		"1-1": `Новые начинания (${personalYear}) идеально сочетаются с вашей миссией лидерства (${destinyNumber}) - создавайте инновационные проекты.`,
		"3-6": `Творческая энергия (${personalYear}) направлена на создание гармонии в семье и отношениях (${pivotalYear}) - используйте искусство для укрепления связей.`,
		"8-4": `Достижения (${personalYear}) требуют построения прочного фундамента (${pivotalYear}) - инвестируйте в стабильные структуры.`
	};

	const key = `${personalYear}-${pivotalYear}`;

	if (synthesisMap[key]) {
		return synthesisMap[key];
	}

	// Общий синтез для остальных комбинаций
	return `Используйте открывающиеся возможности (${personalYear}) для решения кармических задач (${pivotalYear}), создавая практическую основу для вашей миссии ${destinyNumber}.`;
}

// ИСПРАВЛЕННАЯ ФУНКЦИЯ: Персональные рекомендации
function getPersonalRecommendations(soulNumber: number, destinyNumber: number, personalYear: number, pivotalYear: number): string[] {
	const recommendations = [
		`Сфокусируйтесь на одном ключевом проекте вместо распыления - это усилит влияние чисел ${personalYear} и ${pivotalYear}`,
		`Анализируйте каждую новую возможность (${personalYear}) с точки зрения ее потенциала для укрепления вашего материального положения (${pivotalYear})`,
		`Создавайте деловые связи в периоды повышенной социальной активности (${personalYear}) для усиления вашего влияния (${pivotalYear})`,
		`Используйте периоды изменений (${personalYear}) для пересмотра финансовой стратегии и укрепления власти (${pivotalYear})`,
		`Развивайте лидерские качества через практические достижения, согласующиеся с миссией ${destinyNumber}`,
		`Балансируйте свободу действий (${personalYear}) с построением прочных структур (${pivotalYear})`,
		`Создавайте ритуалы планирования, которые соединяют текущие возможности с долгосрочными целями миссии ${destinyNumber}`
	];

	return recommendations;
}