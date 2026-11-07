import React from 'react';
import { 
  Sliders, 
  Cpu, 
  FileCode, 
  Building2, 
  Layers, 
  Sparkles, 
  RotateCcw,
  Check,
  Copy
} from 'lucide-react';
import { PromptConfig, PromptStructure } from '../types/prompt';
import { TARGET_AI_TOOLS, FORMAT_OPTIONS, UOE_SCHOOLS_LIST } from '../data/defaultPrompts';

interface PromptCustomizerProps {
  config: PromptConfig;
  setConfig: React.Dispatch<React.SetStateAction<PromptConfig>>;
  prompt: PromptStructure;
  onResetDefaults: () => void;
  onCopyCustomPrompt: () => void;
  isCopied: boolean;
}

export const PromptCustomizer: React.FC<PromptCustomizerProps> = ({
  config,
  setConfig,
  onResetDefaults,
  onCopyCustomPrompt,
  isCopied,
}) => {
  const toggleSchool = (schoolName: string) => {
    const currentNotes = config.customNotes;
    if (currentNotes.includes(schoolName)) {
      setConfig({
        ...config,
        customNotes: currentNotes.replace(new RegExp(`- Focus on ${schoolName}\\n?`, 'g'), '').trim()
      });
    } else {
      setConfig({
        ...config,
        customNotes: (currentNotes ? currentNotes + '\n' : '') + `- Focus on ${schoolName} with custom course units and department requirements.`
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Architect Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#091f17] to-[#0d2a20] border border-emerald-800/60 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              <span>Interactive Prompt Architect</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Fine-Tune Your University of Eldoret Hub Prompt
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-2xl">
              Adapt the Context, Role, Task, Requirements, and Output format for your specific AI builder tool (AI Studio, Claude, Cursor), target UoE schools, and grading rules.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={onResetDefaults}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 text-xs font-semibold border border-emerald-800/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={onCopyCustomPrompt}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-950/40 transition-all active:scale-95"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Architected Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Target AI Tool Selector */}
        <div className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Cpu className="w-4 h-4 text-amber-400" />
            <h3>1. Target AI Code Generator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Tailors the prompt instructions and system directives to match the model’s best output capabilities.
          </p>

          <div className="space-y-2">
            {TARGET_AI_TOOLS.map((tool) => (
              <label
                key={tool.id}
                onClick={() => setConfig({ ...config, targetAiTool: tool.id as any })}
                className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  config.targetAiTool === tool.id
                    ? 'bg-emerald-950/80 border-amber-400 text-white shadow-sm'
                    : 'bg-[#06140e] border-emerald-900/40 text-slate-300 hover:border-emerald-700/60'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xs sm:text-sm">{tool.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{tool.note}</p>
                </div>
                <input
                  type="radio"
                  name="targetAiTool"
                  checked={config.targetAiTool === tool.id}
                  onChange={() => {}}
                  className="mt-1 text-amber-500 focus:ring-0"
                />
              </label>
            ))}
          </div>
        </div>

        {/* 2. Output Format Style */}
        <div className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <FileCode className="w-4 h-4 text-emerald-400" />
            <h3>2. Prompt Format Structure</h3>
          </div>
          <p className="text-xs text-slate-400">
            Select the representation style for Context, Role, Task, Requirements, and Output.
          </p>

          <div className="space-y-2">
            {FORMAT_OPTIONS.map((fmt) => (
              <label
                key={fmt.id}
                onClick={() => setConfig({ ...config, outputFormatStyle: fmt.id as any })}
                className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  config.outputFormatStyle === fmt.id
                    ? 'bg-emerald-950/80 border-amber-400 text-white shadow-sm'
                    : 'bg-[#06140e] border-emerald-900/40 text-slate-300 hover:border-emerald-700/60'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xs sm:text-sm">{fmt.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {fmt.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{fmt.description}</p>
                </div>
                <input
                  type="radio"
                  name="outputFormatStyle"
                  checked={config.outputFormatStyle === fmt.id}
                  onChange={() => {}}
                  className="mt-1 text-amber-500 focus:ring-0"
                />
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* 3. UoE School Priority Selector */}
      <div className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Building2 className="w-4 h-4 text-amber-400" />
            <h3>3. Prioritize Specific UoE Academic Schools</h3>
          </div>
          <span className="text-xs text-emerald-300">
            Click to toggle school focus directives
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Select which University of Eldoret schools to explicitly emphasize in the generated requirements:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {UOE_SCHOOLS_LIST.map((sch) => {
            const isSelected = config.customNotes.includes(sch.name);
            return (
              <button
                key={sch.id}
                onClick={() => toggleSchool(sch.name)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm'
                    : 'bg-[#06140e] border-emerald-900/40 text-slate-300 hover:border-emerald-700/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-300">{sch.code}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-xs font-semibold leading-tight line-clamp-2">
                  {sch.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Custom Campus Directives & Notes */}
      <div className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 space-y-3">
        <div className="flex items-center space-x-2 text-white font-bold text-sm">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3>4. Custom Directives for University of Eldoret</h3>
        </div>
        <p className="text-xs text-slate-400">
          Add specific courses, campus locations, local transport tips, or student union guidelines:
        </p>
        <textarea
          rows={3}
          value={config.customNotes}
          onChange={(e) => setConfig({ ...config, customNotes: e.target.value })}
          placeholder="e.g. Include Chepkoilel town shuttle matatu fare guidelines, UoEGSU election portal notices, and Chemolingot / Town Campus bus schedules."
          className="w-full rounded-xl bg-[#06140e] border border-emerald-900/60 p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
        />
      </div>

    </div>
  );
};
