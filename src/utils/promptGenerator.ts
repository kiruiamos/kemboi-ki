import { PromptStructure, PromptConfig } from '../types/prompt';

export function generateFormattedPrompt(
  prompt: PromptStructure,
  config: PromptConfig
): string {
  const toolDirective = getToolDirective(config.targetAiTool);
  const selectedModulesContent = prompt.requirements.coreModules
    .map((mod, idx) => {
      const features = mod.keyFeatures.map((f) => `    * ${f}`).join('\n');
      return `  ${idx + 1}. **${mod.name}**\n    - *Purpose*: ${mod.description}\n    - *Key Features*:\n${features}`;
    })
    .join('\n\n');

  const designTokens = prompt.requirements.designSystem
    .map((d) => `  * ${d}`)
    .join('\n');

  const techStackItems = prompt.requirements.techStack
    .map((t) => `  * ${t}`)
    .join('\n');

  const stateItems = prompt.requirements.stateManagement
    .map((s) => `  * ${s}`)
    .join('\n');

  const a11yItems = prompt.requirements.accessibilityAndPerf
    .map((a) => `  * ${a}`)
    .join('\n');

  const mockDataItems = prompt.requirements.mockDataSchema
    .map((m) => `  * ${m}`)
    .join('\n');

  const outputFormatItems = prompt.outputFormat
    .map((o) => `  * ${o}`)
    .join('\n');

  const customNotesSection = config.customNotes.trim()
    ? `\n### Additional Institution-Specific Directives:\n${config.customNotes.trim()}\n`
    : '';

  if (config.outputFormatStyle === 'xml_tags') {
    return `<instruction>
${toolDirective}

<context>
${prompt.context}
</context>

<role>
${prompt.role}
</role>

<task>
${prompt.task}
</task>

<requirements>
## 1. UI/UX Design System & Branding
${designTokens}

## 2. Core Feature Modules
${selectedModulesContent}

## 3. Technology Stack & Packages
${techStackItems}

## 4. State Management & Storage
${stateItems}

## 5. Performance & Accessibility
${a11yItems}

## 6. Mock Data & Course Schemas
${mockDataItems}
${customNotesSection}
</requirements>

<output>
${outputFormatItems}
</output>
</instruction>`;
  }

  if (config.outputFormatStyle === 'json_schema') {
    const jsonSpec = {
      institution: 'University of Eldoret (UoE)',
      targetTool: config.targetAiTool,
      format: 'Context, Role, Task, Requirements, Output',
      context: prompt.context,
      role: prompt.role,
      task: prompt.task,
      requirements: {
        designSystem: prompt.requirements.designSystem,
        coreModules: prompt.requirements.coreModules,
        techStack: prompt.requirements.techStack,
        stateManagement: prompt.requirements.stateManagement,
        accessibility: prompt.requirements.accessibilityAndPerf,
        mockData: prompt.requirements.mockDataSchema,
        customNotes: config.customNotes || undefined,
      },
      outputExpectations: prompt.outputFormat,
    };
    return JSON.stringify(jsonSpec, null, 2);
  }

  if (config.outputFormatStyle === 'concise') {
    return `# Concise Single-Turn Prompt: University of Eldoret (UoE) Student Resource Hub

**CONTEXT:** ${prompt.context.slice(0, 360)}...
**ROLE:** ${prompt.role}
**TASK:** ${prompt.task}
**REQUIREMENTS:**
- Brand & UI: Deep Forest Green (#0f3d2e) & Warm Gold (#f59e0b) modern dark mode with Plus Jakarta Sans & Fira Code.
- Modules:
  1. Past Paper & Exam Bank (Filter by UoE School & Course Code e.g. COM 110, AGR 211, BMS 102).
  2. Kenyan University GPA & Degree Forecaster (30% CAT + 70% Final Exam -> First Class, 2nd Upper, 2nd Lower, Pass).
  3. HELB & Uasin Gishu County Bursary Deadline Tracker.
  4. Chepkoilel Pomodoro Study Station with ambient audio & streaks.
  5. Community Notes Sharing with peer upvotes.
  6. Chepkoilel Campus Survival & 24/7 Health Centre / Security emergency directory.
- Tech Stack: React 19, TypeScript, Tailwind CSS, Lucide React, LocalStorage persistence.
**OUTPUT:** Provide complete, runnable code files with realistic UoE course data. Zero placeholders.`;
  }

  // Default: Standard Markdown
  return `# PROMPT: BUILD A UNIVERSITY OF ELDORET (UoE) STUDENT RESOURCE HUB

${toolDirective ? `> **Target Platform:** ${toolDirective}\n\n` : ''}## 1. Context
${prompt.context}

---

## 2. Role
${prompt.role}

---

## 3. Task
${prompt.task}

---

## 4. Requirements

### 4.1 UI/UX Design System & Campus Brand Identity
${designTokens}

### 4.2 Core Architectural Modules
${selectedModulesContent}

### 4.3 Technology Stack & Integration
${techStackItems}

### 4.4 State Management & Data Persistence
${stateItems}

### 4.5 Performance, Accessibility & Offline Resilience
${a11yItems}

### 4.6 Realistic UoE Mock Data & Schema
${mockDataItems}
${customNotesSection}
---

## 5. Output Format
${outputFormatItems}
`;
}

function getToolDirective(tool: PromptConfig['targetAiTool']): string {
  switch (tool) {
    case 'google_ai_studio':
      return 'Optimized for Google AI Studio (Gemini 2.5/3.8 Flash): Produce full-stack ready React + Tailwind components with clean TypeScript types and zero placeholders.';
    case 'claude_artifacts':
      return 'Optimized for Claude Artifacts (Claude 3.7 Sonnet): Generate a self-contained, single-file or cleanly modular React component using Tailwind CSS and Lucide React icons.';
    case 'cursor':
      return 'Optimized for Cursor / Windsurf Composer: Provide modular component files, explicit imports, and typed interface files ready to merge into a git workspace.';
    case 'v0':
      return 'Optimized for v0 by Vercel: Render composable Next.js / React components using Tailwind CSS and modern card/modal patterns.';
    case 'chatgpt':
      return 'Optimized for OpenAI ChatGPT / o3: Follow strict chain-of-thought code generation, ensuring every component is fully implemented.';
    default:
      return '';
  }
}
