import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Check, 
  Copy, 
  Smartphone, 
  Users, 
  Printer, 
  X,
  Compass,
  CalendarDays,
  FileCheck
} from 'lucide-react';
import { Header } from './components/Header';
import { SessionCard } from './components/SessionCard';
import { SessionDetailModal } from './components/SessionDetailModal';
import { FormatTextExport } from './components/FormatTextExport';
import { TheoristsSection } from './components/TheoristsSection';
import { StudentLabTracker } from './components/StudentLabTracker';
import { SESSIONS_DATA } from './data/sessionsData';
import { THEORISTS_DATA } from './data/theoristsData';
import { Language, SessionData } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('be');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'format' | 'theorists' | 'tracker'>('syllabus');
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [trackerSessionId, setTrackerSessionId] = useState<number | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheoristFilter, setSelectedTheoristFilter] = useState<string>('all');

  // Copy status
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedCardId, setCopiedCardId] = useState<number | null>(null);

  const isBe = language === 'be';

  // Format single session strictly like user sample
  const formatSingleSession = (s: SessionData, lang: Language) => {
    const isB = lang === 'be';
    const title = isB ? s.titleBe : s.titleRu;
    const subtitle = isB ? s.subtitleBe : s.subtitleRu;
    const citation = isB ? s.sourcesCitationBe : s.sourcesCitationRu;
    const desc = isB ? s.descriptionBe : s.descriptionRu;

    return `${s.monthYear}\n${title}\n${subtitle}\n${citation}\n${desc}`;
  };

  // Copy single session
  const handleCopySingle = (session: SessionData) => {
    const text = formatSingleSession(session, language);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCardId(session.id);
      setTimeout(() => setCopiedCardId(null), 2500);
    });
  };

  // Copy all 9 sessions in exact user format
  const handleCopyAll = () => {
    const fullText = SESSIONS_DATA.map((s) => formatSingleSession(s, language)).join('\n\n');
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    });
  };

  // Print syllabus
  const handlePrint = () => {
    window.print();
  };

  // Navigate to tracker with specific session
  const handleOpenTrackerForSession = (sessionId: number) => {
    setTrackerSessionId(sessionId);
    setActiveTab('tracker');
  };

  // Filter sessions
  const filteredSessions = SESSIONS_DATA.filter((s) => {
    const title = isBe ? s.titleBe : s.titleRu;
    const tool = isBe ? s.toolBe : s.toolRu;
    const desc = isBe ? s.descriptionBe : s.descriptionRu;
    const media = s.mediaCase.platform + ' ' + s.mediaCase.title;
    const lit = s.literatureCase.author + ' ' + s.literatureCase.work;

    const matchesSearch =
      searchQuery === '' ||
      [title, tool, desc, media, lit, s.monthYear].some((val) =>
        val.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTheorist =
      selectedTheoristFilter === 'all' || s.theorists.includes(selectedTheoristFilter);

    return matchesSearch && matchesTheorist;
  });

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans flex flex-col selection:bg-amber-200 selection:text-stone-900">
      {/* Top Academic Navigation */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCopyAll={handleCopyAll}
        copied={copiedAll}
        onPrint={handlePrint}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab 1: Syllabus & Cards */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6 animate-fade-in">
            {/* Academic intro banner */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-stone-800">
              <div className="relative z-10 max-w-4xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 font-mono text-xs font-semibold tracking-wide uppercase border border-amber-300/30">
                    {isBe ? 'Навучальны план на 10 месяцаў' : 'Учебный план на 10 месяцев'}
                  </span>
                  <span className="text-xs text-stone-400">
                    {isBe ? 'Верасень 2026 – Чэрвень 2027' : 'Сентябрь 2026 – Июнь 2027'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                  {isBe 
                    ? 'Расклад навуковых заняткаў лабараторыі па нараталогіі' 
                    : 'Расписание научных занятий лаборатории по нарратологии'}
                </h2>

                <p className="text-xs sm:text-sm text-stone-300 mt-2.5 leading-relaxed font-serif">
                  {isBe
                    ? 'Кожны занятак прысвечаны разбору аднаго ключавога нараталагічнага інструмента (катэгорыя падзеі, наратар, факалізацыя, дыскурсныя модусы, паліфанія, нарататар, металепсіс і семіясфера) на прыкладах са сферы класічнай літаратуры і сучасных лічбавых масмедыя (Instagram, TikTok, YouTube, Reddit, алгарытмы, серыялы).'
                    : 'Каждое занятие посвящено разбору одного ключевого нарратологического инструмента (категория события, нарратор, фокализация, дискурсные модусы, полифония, наррататор, металепсис и семиосфера) на примерах классической литературы и современных цифровых массмедиа (Instagram, TikTok, YouTube, Reddit, алгоритмы, сериалы).'}
                </p>

                {/* Theorists ribbon */}
                <div className="mt-4 pt-4 border-t border-stone-800 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-stone-400 font-medium">
                    {isBe ? 'Тэарэтычная база:' : 'Теоретическая база:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {THEORISTS_DATA.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTheoristFilter(t.id);
                        }}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                          selectedTheoristFilter === t.id
                            ? 'bg-amber-300 text-stone-900 font-bold'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {isBe ? t.nameBe.split(' ').pop() : t.nameRu.split(' ').pop()}
                      </button>
                    ))}
                    {selectedTheoristFilter !== 'all' && (
                      <button
                        onClick={() => setSelectedTheoristFilter('all')}
                        className="px-2 py-0.5 rounded text-[11px] bg-stone-700 text-stone-300 hover:bg-stone-600 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        <span>{isBe ? 'Скінуць' : 'Сбросить'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-stone-700 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isBe
                      ? 'Пошук па інструментах, аўтарах, медыя...'
                      : 'Поиск по инструментам, авторам, медиа...'
                  }
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none text-xs sm:text-sm text-stone-900 placeholder:text-stone-700"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-700 hover:text-stone-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Theorist dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Filter className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                <select
                  value={selectedTheoristFilter}
                  onChange={(e) => setSelectedTheoristFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800 focus:border-amber-700 outline-none"
                >
                  <option value="all">
                    {isBe ? 'Усе навукоўцы (7 аўтараў)' : 'Все исследователи (7 авторов)'}
                  </option>
                  {THEORISTS_DATA.map((t) => (
                    <option key={t.id} value={t.id}>
                      {isBe ? t.nameBe : t.nameRu}
                    </option>
                  ))}
                </select>

                <span className="text-xs text-stone-700 whitespace-nowrap pl-2 border-l border-stone-200">
                  {filteredSessions.length} / {SESSIONS_DATA.length} {isBe ? 'зан.' : 'зан.'}
                </span>
              </div>
            </div>

            {/* 9 Sessions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  language={language}
                  onSelect={(s) => setSelectedSession(s)}
                  onCopySingle={handleCopySingle}
                  isCopied={copiedCardId === session.id}
                />
              ))}
            </div>

            {filteredSessions.length === 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <Compass className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-700">
                  {isBe ? 'Заняткаў па гэтых крытэрыях не знойдзена.' : 'Занятий по данным критериям не найдено.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTheoristFilter('all');
                  }}
                  className="mt-3 text-xs text-amber-800 underline font-semibold"
                >
                  {isBe ? 'Скінуць фільтры' : 'Сбросить фильтры'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Format & Plain Text Export (Strict user sample) */}
        {activeTab === 'format' && (
          <div className="animate-fade-in">
            <FormatTextExport
              sessions={SESSIONS_DATA}
              language={language}
              onCopyAll={handleCopyAll}
              copied={copiedAll}
            />
          </div>
        )}

        {/* Tab 3: Theorists Section */}
        {activeTab === 'theorists' && (
          <div className="animate-fade-in">
            <TheoristsSection
              language={language}
              onSelectSession={(sess) => setSelectedSession(sess)}
            />
          </div>
        )}

        {/* Tab 4: Student Lab Tracker */}
        {activeTab === 'tracker' && (
          <div className="animate-fade-in">
            <StudentLabTracker
              language={language}
              onSelectSession={(sess) => setSelectedSession(sess)}
              activeSessionId={trackerSessionId}
            />
          </div>
        )}
      </main>

      {/* Deep-Dive Session Detail Modal */}
      <SessionDetailModal
        session={selectedSession}
        language={language}
        onClose={() => setSelectedSession(null)}
        onCopySingle={handleCopySingle}
        isCopied={selectedSession ? copiedCardId === selectedSession.id : false}
        onOpenTracker={handleOpenTrackerForSession}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-stone-50 py-6 text-center text-xs text-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-serif">
            {isBe
              ? 'Лабараторыя нараталогіі • Акадэмічны спецсемінар на 10 месяцаў'
              : 'Лаборатория нарратологии • Академический спецсеминар на 10 месяцев'}
          </span>
          <span className="text-[11px] text-stone-700">
            В. І. Цюпа • М. Бахцін • Ю. Лотман • М. Фуко • М. Баль • Дж. Прынс • В. Шмід
          </span>
        </div>
      </footer>
    </div>
  );
}
