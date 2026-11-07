import React, { useState } from 'react';
import { Sparkles, Check, Copy, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { PromptStructure } from '../types/prompt';

interface AiEnhancerModalProps {
  basePromptText: string;
  onApplyEnhancedPrompt: (newPrompt: string) => void;
  currentPrompt: PromptStructure;
}

export const AiEnhancerModal: React.FC<AiEnhancerModalProps> = ({
  basePromptText,
  onApplyEnhancedPrompt,
  currentPrompt,
}) => {
  const [focusArea, setFocusArea] = useState('agriculture_biotech');
  const [customGoal, setCustomGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const FOCUS_PRESETS = [
    {
      id: 'agriculture_biotech',
      name: 'Chepkoilel Farm Practicals & Agronomy',
      desc: 'Adds specialized requirements for crop trial data, soil testing protocols, and agricultural lab reports.'
    },
    {
      id: 'low_bandwidth',
      name: 'Low-Bandwidth & Offline PWA for Chepkoilel',
      desc: 'Adds caching requirements for local storage, service workers, and instant loading on Safaricom 3G/4G bundles.'
    },
    {
      id: 'helb_funding',
      name: 'HELB & HEF Bands 1-5 Financial Focus',
      desc: 'Enriches requirements with bursary document auto-fill, loan disbursement estimators, and CDF guides.'
    },
    {
      id: 'kasneb_bcom',
      name: 'KASNEB CPA & Business School Modules',
      desc: 'Expands modules to include professional CPA revision kits, tax tables, and Eldoret town corporate attachments.'
    }
  ];

  const handleEnhanceWithAI = async () => {
    setIsLoading(true);
    setStatusMessage('Analyzing University of Eldoret requirements with Gemini AI...');

    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          focus: FOCUS_PRESETS.find((f) => f.id === focusArea)?.name || 'Comprehensive Academic Support',
          targetTool: 'Google AI Studio & Claude',
          academicLevel: 'University of Eldoret (Undergraduate & Post-Graduate)',
          customNotes: customGoal,
          basePrompt: basePromptText,
        }),
      });

      const data = await response.json();

      if (data.enhancedPrompt) {
        setEnhancedResult(data.enhancedPrompt);
        setStatusMessage('Prompt enhanced with Gemini 2.5 Flash!');
      } else {
        // Fallback enhancement tailored specifically for UoE
        const fallbackEnhanced = generateDeterministicEnhancement(basePromptText, focusArea, customGoal);
        setEnhancedResult(fallbackEnhanced);
        setStatusMessage('Applied specialized University of Eldoret enhancements!');
      }
    } catch (err) {
      console.warn('API error, using client-side enhancement engine:', err);
      const fallbackEnhanced = generateDeterministicEnhancement(basePromptText, focusArea, customGoal);
      setEnhancedResult(fallbackEnhanced);
      setStatusMessage('Applied specialized University of Eldoret enhancements!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!enhancedResult) return;
    navigator.clipboard.writeText(enhancedResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-[#0a1e27] to-[#091b14] border border-indigo-800/60 shadow-lg">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Gemini AI Prompt Optimizer</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          Optimize Prompt for University of Eldoret
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Use AI to inject advanced campus specifications, tailored Chepkoilel workflows, and specialized Kenyan academic guidelines into your 5-part prompt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Column */}
        <div className="p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Select University Focus Preset</span>
          </h3>

          <div className="space-y-2">
            {FOCUS_PRESETS.map((p) => (
              <label
                key={p.id}
                onClick={() => setFocusArea(p.id)}
                className={`block p-3 rounded-xl border cursor-pointer transition-all ${
                  focusArea === p.id
                    ? 'bg-emerald-950/80 border-amber-400 text-white shadow-sm'
                    : 'bg-[#06140e] border-emerald-900/40 text-slate-300 hover:border-emerald-700/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs sm:text-sm">{p.name}</span>
                  <input
                    type="radio"
                    name="focusArea"
                    checked={focusArea === p.id}
                    onChange={() => {}}
                    className="text-amber-500 focus:ring-0"
                  />
                </div>
                <p className="text-[11px] text-slate-400">{p.desc}</p>
              </label>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Custom Prompt Requirements:
            </label>
            <textarea
              rows={3}
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="e.g. Include Chepkoilel stage boda-boda safety directory and student election polling guides."
              className="w-full rounded-xl bg-[#06140e] border border-emerald-900 p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            onClick={handleEnhanceWithAI}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Optimizing with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Optimized UoE Prompt</span>
              </>
            )}
          </button>

          {statusMessage && (
            <p className="text-[11px] text-center text-emerald-400 font-medium">
              {statusMessage}
            </p>
          )}
        </div>

        {/* Output Column */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#091b14]/90 border border-emerald-900/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-900/40">
              <h3 className="font-bold text-sm text-white">
                Enhanced Prompt Output
              </h3>

              {enhancedResult && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-800/40"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => onApplyEnhancedPrompt(enhancedResult)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Apply to Active Prompt</span>
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#060e0a] rounded-xl p-4 font-mono text-xs text-slate-300 max-h-[500px] overflow-y-auto leading-relaxed border border-emerald-950">
              {enhancedResult ? (
                <pre className="whitespace-pre-wrap">{enhancedResult}</pre>
              ) : (
                <div className="text-center py-16 text-slate-500">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-400" />
                  <p>Click "Generate Optimized UoE Prompt" to see the upgraded prompt.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

function generateDeterministicEnhancement(base: string, focus: string, custom: string): string {
  let injection = '';
  if (focus === 'agriculture_biotech') {
    injection = `\n### Specialized School of Agriculture & Biotechnology Modules:
- Chepkoilel Commercial Farm Practicals Archive: Store field trial protocols for maize, wheat, and dairy cattle management.
- Soil Science & Crop Pathology Diagnostics: Interactive visual guides for identifying common Rift Valley plant diseases.
- Direct integration with KALRO and KEPHIS undergraduate attachment directories.\n`;
  } else if (focus === 'low_bandwidth') {
    injection = `\n### Kenyan Low-Bandwidth & Progressive Web App (PWA) Optimizations:
- Service Worker Caching: Enable offline browsing of downloaded past exam papers and syllabus outlines.
- Low-Data Image Placeholders: Compress PDF previews and avoid heavy uncompressed assets to save student mobile bundles.
- Instant LocalStorage sync for GPA calculations and study timers.\n`;
  } else if (focus === 'helb_funding') {
    injection = `\n### Enhanced HELB & County Bursaries Radar:
- Higher Education Funding (HEF) Band 1 to Band 5 eligibility questionnaire.
- Uasin Gishu County Governor Bursary and Ward CDF checklist generator.
- Fee clearance countdown linked to UoE ERP exam card deadlines.\n`;
  } else if (focus === 'kasneb_bcom') {
    injection = `\n### School of Business & KASNEB Modules:
- KASNEB CPA Foundation, Intermediate, and Advanced revision bank.
- Interactive Time-Value-of-Money and Business Mathematics calculators.
- Town Campus lecture timetable integration.\n`;
  }

  if (custom.trim()) {
    injection += `\n### Custom Campus Directive:\n- ${custom.trim()}\n`;
  }

  // Insert before ## 5. Output Format
  if (base.includes('## 5. Output Format')) {
    return base.replace('## 5. Output Format', `${injection}\n## 5. Output Format`);
  }
  return base + '\n' + injection;
}
