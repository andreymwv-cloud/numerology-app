// app/page.tsx - полностью исправленная версия
'use client'

import { useState } from 'react'
import { getFullReportData } from './lib/numerology'

// Типы для пропсов модального окна
interface FullReportModalProps {
	isOpen: boolean;
	onClose: () => void;
	reportData: {
		soulNumber?: number;
		destinyNumber?: number;
		realizationNumber?: number;
		personalYear?: number;
		pivotalYear?: number;
		soulMeaning?: string;
		destinyMeaning?: string;
		realizationMeaning?: string;
		personalYearMeaning?: string;
		pivotalYearMeaning?: string;
		synthesis?: string;
		recommendations?: string[];
	} | null;
	birthDate: string;
}

// Компонент модального окна с полным отчетом
function FullReportModal({ isOpen, onClose, reportData, birthDate }: FullReportModalProps) {
	if (!isOpen || !reportData) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
			<div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 md:p-8">
					{/* Заголовок и кнопка закрытия */}
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl md:text-3xl font-bold text-white">
							📊 Полный нумерологический отчет
						</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-white text-2xl font-bold"
						>
							×
						</button>
					</div>

					{/* Информация о пользователе */}
					<div className="mb-6 p-4 bg-gray-700 rounded-lg">
						<p className="text-gray-300">
							<span className="font-semibold">Дата рождения:</span> {new Date(birthDate).toLocaleDateString('ru-RU')}
						</p>
						<p className="text-gray-300 mt-1">
							<span className="font-semibold">Год анализа:</span> {new Date().getFullYear()}
						</p>
					</div>

					{/* Базовые числа личности */}
					<section className="mb-8">
						<h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
							A. Базовые числа личности
						</h3>

						<div className="space-y-4">
							<div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
								<div className="flex items-center justify-between mb-2">
									<h4 className="text-lg font-semibold text-blue-200">
										Число Сознания (Души)
									</h4>
									<span className="text-2xl font-bold text-blue-300 bg-gray-700 px-3 py-1 rounded-full border border-blue-500">
										{reportData.soulNumber}
									</span>
								</div>
								<p className="text-blue-100 text-sm">
									{reportData.soulMeaning}
								</p>
							</div>

							<div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
								<div className="flex items-center justify-between mb-2">
									<h4 className="text-lg font-semibold text-purple-200">
										Число Миссии (Судьбы)
									</h4>
									<span className="text-2xl font-bold text-purple-300 bg-gray-700 px-3 py-1 rounded-full border border-purple-500">
										{reportData.destinyNumber}
									</span>
								</div>
								<p className="text-purple-100 text-sm">
									{reportData.destinyMeaning}
								</p>
							</div>

							<div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-700">
								<div className="flex items-center justify-between mb-2">
									<h4 className="text-lg font-semibold text-indigo-200">
										Число Реализации
									</h4>
									<span className="text-2xl font-bold text-indigo-300 bg-gray-700 px-3 py-1 rounded-full border border-indigo-500">
										{reportData.realizationNumber}
									</span>
								</div>
								<p className="text-indigo-100 text-sm">
									{reportData.realizationMeaning}
								</p>
							</div>
						</div>
					</section>

					{/* Анализ текущего периода */}
					<section className="mb-8">
						<h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
							B. Анализ текущего периода
						</h3>

						<div className="grid md:grid-cols-2 gap-6 mb-4">
							<div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
								<div className="flex items-center justify-between mb-2">
									<h4 className="text-lg font-semibold text-green-200">
										Личный Год (Внешнее)
									</h4>
									<span className="text-2xl font-bold text-green-300 bg-gray-700 px-3 py-1 rounded-full border border-green-500">
										{reportData.personalYear}
									</span>
								</div>
								<p className="text-green-100 text-sm">
									{reportData.personalYearMeaning}
								</p>
							</div>

							<div className="p-4 bg-orange-900/30 rounded-lg border border-orange-700">
								<div className="flex items-center justify-between mb-2">
									<h4 className="text-lg font-semibold text-orange-200">
										Переломный Год (Внутреннее)
									</h4>
									<span className="text-2xl font-bold text-orange-300 bg-gray-700 px-3 py-1 rounded-full border border-orange-500">
										{reportData.pivotalYear}
									</span>
								</div>
								<p className="text-orange-100 text-sm">
									{reportData.pivotalYearMeaning}
								</p>
							</div>
						</div>

						{/* Синтез */}
						<div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-700">
							<h4 className="text-lg font-semibold text-cyan-200 mb-2">
								Синтез года
							</h4>
							<p className="text-cyan-100 text-sm">
								{reportData.synthesis}
							</p>
						</div>
					</section>

					{/* Персональные рекомендации */}
					<section className="mb-6">
						<h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
							C. Персональные рекомендации
						</h3>
						<div className="grid md:grid-cols-2 gap-4">
							{reportData.recommendations && reportData.recommendations.map((rec: string, index: number) => (
								<div key={index} className="p-3 bg-gray-700 rounded-lg border border-gray-600">
									<p className="text-gray-300 text-sm">• {rec}</p>
								</div>
							))}
						</div>
					</section>

					{/* Кнопка закрытия */}
					<div className="text-center">
						<button
							onClick={onClose}
							className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
						>
							Закрыть отчет
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

// Типы для результатов
interface BasicResults {
	soulNumber?: number;
	destinyNumber?: number;
	realizationNumber?: number;
	personalYear?: number;
	pivotalYear?: number;
}

export default function Home() {
	const [birthDate, setBirthDate] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [showFullReport, setShowFullReport] = useState(false)
	const [basicResults, setBasicResults] = useState<BasicResults>({})

	const handleCalculate = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!birthDate) return

		setIsLoading(true)

		// Имитация "сложного расчета" для лучшего UX
		setTimeout(() => {
			const reportData = getFullReportData(birthDate)

			setBasicResults({
				soulNumber: reportData?.soulNumber,
				destinyNumber: reportData?.destinyNumber,
				realizationNumber: reportData?.realizationNumber,
				personalYear: reportData?.personalYear,
				pivotalYear: reportData?.pivotalYear
			})
			setIsLoading(false)
		}, 1500)
	}

	const handleGetFullReport = () => {
		const email = prompt('🚀 Система запускается скоро! Оставьте email для уведомления о старте и получения специального предложения:');
		if (email) {
			localStorage.setItem('waitlist_email', email);
			alert('Спасибо! Вы будете среди первых, кто получит доступ к полным отчетам со скидкой!');

			if (confirm('Хотите посмотреть демо-версию отчета?')) {
				setShowFullReport(true);
			}
		}
	}

	const handleReset = () => {
		setBirthDate('')
		setBasicResults({})
		setShowFullReport(false)
	}

	// Генерируем данные для полного отчета
	const fullReportData = getFullReportData(birthDate)

	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8">
			<div className="container mx-auto px-4 max-w-4xl">

				{/* Заголовок */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Нумерологический анализ
					</h1>
					<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
						Профессиональный расчет по методу: Число Сознания, Миссии, Реализации + прогноз на год
					</p>
				</div>

				{/* Основной контент */}
				<div className="grid md:grid-cols-2 gap-8 items-start">

					{/* Левая колонка - форма */}
					<div className="bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
						<h2 className="text-2xl font-semibold text-gray-100 mb-6">
							Бесплатный расчет
						</h2>

						<form onSubmit={handleCalculate} className="space-y-6">
							<div>
								<label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-3">
									📅 Дата вашего рождения
								</label>
								<input
									type="date"
									id="birthDate"
									value={birthDate}
									onChange={(e) => setBirthDate(e.target.value)}
									className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-white bg-gray-700"
									required
								/>
								<p className="text-sm text-gray-400 mt-2">
									Мы не сохраняем ваши данные
								</p>
							</div>

							<button
								type="submit"
								disabled={isLoading || !birthDate}
								className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg font-medium"
							>
								{isLoading ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
										Производится расчет...
									</div>
								) : (
									'✨ Рассчитать базовые числа'
								)}
							</button>
						</form>

						{/* Кнопка сброса */}
						{basicResults.soulNumber && (
							<button
								onClick={handleReset}
								className="w-full mt-4 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-500 transition-colors"
							>
								Сделать новый расчет
							</button>
						)}
					</div>

					{/* Правая колонка - результаты */}
					<div className="bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
						<h2 className="text-2xl font-semibold text-gray-100 mb-6">
							Ваши числа
						</h2>

						{basicResults.soulNumber ? (
							<div className="space-y-6">
								{/* Базовые числа */}
								<div className="grid grid-cols-3 gap-3 mb-4">
									<div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-700">
										<div className="text-2xl font-bold text-blue-300">{basicResults.soulNumber}</div>
										<div className="text-xs text-blue-200 mt-1">Сознание</div>
									</div>
									<div className="text-center p-3 bg-purple-900/30 rounded-lg border border-purple-700">
										<div className="text-2xl font-bold text-purple-300">{basicResults.destinyNumber}</div>
										<div className="text-xs text-purple-200 mt-1">Миссия</div>
									</div>
									<div className="text-center p-3 bg-indigo-900/30 rounded-lg border border-indigo-700">
										<div className="text-2xl font-bold text-indigo-300">{basicResults.realizationNumber}</div>
										<div className="text-xs text-indigo-200 mt-1">Реализация</div>
									</div>
								</div>

								{/* Годовые числа */}
								<div className="grid grid-cols-2 gap-3 mb-6">
									<div className="text-center p-3 bg-green-900/30 rounded-lg border border-green-700">
										<div className="text-2xl font-bold text-green-300">{basicResults.personalYear}</div>
										<div className="text-xs text-green-200 mt-1">Личный Год</div>
									</div>
									<div className="text-center p-3 bg-orange-900/30 rounded-lg border border-orange-700">
										<div className="text-2xl font-bold text-orange-300">{basicResults.pivotalYear}</div>
										<div className="text-xs text-orange-200 mt-1">Переломный Год</div>
									</div>
								</div>

								{/* Предложение полного отчета */}
								<div className="p-4 bg-gradient-to-r from-orange-900/30 to-amber-900/30 rounded-lg border border-orange-700">
									<h3 className="text-xl font-semibold text-orange-200 mb-3">
										💫 Полный нумерологический отчет
									</h3>
									<ul className="text-orange-100 space-y-2 mb-4 text-sm">
										<li>✅ Детальный анализ всех 5 чисел</li>
										<li>✅ Конкретные трактовки по методологии ТЗ</li>
										<li>✅ Синтез внешних и внутренних влияний года</li>
										<li>✅ Персональные рекомендации для действий</li>
										<li>✅ Профессиональный формат отчета</li>
									</ul>
									<button
										onClick={handleGetFullReport}
										className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors font-semibold text-lg text-center whitespace-normal break-words leading-snug min-h-[64px] flex items-center justify-center"
									>
										Получить полный отчет за 699 ₽
									</button>
								</div>
							</div>
						) : (
							// Состояние до расчета
							<div className="text-center py-12">
								<div className="text-6xl mb-4">🔮</div>
								<h3 className="text-xl font-semibold text-gray-400 mb-2">
									Здесь появятся ваши числа
								</h3>
								<p className="text-gray-500">
									Введите дату рождения и нажмите &quot;Рассчитать&quot;
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Футер */}
				<footer className="text-center mt-12 pt-8 border-t border-gray-700">
					<p className="text-gray-400">
						© 2025 Нумерологический анализ. Профессиональная методология расчета.
					</p>
				</footer>
			</div>

			{/* Модальное окно с полным отчетом */}
			<FullReportModal
				isOpen={showFullReport}
				onClose={() => setShowFullReport(false)}
				reportData={fullReportData}
				birthDate={birthDate}
			/>
		</main>
	)
} 