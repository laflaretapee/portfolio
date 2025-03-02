import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code,
  Mail,
  Phone,
  Link,
  Globe,
  ArrowUpRight,
  Brain,
  Construction
} from 'lucide-react';
import DinarPhoto from './Dinar.jpg';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [showProjects, setShowProjects] = useState(false);

  const personalInfo = {
    name: "Динар Зиязетдинов",
    title: "Backend разработчик",
    email: "dinar.ziyazetdinov@bk.ru",
    phone: "+7 (927) 636-2683",
    github: "github.com/laflaretapee",
    linkedin: "https://t.me/dineroorwho"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-lg shadow-lg">
              <img 
                src={DinarPhoto} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-purple-600 mb-2">{personalInfo.name}</h1>
              <p className="text-xl md:text-2xl text-gray-600 tracking-wide">{personalInfo.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10 overflow-x-auto w-full">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 w-full">
          <div className="flex space-x-2 sm:space-x-8 w-full justify-between sm:justify-start">
            <button
              onClick={() => setActiveSection('about')}
              className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-4 text-[10px] sm:text-sm font-medium border-b-2 flex-1 sm:flex-initial ${
                activeSection === 'about'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:mr-2" />
              Обо мне
            </button>
            <button
              onClick={() => setActiveSection('experience')}
              className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-4 text-[10px] sm:text-sm font-medium border-b-2 flex-1 sm:flex-initial ${
                activeSection === 'experience'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:mr-2" />
              Опыт работы
            </button>
            <button
              onClick={() => setActiveSection('education')}
              className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-4 text-[10px] sm:text-sm font-medium border-b-2 flex-1 sm:flex-initial ${
                activeSection === 'education'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <GraduationCap className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:mr-2" />
              Образование
            </button>
            <button
              onClick={() => setActiveSection('skills')}
              className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-4 text-[10px] sm:text-sm font-medium border-b-2 flex-1 sm:flex-initial ${
                activeSection === 'skills'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Code className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:mr-2" />
              Навыки
            </button>
            <button
              onClick={() => setActiveSection('thoughts')}
              className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-4 text-[10px] sm:text-sm font-medium border-b-2 flex-1 sm:flex-initial ${
                activeSection === 'thoughts'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Brain className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:mr-2" />
              Мысли
            </button>
          </div>
        </div>
      </nav>

      {/* Contact Info */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-gray-600 justify-center md:justify-start">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <Mail size={16} />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-purple-600 transition-colors text-sm md:text-base">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <Phone size={16} />
              <a href={`tel:${personalInfo.phone}`} className="hover:text-purple-600 transition-colors text-sm md:text-base">
                {personalInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <Globe size={16} />
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors text-sm md:text-base">
                {personalInfo.github}
              </a>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <Link size={16} />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors text-sm md:text-base">
                {personalInfo.linkedin}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {activeSection === 'about' && (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Обо мне</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Всем привет! Меня зовут Динар, мне 20 лет. Я занимаюсь разработкой веб-приложений, telegram ботов и мобильных приложений. Данный сайт является моим портфолио, где вы можете узнать обо мне, моем опыте работы и моих навыках. Также вы можете посмотреть мои проекты во вкладке "Опыт работы".Также думаю сделать из этого сервиса некий блог, где я буду делиться своими мыслями и идеями.
            </p>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Опыт работы</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="border-l-2 border-purple-500 pl-4">
                <h3 className="font-medium">Младший разработчик</h3>
                <p className="text-gray-600">Компания Roscomtech • 2024 - настоящее время</p>
                <p className="mt-2 text-gray-600">
                  Создание и поддержка веб-приложений на FastApi, Django, Html, Css, Js. 
                  Разработка telegram ботов на Python. 
                  Разработка и поддержка мобильных приложений на Flutter.
                </p>
              </div>
            </div>
            <button
                  onClick={() => setShowProjects(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Посмотреть работы
                </button>
          </div>
        )}

        {/* Модальное окно с проектами */}
        {showProjects && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-purple-600">Мои проекты</h2>
                  <button
                    onClick={() => setShowProjects(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Проект 1 */}
                  <a 
                    href="https://radmirfaizov.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg mb-2 text-purple-600 group-hover:text-purple-700">Сайт-визитка для Радмира Фаизова</h3>
                      <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                    </div>
                    <p className="text-gray-600 mb-3">
                      Лендинг для привлечения людей, которые хотят узнать больше о основателе компании JSAN.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Html</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Css</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">JS</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Wordpress</span>
                    </div>
                  </a>

                  {/* Проект 2 */}
                  <a 
                    href="https://t.me/Progressoforlife_bot" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg mb-2 text-purple-600 group-hover:text-purple-700">Todo приложение в Telegram</h3>
                      <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                    </div>
                    <p className="text-gray-600 mb-3">
                      Система для отслеживания достижения поставленных задач. Пэт-проект, пока что отключен от хостинга.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">FastAPI</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Python</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Aiogram</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">React</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">PostgreSQL</span>
                    </div>
                  </a>
                  {/* Проект 3 */}
                  <a 
                    href="https://davletovadesigner.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg mb-2 text-purple-600 group-hover:text-purple-700">Сайт-визитка для дизайнера</h3>
                      <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                    </div>
                    <p className="text-gray-600 mb-3">
                      Лендинг для привлечения клиентов для дизайнера.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Html</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Css</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">JS</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Wordpress</span>
                    </div>
                  </a>
                  {/* Проект 4 */}
                  <a 
                    href="https://piskareva.pro/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg mb-2 text-purple-600 group-hover:text-purple-700">Сайт-визитка для ораторского мастерства</h3>
                      <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                    </div>
                    <p className="text-gray-600 mb-3">
                      Лендинг для Светланы Пискарёвой, которая занимается ораторским мастерством.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Html</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Css</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">JS</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Wordpress</span>
                    </div>
                  </a>
                  {/* Проект 5 */}
                  <div className="block border rounded-lg p-4 hover:shadow-lg transition-shadow group relative">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg mb-2 text-purple-600">Топливные карты</h3>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Решение для топливных карт, которое позволяет пользователям заправляться на любой заправке, которая подключена к системе. Принимаю малую часть в разработке данного проекта.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Flutter</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Dart</span>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <a 
                        href="https://play.google.com/store/apps/details?id=com.fueltk.mpfueltk&hl=ru" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M5.4 2.3c-.3.2-.5.5-.5.9v17.6c0 .4.2.7.5.9l9.5-9.7L5.4 2.3zm10.3 9.3l2.5 2.5c.4.4.4 1 0 1.4l-2.1 2.1L11.3 12l4.4-4.6 2.1 2.1c.4.4.4 1 0 1.4l-2.1 2.7zm-.9-1L10.2 12l4.6 1.4 2.5-2.5c.4-.4.4-1 0-1.4l-2.5-2.5c-.4-.4-1-.4-1.4 0l-2.5 2.5zM5.8 20.2c.3.2.7.2 1 0l10.4-6-2.9-2.9-8.5 8.9z"/>
                        </svg>
                        Google Play
                      </a>
                      <a 
                        href="https://apps.apple.com/us/app/%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D1%8B/id1668042895?l=ru" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.42 1.236.096 2.508-.636 3.288-1.56z"/>
                        </svg>
                        App Store
                      </a>
                    </div>
                    
                  </div>
                  {/* Проект 6 */}
                  <a 
                        href="https://greenapple02.ru" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg mb-2 text-purple-600 group-hover:text-purple-700">Сайт-визитка для ремонта техники</h3>
                          <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                        </div>
                        <p className="text-gray-600 mb-3">
                          Сайт для компании Green Apple, которая занимается ремонтом цифровой техники.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Html</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Css</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">JS</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Wordpress</span>
                        </div>
                      </a>
                  {/* Проект 7 */}
                  <a 
                        href="https://t.me/smart_hutor_bot" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg mb-2 text-purple-600 group-hover:text-purple-700">Telegram-бот для управления пляжем</h3>
                          <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                        </div>
                        <p className="text-gray-600 mb-3">
                          Автоматизация работы пляжа, проход при помощи qr-кода, все транзакции проходят через бота.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Django</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">FastApi</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Aiogram</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">Python</span>
                        </div>
                      </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Образование</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-medium">Уфимский университет науки и технологий</h3>
                <p className="text-gray-600">2022 - н.в.</p>
                <p className="mt-2 text-gray-600">
                  Информатика и вычислительная техника, кафедра автоматизированных систем управления.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Навыки</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Технические навыки</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Python', level: 90 },
                    { name: 'FastApi', level: 70 },
                    { name: 'Django', level: 65 },
                    { name: 'PostgreSQL', level: 40 },
                    { name: 'Docker', level: 40 },
                    { name: 'Git', level: 60 },
                    { name: 'Golang', level: 60 },
                    { name: 'React', level: 40 },
                    { name: 'Html', level: 75 },
                    { name: 'Css', level: 70 },
                    { name: 'Js', level: 65 }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple-500 h-2.5 rounded-full" 
                          style={{width: `${skill.level}%`}}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <h3 className="font-medium mb-3">Софт скилы</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Коммуникация', level: 90 },
                    { name: 'Навыки переговоров', level: 85 },
                    { name: 'Командная работа', level: 75 },
                    { name: 'Обучаемость', level: 95 }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple-500 h-2.5 rounded-full" 
                          style={{width: `${skill.level}%`}}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'thoughts' && (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center py-12">
              {/* Прелоадер */}
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mb-4"></div>
              
              {/* Иконка "в разработке" */}
              <Construction className="w-16 h-16 text-purple-600 mb-4" />
              
              {/* Текст */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Раздел в разработке</h2>
              <p className="text-gray-600 text-center max-w-md">
                Скоро здесь появятся мои мысли и заметки о программировании, технологиях и не только. 
                Следите за обновлениями!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Resume;
