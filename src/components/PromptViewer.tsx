import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  BookOpen, 
  UserCheck, 
  Target, 
  Layers, 
  Code2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Building2,
  FileCode,
  Eye,
  FileText
} from 'lucide-react';
import { PromptStructure } from '../types/prompt';
import { UOE_SCHOOLS_LIST } from '../data/defaultPrompts';

interface PromptViewerProps {
  prompt: PromptStructure;
  formattedText: string;
  onCopySection: (title: string, text: string) => void;
  onCopyFullPrompt: () => void;
  isCopiedFull: boolean;
  onSelectPreset: (presetId: string) => void;
  onOpenLivePreview: () => void;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({
  prompt,
  formattedText,
  onCopySection,
  onCopyFullPrompt,
  isCopiedFull,
  onSelectPreset,
  onOpenLivePreview,
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'raw'>('card');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [expandedRequirements, setExpandedRequirements] = useState(true);

  const handleCopySection = (title: string, text: string) => {
    onCopySection(title, text);
    setCopiedSection(title);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const wordCount = formattedText.split(/\s+/).filter(Boolean).length;
  const tokenEstimate = Math.round(wordCount * 1.35);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: University of Eldoret Specifics */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#06281e] via-[#093527] to-[#041a13] border border-emerald-800/60 p-6 shadow-xl shadow-black/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                University of Eldoret (UoE) Official Standard
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                Chepkoilel & Town Campuses
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/50">
                Format: Context • Role • Task • Requirements • Output
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {prompt.title}
            </h1>
            <p className="text-emerald-200/80 text-sm mt-1 max-w-3xl">
              {prompt.subtitle}. Tailored with 30% CAT + 70% Final Exam grading rules, past paper archives for all 8 UoE schools, and HELB/bursary trackers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenLivePreview}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm border border-emerald-500/40 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-95"
            >
              <ExternalLink className="w-4 h-4 text-amber-300" />
              <span>Test Live Hub Prototype</span>
            </button>

            <button
              onClick={onCopyFullPrompt}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-900/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              {isCopiedFull ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                  <span>Full Prompt Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Master Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* UoE Schools Quick Badge Ribbon */}
        <div className="mt-5 pt-4 border-t border-emerald-900/40">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 mb-2 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            Covering 8 Academic Schools of University of Eldoret:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {UOE_SCHOOLS_LIST.map((sch) => (
              <span
                key={sch.id}
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${sch.color}`}
              >
                {sch.code}: {sch.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Control Bar: View Mode Switcher, Presets, and Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0b1712]/90 border border-emerald-950/80">
        
        {/* Preset Selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">UoE Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onSelectPreset('uoe-flagship-hub')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                prompt.id === 'uoe-flagship-hub'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-emerald-950 text-slate-300 hover:text-white'
              }`}
            >
              Flagship Campus Hub
            </button>
            <button
              onClick={() => onSelectPreset('uoe-agri-science')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                prompt.id === 'uoe-agri-science'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-emerald-950 text-slate-300 hover:text-white'
              }`}
            >
              Agriculture & Chepkoilel Farm
            </button>
            <button
              onClick={() => onSelectPreset('uoe-business-sciences')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                prompt.id === 'uoe-business-sciences'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-emerald-950 text-slate-300 hover:text-white'
              }`}
            >
              Business & KASNEB CPA
            </button>
          </div>
        </div>

        {/* View Toggle & Metrics */}
        <div className="flex items-center space-x-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-slate-400 hidden md:block">
            <span className="text-emerald-400 font-semibold">{wordCount}</span> words • ~
            <span className="text-amber-400 font-semibold">{tokenEstimate}</span> tokens
          </div>

          <div className="bg-[#06140e] p-0.5 rounded-lg border border-emerald-900/60 flex items-center">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'card'
                  ? 'bg-emerald-700 text-white font-medium shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Structured View</span>
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'raw'
                  ? 'bg-emerald-700 text-white font-medium shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Raw Markdown</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Mode 1: Raw Markdown Editor / Viewer */}
      {viewMode === 'raw' ? (
        <div className="relative rounded-2xl bg-[#060c09] border border-emerald-950/80 p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-950/80">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-slate-500 ml-2">uoe_student_resource_hub_prompt.md</span>
            </div>
            <button
              onClick={onCopyFullPrompt}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs transition-colors"
            >
              {isCopiedFull ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopiedFull ? 'Copied' : 'Copy All'}</span>
            </button>
          </div>
          <pre className="whitespace-pre-wrap selection:bg-amber-500/30 selection:text-white">
            {formattedText}
          </pre>
        </div>
      ) : (
        /* View Mode 2: Interactive Structured Cards (Context, Role, Task, Requirements, Output) */
        <div className="space-y-5">
          
          {/* SECTION 1: CONTEXT */}
          <section className="rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 p-6 shadow-md transition-all hover:border-emerald-700/60">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-lg font-bold text-white tracking-wide">
                      Context
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Background problem statement, student pain points, and Eldoret campus ecosystem
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopySection('Context', prompt.context)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium border border-emerald-800/40 transition-colors"
              >
                {copiedSection === 'Context' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Section</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-sm text-slate-200 leading-relaxed space-y-3 font-normal">
              {prompt.context.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* SECTION 2: ROLE */}
          <section className="rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 p-6 shadow-md transition-all hover:border-emerald-700/60">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <h2 className="text-lg font-bold text-white tracking-wide">
                      Role
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Persona, technical authority, and educational UI/UX design caliber
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopySection('Role', prompt.role)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium border border-emerald-800/40 transition-colors"
              >
                {copiedSection === 'Role' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Section</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#06140e] border border-amber-500/20 text-amber-200/90 text-sm font-medium leading-relaxed">
              {prompt.role}
            </div>
          </section>

          {/* SECTION 3: TASK */}
          <section className="rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 p-6 shadow-md transition-all hover:border-emerald-700/60">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-lg font-bold text-white tracking-wide">
                      Task
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Explicit deliverable directives and functional scope for the website
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopySection('Task', prompt.task)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium border border-emerald-800/40 transition-colors"
              >
                {copiedSection === 'Task' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Section</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {prompt.task}
            </div>
          </section>

          {/* SECTION 4: REQUIREMENTS */}
          <section className="rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 p-6 shadow-md transition-all hover:border-emerald-700/60">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-lg font-bold text-white tracking-wide">
                      Requirements
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Design tokens, 6 core modules, Kenyan grading formula, tech stack, and state rules
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExpandedRequirements(!expandedRequirements)}
                  className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-slate-300 text-xs transition-colors"
                >
                  {expandedRequirements ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() =>
                    handleCopySection(
                      'Requirements',
                      JSON.stringify(prompt.requirements, null, 2)
                    )
                  }
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium border border-emerald-800/40 transition-colors"
                >
                  {copiedSection === 'Requirements' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Section</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {expandedRequirements && (
              <div className="space-y-6 pt-2">
                
                {/* 4.1 UI/UX Design System */}
                <div className="p-4 rounded-xl bg-[#06140e] border border-emerald-900/40">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    4.1 UI/UX Design System & UoE Brand Aesthetics
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {prompt.requirements.designSystem.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4.2 Core Modules */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    4.2 Core Architectural Modules (6 Key Systems)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {prompt.requirements.coreModules.map((mod, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#071911] border border-emerald-900/40 flex flex-col justify-between"
                      >
                        <div>
                          <div className="font-bold text-sm text-white mb-1">
                            {mod.name}
                          </div>
                          <p className="text-xs text-slate-400 mb-3">
                            {mod.description}
                          </p>
                          <ul className="space-y-1.5 text-xs text-emerald-200/90">
                            {mod.keyFeatures.map((kf, kfIdx) => (
                              <li key={kfIdx} className="flex items-start gap-1.5">
                                <span className="text-amber-400">•</span>
                                <span>{kf}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4.3 Tech Stack, State, Accessibility */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#06140e] border border-emerald-900/40">
                    <h4 className="text-xs font-bold text-amber-300 mb-1.5">
                      4.3 Tech Stack
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {prompt.requirements.techStack.map((t, idx) => (
                        <li key={idx}>• {t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#06140e] border border-emerald-900/40">
                    <h4 className="text-xs font-bold text-cyan-300 mb-1.5">
                      4.4 State & Persistence
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {prompt.requirements.stateManagement.map((s, idx) => (
                        <li key={idx}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#06140e] border border-emerald-900/40">
                    <h4 className="text-xs font-bold text-emerald-300 mb-1.5">
                      4.5 Performance & A11y
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {prompt.requirements.accessibilityAndPerf.map((a, idx) => (
                        <li key={idx}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </section>

          {/* SECTION 5: OUTPUT FORMAT */}
          <section className="rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 p-6 shadow-md transition-all hover:border-emerald-700/60">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <h2 className="text-lg font-bold text-white tracking-wide">
                      Output Format
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Production code standards, zero placeholders, and deliverables
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopySection(
                    'Output Format',
                    prompt.outputFormat.join('\n')
                  )
                }
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium border border-emerald-800/40 transition-colors"
              >
                {copiedSection === 'Output Format' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Section</span>
                  </>
                )}
              </button>
            </div>

            <ul className="space-y-2 text-sm text-slate-300">
              {prompt.outputFormat.map((out, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      )}

      {/* Floating Action Quick Copy at Bottom */}
      <div className="p-4 rounded-xl bg-[#071a13] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3 text-xs sm:text-sm text-emerald-200">
          <FileText className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            Ready to build? Copy this prompt directly into Google AI Studio, Claude, Cursor, or v0.
          </span>
        </div>
        <button
          onClick={onCopyFullPrompt}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-md shadow-amber-950/50"
        >
          {isCopiedFull ? (
            <>
              <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
              <span>Copied Prompt to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Complete UoE Prompt</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
