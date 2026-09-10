import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  FileText, 
  CheckSquare, 
  Copy, 
  Check, 
  Printer, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: 'syllabus' | 'format' | 'theorists' | 'tracker';
  onTabChange: (tab: 'syllabus' | 'format' | 'theorists' | 'tracker') => void;
  onCopyAll: () => void;
  copied: boolean;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  onCopyAll,
  copied,
  onPrint,
}) => {
  const isBe = language === 'be';

  return (
    <header id="academic-header" className="border-b border-stone-200 bg-stone-50/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with meta & controls */}
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-200/70">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-stone-900 text-amber-200 shadow-sm shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium tracking-wide uppercase bg-amber-100 text-amber-900 border border-amber-200/70">
                  {isBe ? 'Спецсемінар • 2026–2027' : 'Спецсеминар • 2026–2027'}
                </span>
                <span className="text-xs text-stone-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {isBe ? '10 месяцаў / 9 семінараў' : '10 месяцев / 9 семинаров'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight mt-0.5">
                {isBe ? 'Лабараторыя сучаснай нараталогіі' : 'Лаборатория современной нарратологии'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5 font-serif italic">
                {isBe 
                  ? 'Навуковы расклад заняткаў: нараталагічныя інструменты, масмедыя, культура і літаратура' 
                  : 'Научное расписание занятий: нарратологические инструменты, массмедиа, культура и литература'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:self-auto self-start">
            {/* Language Switcher */}
            <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-stone-100 text-xs font-medium">
              <button
                id="btn-lang-be"
                onClick={() => onLanguageChange('be')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isBe 
                    ? 'bg-stone-900 text-amber-200 shadow-xs' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Беларуская
              </button>
              <button
                id="btn-lang-ru"
                onClick={() => onLanguageChange('ru')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  !isBe 
                    ? 'bg-stone-900 text-amber-200 shadow-xs' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Русский
              </button>
            </div>

            {/* Quick Export & Print */}
            <button
              id="btn-copy-syllabus"
              onClick={onCopyAll}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 text-xs font-medium transition-colors shadow-xs"
              title={isBe ? 'Скапіяваць расклад у фармаце ўзору' : 'Скопировать расписание в формате образца'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{isBe ? 'Скапіявана!' : 'Скопировано!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>{isBe ? 'Скапіяваць узор' : 'Скопировать образец'}</span>
                </>
              )}
            </button>

            <button
              id="btn-print-syllabus"
              onClick={onPrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-stone-100 text-xs font-medium transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-stone-300" />
              <span>{isBe ? 'Друк / PDF' : 'Печать / PDF'}</span>
            </button>
          </div>
        </div>

        {/* Main Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto py-2.5 scrollbar-none" aria-label="Tabs">
          <button
            id="tab-syllabus"
            onClick={() => onTabChange('syllabus')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'syllabus'
                ? 'bg-stone-900 text-amber-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isBe ? 'Праграма 9 заняткаў' : 'Программа 9 занятий'}</span>
          </button>

          <button
            id="tab-format"
            onClick={() => onTabChange('format')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'format'
                ? 'bg-stone-900 text-amber-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isBe ? 'Узор і фармат (тэкст)' : 'Образец и формат (текст)'}</span>
            <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-amber-200/30 text-amber-900 border border-amber-300/40">
              {isBe ? 'па ўзоры' : 'по образцу'}
            </span>
          </button>

          <button
            id="tab-theorists"
            onClick={() => onTabChange('theorists')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'theorists'
                ? 'bg-stone-900 text-amber-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isBe ? 'Навуковая база (7 тэарэтыкаў)' : 'Научная база (7 теоретиков)'}</span>
          </button>

          <button
            id="tab-tracker"
            onClick={() => onTabChange('tracker')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'tracker'
                ? 'bg-stone-900 text-amber-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>{isBe ? 'Даследчы нататнік студэнта' : 'Блокнот студента'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
