import React from 'react';
import { 
  X, 
  Calendar, 
  BookOpen, 
  Smartphone, 
  Copy, 
  Check, 
  HelpCircle, 
  FlaskConical, 
  Library, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { SessionData, Language } from '../types';
import { THEORISTS_DATA } from '../data/theoristsData';

interface SessionDetailModalProps {
  session: SessionData | null;
  language: Language;
  onClose: () => void;
  onCopySingle: (session: SessionData) => void;
  isCopied: boolean;
  onOpenTracker?: (sessionId: number) => void;
}

export const SessionDetailModal: React.FC<SessionDetailModalProps> = ({
  session,
  language,
  onClose,
  onCopySingle,
  isCopied,
  onOpenTracker
}) => {
  if (!session) return null;

  const isBe = language === 'be';
  const title = isBe ? session.titleBe : session.titleRu;
  const subtitle = isBe ? session.subtitleBe : session.subtitleRu;
  const tool = isBe ? session.toolBe : session.toolRu;
  const sourcesCitation = isBe ? session.sourcesCitationBe : session.sourcesCitationRu;
  const description = isBe ? session.descriptionBe : session.descriptionRu;
  const comparativeFocus = isBe ? session.comparativeFocusBe : session.comparativeFocusRu;
  const seminarQuestions = isBe ? session.seminarQuestionsBe : session.seminarQuestionsRu;
  const studentAssignment = isBe ? session.studentAssignmentBe : session.studentAssignmentRu;

  const sessionTheorists = THEORISTS_DATA.filter(t => session.theorists.includes(t.id));

  return (
    <div 
      id="session-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="session-modal-content"
        className="relative bg-white border border-stone-300 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-stone-200 bg-stone-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-900 text-amber-200 font-mono text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                {session.monthYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-stone-200 text-stone-800 text-xs font-medium">
                {isBe ? `Семінар №${session.sessionNumber}` : `Семинар №${session.sessionNumber}`}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-medium border border-amber-300/60">
                <Sparkles className="w-3 h-3 text-amber-700" />
                {tool}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">
              {title}
            </h2>
            <p className="text-sm font-medium text-stone-600 mt-1">
              {subtitle}
            </p>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800">
          {/* Exact Sample Representation Box */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Library className="w-3.5 h-3.5" />
                {isBe ? 'Тэкст занятка (па ўзоры праграмы):' : 'Текст занятия (по образцу программы):'}
              </span>
              <button
                id="btn-copy-modal-format"
                onClick={() => onCopySingle(session)}
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-2 py-1 rounded transition-colors"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? (isBe ? 'Скапіявана' : 'Скопировано') : (isBe ? 'Капіяваць' : 'Копировать')}</span>
              </button>
            </div>
            <p className="text-xs text-stone-700 font-serif italic mb-2">
              {sourcesCitation}
            </p>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif">
              {description}
            </p>
          </div>

          {/* Comparative Case Study Box */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-amber-700" />
              {isBe ? 'Прадмет параўнальнага аналізу ў лабараторыі' : 'Предмет сравнительного анализа в лаборатории'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Literature */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs uppercase mb-2">
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  <span>{isBe ? 'Літаратурны тэкст' : 'Литературный текст'}</span>
                </div>
                <div className="font-serif font-bold text-base text-stone-900">
                  {session.literatureCase.work}
                </div>
                <div className="text-xs text-stone-600 mb-2">
                  {session.literatureCase.author} {session.literatureCase.year ? `(${session.literatureCase.year})` : ''}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed border-t border-stone-200/70 pt-2">
                  {session.literatureCase.aspectToAnalyze}
                </p>
              </div>

              {/* Mass Media */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs uppercase mb-2">
                  <Smartphone className="w-4 h-4 text-amber-800" />
                  <span>{isBe ? 'Масмедыя і культура' : 'Массмедиа и культура'}</span>
                </div>
                <div className="font-serif font-bold text-base text-stone-900">
                  {session.mediaCase.title}
                </div>
                <div className="text-xs text-stone-600 mb-2">
                  {session.mediaCase.platform} • {session.mediaCase.type}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed border-t border-stone-200/70 pt-2">
                  {session.mediaCase.aspectToAnalyze}
                </p>
              </div>
            </div>

            {/* Core Comparative Problem */}
            <div className="mt-3 p-3 rounded-lg bg-stone-100 border-l-4 border-amber-700 text-xs text-stone-800 leading-relaxed">
              <span className="font-bold">{isBe ? 'Ключавы навуковы фокус: ' : 'Ключевой научный фокус: '}</span>
              {comparativeFocus}
            </div>
          </div>

          {/* Seminar Discussion Questions */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              {isBe ? 'Пытанні для семінарскай дыскусіі' : 'Вопросы для семинарской дискуссии'}
            </h3>
            <ul className="space-y-2">
              {seminarQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                  <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Lab Assignment */}
          <div className="p-4 rounded-xl bg-stone-900 text-stone-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {isBe ? 'Практычнае заданне для студэнтаў' : 'Практическое задание для студентов'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {studentAssignment}
            </p>
          </div>

          {/* Reading List */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              {isBe ? 'Спіс літаратуры і крыніц да семінара' : 'Список литературы и источников к семинару'}
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-stone-900 block mb-1">
                  {isBe ? '1. Тэарэтычныя працы:' : '1. Теоретические труды:'}
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone-700">
                  {session.readingList.theory.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1">
                  {isBe ? '2. Мастацкія тэксты:' : '2. Художественные тексты:'}
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone-700">
                  {session.readingList.literature.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1">
                  {isBe ? '3. Медыйныя матэрыялы і кейсы:' : '3. Медийные материалы и кейсы:'}
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone-700">
                  {session.readingList.media.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCopySingle(session)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-medium transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              <span>{isBe ? 'Капіяваць тэкст занятка' : 'Копировать текст занятия'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onOpenTracker && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTracker(session.id);
                }}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-medium transition-colors"
              >
                <span>{isBe ? 'Адкрыць у нататніку студэнта' : 'Открыть в блокноте студента'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium transition-colors"
            >
              {isBe ? 'Закрыць' : 'Закрыть'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
