import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Sparkles } from 'lucide-react';
import { SessionData, Language } from '../types';

interface FormatTextExportProps {
  sessions: SessionData[];
  language: Language;
  onCopyAll: () => void;
  copied: boolean;
}

export const FormatTextExport: React.FC<FormatTextExportProps> = ({
  sessions,
  language,
  onCopyAll,
  copied,
}) => {
  const isBe = language === 'be';
  const [viewMode, setViewMode] = useState<'formatted' | 'raw' | 'markdown'>('formatted');

  // Format all sessions according to the exact user sample
  const generatePlainText = () => {
    return sessions
      .map((s) => {
        const title = isBe ? s.titleBe : s.titleRu;
        const subtitle = isBe ? s.subtitleBe : s.subtitleRu;
        const citation = isBe ? s.sourcesCitationBe : s.sourcesCitationRu;
        const desc = isBe ? s.descriptionBe : s.descriptionRu;

        return `${s.monthYear}\n${title}\n${subtitle}\n${citation}\n${desc}`;
      })
      .join('\n\n');
  };

  const generateMarkdownText = () => {
    return sessions
      .map((s) => {
        const title = isBe ? s.titleBe : s.titleRu;
        const subtitle = isBe ? s.subtitleBe : s.subtitleRu;
        const citation = isBe ? s.sourcesCitationBe : s.sourcesCitationRu;
        const desc = isBe ? s.descriptionBe : s.descriptionRu;
        const tool = isBe ? s.toolBe : s.toolRu;

        return `### ${s.monthYear} — ${title}\n*${subtitle}*\n\n> **${isBe ? 'Інструмент' : 'Инструмент'}:** ${tool}\n\n${citation}\n\n${desc}\n\n---\n`;
      })
      .join('\n');
  };

  const handleDownload = (ext: 'txt' | 'md') => {
    const content = ext === 'txt' ? generatePlainText() : generateMarkdownText();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `narratology_laboratory_syllabus_2026_2027_${language}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="format-text-export-container" className="space-y-6">
      {/* Top Action Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/60">
              {isBe ? 'Тэкставы фармат узору' : 'Текстовый формат образца'}
            </span>
            <span className="text-xs text-stone-700">
              {isBe ? '9 заняткаў па запытанай структуры' : '9 занятий по запрошенной структуре'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-1">
            {isBe ? 'Расклад заняткаў у фармаце праграмы' : 'Расписание занятий в формате программы'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            {isBe 
              ? 'Тэкст ніжэй цалкам гатовы для капіявання ў навучальныя планы, метадычкі або рабочыя праграмы дысцыплін.' 
              : 'Текст ниже полностью готов для копирования в учебные планы, методички или рабочие программы дисциплин.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* View mode toggle */}
          <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-stone-100 text-xs font-medium">
            <button
              onClick={() => setViewMode('formatted')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'formatted' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {isBe ? 'Фарматаваны' : 'Форматированный'}
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'raw' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Plain Text
            </button>
            <button
              onClick={() => setViewMode('markdown')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'markdown' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Markdown
            </button>
          </div>

          <button
            onClick={onCopyAll}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-medium transition-colors shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isBe ? 'Скапіявана ў буфер!' : 'Скопировано в буфер!') : (isBe ? 'Скапіяваць усе 9 заняткаў' : 'Скопировать все 9 занятий')}</span>
          </button>

          <button
            onClick={() => handleDownload(viewMode === 'markdown' ? 'md' : 'txt')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium transition-colors shadow-xs"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{viewMode === 'markdown' ? '.MD' : '.TXT'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'formatted' ? (
        <div className="space-y-6">
          {sessions.map((session) => {
            const title = isBe ? session.titleBe : session.titleRu;
            const subtitle = isBe ? session.subtitleBe : session.subtitleRu;
            const citation = isBe ? session.sourcesCitationBe : session.sourcesCitationRu;
            const desc = isBe ? session.descriptionBe : session.descriptionRu;

            return (
              <div
                key={session.id}
                className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs font-serif hover:border-amber-700/30 transition-colors"
              >
                {/* Date header like 09.2026 */}
                <div className="text-base font-bold text-stone-900 font-mono tracking-wide mb-1">
                  {session.monthYear}
                </div>

                {/* Topic Title */}
                <div className="text-lg font-bold text-stone-900 mb-1 leading-snug">
                  {title}
                </div>
                <div className="text-sm font-semibold text-stone-700 mb-2">
                  {subtitle}
                </div>

                {/* Citation in parentheses strictly following sample */}
                <div className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-3">
                  {citation}
                </div>

                {/* Discussion description */}
                <div className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                  {desc}
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'raw' ? (
        <div className="bg-stone-900 text-stone-100 rounded-xl p-6 shadow-inner font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-amber-800 selection:text-white">
          {generatePlainText()}
        </div>
      ) : (
        <div className="bg-stone-900 text-amber-100/90 rounded-xl p-6 shadow-inner font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-amber-800 selection:text-white">
          {generateMarkdownText()}
        </div>
      )}
    </div>
  );
};
