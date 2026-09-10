import React, { useState } from 'react';
import { Users, BookOpen, Sparkles, ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { THEORISTS_DATA } from '../data/theoristsData';
import { SESSIONS_DATA } from '../data/sessionsData';
import { Language, SessionData } from '../types';

interface TheoristsSectionProps {
  language: Language;
  onSelectSession: (session: SessionData) => void;
}

export const TheoristsSection: React.FC<TheoristsSectionProps> = ({
  language,
  onSelectSession,
}) => {
  const isBe = language === 'be';
  const [selectedTheoristId, setSelectedTheoristId] = useState<string | null>(null);

  const selectedTheorist = THEORISTS_DATA.find((t) => t.id === selectedTheoristId) || null;

  return (
    <div id="theorists-section-container" className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-stone-900 text-amber-200">
            {isBe ? 'Тэарэтычны падмурак' : 'Теоретический фундамент'}
          </span>
          <span className="text-xs text-stone-700">
            {isBe ? '7 класікаў і сучаснікаў нараталогіі' : '7 классиков и современников нарратологии'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
          {isBe ? 'Навуковая база лабараторыі' : 'Научная база лаборатории'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed max-w-4xl">
          {isBe
            ? 'Спецсемінар абапіраецца на фундаментальныя працы Валерыя Ігаравіча Цюпы, Міхаіла Бахціна, Юрыя Лотмана, Мішэля Фуко, Міке Баль, Джэрара Прынса і Вольфа Шміда. Націсніце на профіль даследчыка, каб пабачыць яго ключавыя паняцці, працы і звязаныя заняткі.'
            : 'Спецсеминар опирается на фундаментальные работы Валерия Игоревича Тюпы, Михаила Бахтина, Юрия Лотмана, Мишеля Фуко, Мике Баль, Джеральда Принса и Вольфа Шмида. Нажмите на профиль исследователя, чтобы увидеть ключевые понятия, труды и связанные занятия.'}
        </p>
      </div>

      {/* Theorist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {THEORISTS_DATA.map((theorist) => {
          const isSelected = selectedTheoristId === theorist.id;
          const name = isBe ? theorist.nameBe : theorist.nameRu;
          const role = isBe ? theorist.roleBe : theorist.roleRu;
          const concepts = isBe ? theorist.keyConceptsBe : theorist.keyConceptsRu;
          const mediaRelevance = isBe ? theorist.mediaRelevanceBe : theorist.mediaRelevanceRu;

          return (
            <div
              key={theorist.id}
              onClick={() => setSelectedTheoristId(isSelected ? null : theorist.id)}
              className={`cursor-pointer bg-white border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-700 ring-2 ring-amber-700/20 shadow-md'
                  : 'border-stone-200 hover:border-stone-400 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-stone-700 px-2 py-0.5 rounded bg-stone-100">
                    {theorist.lifespan}
                  </span>
                  <span className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded font-medium">
                    {theorist.associatedSessions.length} {isBe ? 'зан.' : 'зан.'}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-stone-900">
                  {name}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-snug">
                  {role}
                </p>

                {/* Key Concepts Pills */}
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1.5">
                    {isBe ? 'Ключавыя інструменты:' : 'Ключевые инструменты:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {concepts.map((concept, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200 font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media relevance explanation */}
                <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 leading-relaxed font-serif italic">
                  "{mediaRelevance}"
                </div>
              </div>

              {/* Major Works & Sessions count */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="text-[11px] text-stone-700 flex items-center justify-between">
                  <span className="font-semibold text-stone-700">
                    {isBe ? 'Заняткі ў праграме:' : 'Занятия в программе:'}
                  </span>
                  <div className="flex items-center gap-1">
                    {theorist.associatedSessions.map((sId) => (
                      <span
                        key={sId}
                        className="w-5 h-5 rounded-full bg-stone-800 text-amber-200 font-mono text-[10px] font-bold flex items-center justify-center"
                      >
                        {sId}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Theorist Deep-Dive Banner */}
      {selectedTheorist && (
        <div className="bg-stone-900 text-stone-100 border border-stone-800 rounded-2xl p-6 shadow-xl animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-800 pb-4 mb-4">
            <div>
              <span className="text-xs font-mono text-amber-300">
                {isBe ? 'Абраны даследчык' : 'Выбранный исследователь'} • {selectedTheorist.lifespan}
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                {isBe ? selectedTheorist.nameBe : selectedTheorist.nameRu}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {isBe ? selectedTheorist.roleBe : selectedTheorist.roleRu}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedTheoristId(null)}
                className="text-xs px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                {isBe ? 'Скінуць выбар' : 'Сбросить выбор'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {isBe ? 'Асноўныя тэарэтычныя працы:' : 'Основные теоретические труды:'}
              </h4>
              <ul className="space-y-1.5 text-stone-300">
                {selectedTheorist.majorWorks.map((work, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>{work}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {isBe ? 'Заняткі лабараторыі з удзелам гэтай тэорыі:' : 'Занятия лаборатории с участием этой теории:'}
              </h4>
              <div className="space-y-2">
                {SESSIONS_DATA.filter((s) => selectedTheorist.associatedSessions.includes(s.id)).map((sess) => (
                  <div
                    key={sess.id}
                    onClick={() => onSelectSession(sess)}
                    className="cursor-pointer p-2.5 rounded-lg bg-stone-800 hover:bg-stone-700/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-amber-300 font-bold block">
                        {sess.monthYear} • {isBe ? `Занятак №${sess.sessionNumber}` : `Занятие №${sess.sessionNumber}`}
                      </span>
                      <span className="text-xs font-medium text-stone-200 group-hover:text-white line-clamp-1">
                        {isBe ? sess.titleBe : sess.titleRu}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-300 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
