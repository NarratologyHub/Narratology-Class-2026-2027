import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  BookOpen, 
  Smartphone, 
  Library, 
  Save, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { SESSIONS_DATA } from '../data/sessionsData';
import { Language, SessionData } from '../types';

interface TrackerData {
  [sessionId: number]: {
    theoryRead: boolean;
    literatureRead: boolean;
    mediaAnalyzed: boolean;
    notes: string;
  };
}

interface StudentLabTrackerProps {
  language: Language;
  onSelectSession: (session: SessionData) => void;
  activeSessionId?: number | null;
}

const STORAGE_KEY = 'narratology_lab_student_tracker_v1';

export const StudentLabTracker: React.FC<StudentLabTrackerProps> = ({
  language,
  onSelectSession,
  activeSessionId,
}) => {
  const isBe = language === 'be';

  const [trackerState, setTrackerState] = useState<TrackerData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial state
    const initial: TrackerData = {};
    SESSIONS_DATA.forEach((s) => {
      initial[s.id] = {
        theoryRead: false,
        literatureRead: false,
        mediaAnalyzed: false,
        notes: '',
      };
    });
    return initial;
  });

  const [selectedSessionId, setSelectedSessionId] = useState<number>(
    activeSessionId || 1
  );

  useEffect(() => {
    if (activeSessionId) {
      setSelectedSessionId(activeSessionId);
    }
  }, [activeSessionId]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerState));
    } catch (e) {
      console.error(e);
    }
  }, [trackerState]);

  const toggleCheck = (sessionId: number, field: 'theoryRead' | 'literatureRead' | 'mediaAnalyzed') => {
    setTrackerState((prev) => ({
      ...prev,
      [sessionId]: {
        ...prev[sessionId],
        [field]: !prev[sessionId]?.[field],
      },
    }));
  };

  const updateNotes = (sessionId: number, notes: string) => {
    setTrackerState((prev) => ({
      ...prev,
      [sessionId]: {
        ...prev[sessionId],
        notes,
      },
    }));
  };

  const handleReset = () => {
    if (window.confirm(isBe ? 'Ачысціць усе пазнакі і нататкі?' : 'Очистить все отметки и заметки?')) {
      const resetState: TrackerData = {};
      SESSIONS_DATA.forEach((s) => {
        resetState[s.id] = {
          theoryRead: false,
          literatureRead: false,
          mediaAnalyzed: false,
          notes: '',
        };
      });
      setTrackerState(resetState);
    }
  };

  // Calculate overall progress
  let totalTasks = SESSIONS_DATA.length * 3;
  let completedTasks = 0;
  SESSIONS_DATA.forEach((s) => {
    const item = trackerState[s.id];
    if (item?.theoryRead) completedTasks++;
    if (item?.literatureRead) completedTasks++;
    if (item?.mediaAnalyzed) completedTasks++;
  });
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const currentSession = SESSIONS_DATA.find((s) => s.id === selectedSessionId) || SESSIONS_DATA[0];
  const currentTaskState = trackerState[currentSession.id] || {
    theoryRead: false,
    literatureRead: false,
    mediaAnalyzed: false,
    notes: '',
  };

  return (
    <div id="student-lab-tracker" className="space-y-6">
      {/* Progress overview header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-stone-900 text-amber-200">
              {isBe ? 'Студэнцкі практыкум' : 'Студенческий практикум'}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
              {isBe ? 'Даследчы нататнік і трэкер падрыхтоўкі' : 'Исследовательский блокнот и трекер подготовки'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {isBe
                ? 'Адзначайце прачытаныя тэксты, фіксуйце назіранні па медыякейсах і запісвайце гіпотэзы да семінараў.'
                : 'Отмечайте прочитанные тексты, фиксируйте наблюдения по медиакейсам и записывайте гипотезы к семинарам.'}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-stone-900">
                {progressPercent}%
              </div>
              <div className="text-[11px] text-stone-700">
                {completedTasks} / {totalTasks} {isBe ? 'задач выканана' : 'задач выполнено'}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-stone-700 hover:text-rose-600 hover:bg-stone-100 transition-colors"
              title={isBe ? 'Скінуць увесь прагрэс' : 'Сбросить весь прогресс'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
          <div
            className="h-full bg-amber-700 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main interactive grid: Left session selector, Right active session workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sessions List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block px-1">
            {isBe ? '9 заняткаў цыкла:' : '9 занятий цикла:'}
          </span>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {SESSIONS_DATA.map((s) => {
              const state = trackerState[s.id];
              const isSelected = selectedSessionId === s.id;
              const isCompleted = state?.theoryRead && state?.literatureRead && state?.mediaAnalyzed;

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSessionId(s.id)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="pr-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {s.monthYear}
                      </span>
                      <span className="text-xs font-medium line-clamp-1">
                        {isBe ? s.titleBe : s.titleRu}
                      </span>
                    </div>
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                  ) : (
                    <span className={`text-[10px] font-mono shrink-0 ml-1 ${isSelected ? 'text-stone-400' : 'text-stone-700'}`}>
                      {[state?.theoryRead, state?.literatureRead, state?.mediaAnalyzed].filter(Boolean).length}/3
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Session Workspace */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
          {/* Header of active session */}
          <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-amber-800 px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
                  {currentSession.monthYear} • {isBe ? `Занятак №${currentSession.sessionNumber}` : `Занятие №${currentSession.sessionNumber}`}
                </span>
                <span className="text-xs font-semibold text-stone-600">
                  {isBe ? currentSession.toolBe : currentSession.toolRu}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {isBe ? currentSession.titleBe : currentSession.titleRu}
              </h3>
            </div>

            <button
              onClick={() => onSelectSession(currentSession)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors shrink-0"
            >
              <span>{isBe ? 'Поўны план' : 'Полный план'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Checklist of 3 tasks */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
              {isBe ? 'Чэк-ліст падрыхтоўкі да семінара:' : 'Чек-лист подготовки к семинару:'}
            </span>

            {/* Task 1: Theory */}
            <div
              onClick={() => toggleCheck(currentSession.id, 'theoryRead')}
              className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                currentTaskState.theoryRead
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-300'
              }`}
            >
              <div className="mt-0.5">
                {currentTaskState.theoryRead ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block">
                  {isBe ? '1. Апрацаваць тэарэтычныя першакрыніцы' : '1. Изучить теоретические первоисточники'}
                </span>
                <span className="text-stone-600 text-xs mt-0.5 block font-serif">
                  {currentSession.readingList.theory[0]}
                </span>
              </div>
            </div>

            {/* Task 2: Literature */}
            <div
              onClick={() => toggleCheck(currentSession.id, 'literatureRead')}
              className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                currentTaskState.literatureRead
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-300'
              }`}
            >
              <div className="mt-0.5">
                {currentTaskState.literatureRead ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block">
                  {isBe ? '2. Прачытаць мастацкі тэкст' : '2. Прочитать художественный текст'}
                </span>
                <span className="text-stone-600 text-xs mt-0.5 block font-serif">
                  {currentSession.literatureCase.author} «{currentSession.literatureCase.work}»
                </span>
              </div>
            </div>

            {/* Task 3: Media */}
            <div
              onClick={() => toggleCheck(currentSession.id, 'mediaAnalyzed')}
              className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                currentTaskState.mediaAnalyzed
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-300'
              }`}
            >
              <div className="mt-0.5">
                {currentTaskState.mediaAnalyzed ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block">
                  {isBe ? '3. Прааналізаваць медыйны кейс' : '3. Проанализировать медийный кейс'}
                </span>
                <span className="text-stone-600 text-xs mt-0.5 block font-serif">
                  {currentSession.mediaCase.platform}: {currentSession.mediaCase.title}
                </span>
              </div>
            </div>
          </div>

          {/* Student Notes Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {isBe ? 'Даследчыя нататкі і гіпотэзы да семінара:' : 'Исследовательские заметки и гипотезы к семинару:'}
              </span>
              <span className="text-[11px] text-stone-700 italic">
                {isBe ? 'аўтазахаванне' : 'автосохранение'}
              </span>
            </div>
            <textarea
              id={`notes-textarea-${currentSession.id}`}
              value={currentTaskState.notes}
              onChange={(e) => updateNotes(currentSession.id, e.target.value)}
              placeholder={
                isBe
                  ? 'Увядзіце вашыя высновы, параўнанні і пытанні да дыскусіі...'
                  : 'Введите ваши выводы, сравнения и вопросы к дискуссии...'
              }
              rows={6}
              className="w-full p-3.5 rounded-xl border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none text-xs sm:text-sm text-stone-800 leading-relaxed font-sans bg-stone-50/50"
            />
          </div>

          {/* Practical Assignment Reminder */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-stone-800">
            <span className="font-bold text-amber-900 block mb-1">
              {isBe ? 'Індывідуальнае заданне лабараторыі:' : 'Индивидуальное задание лаборатории:'}
            </span>
            <p className="leading-relaxed">
              {isBe ? currentSession.studentAssignmentBe : currentSession.studentAssignmentRu}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
