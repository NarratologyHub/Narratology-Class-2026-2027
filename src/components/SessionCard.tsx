import React from 'react';
import { 
  Calendar, 
  BookOpen, 
  Smartphone, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight, 
  UserCheck, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SessionData, Language } from '../types';
import { THEORISTS_DATA } from '../data/theoristsData';

interface SessionCardProps {
  session: SessionData;
  language: Language;
  onSelect: (session: SessionData) => void;
  onCopySingle: (session: SessionData) => void;
  isCopied: boolean;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  language,
  onSelect,
  onCopySingle,
  isCopied
}) => {
  const isBe = language === 'be';
  const title = isBe ? session.titleBe : session.titleRu;
  const subtitle = isBe ? session.subtitleBe : session.subtitleRu;
  const tool = isBe ? session.toolBe : session.toolRu;
  const sourcesCitation = isBe ? session.sourcesCitationBe : session.sourcesCitationRu;
  const description = isBe ? session.descriptionBe : session.descriptionRu;
  const comparativeFocus = isBe ? session.comparativeFocusBe : session.comparativeFocusRu;

  // Resolve theorist names
  const sessionTheorists = THEORISTS_DATA.filter(t => session.theorists.includes(t.id));

  return (
    <article 
      id={`session-card-${session.id}`}
      className="group relative bg-white border border-stone-200 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden hover:border-amber-700/40"
    >
      {/* Top banner / header */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-900 text-amber-200 font-mono text-xs font-bold tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              {session.monthYear}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/80">
              {isBe ? `Занятак №${session.sessionNumber}` : `Занятие №${session.sessionNumber}`}
            </span>
          </div>

          <button
            id={`btn-copy-card-${session.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onCopySingle(session);
            }}
            title={isBe ? 'Скапіяваць у фармаце ўзору' : 'Скопировать в формате образца'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Narratological tool badge */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3 h-3 text-amber-600" />
            {tool}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
          {title}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
          {subtitle}
        </p>

        {/* Sources Citation formatted strictly like the sample */}
        <div className="mt-3 p-2.5 rounded-lg bg-stone-50 border border-stone-200/70 text-xs text-stone-700 font-serif italic leading-relaxed">
          {sourcesCitation}
        </div>

        {/* Description paragraph */}
        <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>

      {/* Middle comparative section preview */}
      <div className="px-5 sm:px-6 py-3 bg-stone-50/70 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-start space-x-2">
          <BookOpen className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-stone-700 block">
              {isBe ? 'Літаратурны прыклад:' : 'Литературный пример:'}
            </span>
            <span className="text-stone-800">
              {session.literatureCase.author} «{session.literatureCase.work}»
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Smartphone className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-stone-700 block">
              {isBe ? 'Масмедыя / Культура:' : 'Массмедиа / Культура:'}
            </span>
            <span className="text-stone-800">
              {session.mediaCase.platform}: {session.mediaCase.title}
            </span>
          </div>
        </div>
      </div>

      {/* Footer with Theorists & Detail button */}
      <div className="p-4 sm:px-6 bg-stone-100/60 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-stone-700 mr-1">
            {isBe ? 'Тэарэтыкі:' : 'Теоретики:'}
          </span>
          {sessionTheorists.map((t) => (
            <span 
              key={t.id} 
              className="text-[11px] px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200 font-medium"
            >
              {isBe ? t.nameBe.split(' ').pop() : t.nameRu.split(' ').pop()}
            </span>
          ))}
        </div>

        <button
          id={`btn-view-session-${session.id}`}
          onClick={() => onSelect(session)}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-stone-800 hover:text-amber-800 transition-colors ml-auto group-hover:translate-x-0.5 transform duration-150"
        >
          <span>{isBe ? 'Матэрыялы занятка' : 'Материалы занятия'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
