import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Gemini API endpoint for smart prompt optimization
app.post('/api/ai/enhance', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: 'GEMINI_API_KEY is not configured in environment. Using client-side template generator.',
        usingFallback: true
      });
    }

    const { focus, targetTool, academicLevel, customNotes, basePrompt } = req.body;

    const ai = new GoogleGenAI({ apiKey });
    const promptInstructions = `You are a world-class Prompt Engineer and Senior Full-Stack EdTech Architect.
The user wants a meticulously structured, production-ready prompt to generate a "Student Resource Hub" website.
The prompt MUST strictly follow the 5-part format:
1. CONTEXT
2. ROLE
3. TASK
4. REQUIREMENTS (Include UI/UX Design System, Feature Modules, State Management & Interactivity, Tech Stack, Mock Data Schema, Accessibility)
5. OUTPUT FORMAT

User Specifications:
- Academic Target / Audience: ${academicLevel || 'Undergraduate & Graduate University Students'}
- Core Strategic Focus: ${focus || 'Comprehensive Academic Support & Community'}
- Target AI Builder Platform: ${targetTool || 'General / Claude / AI Studio / Cursor'}
- Additional Custom Requirements: ${customNotes || 'None'}

Review and upgrade the following base prompt, enhancing its specificity, technical rigor, actionable requirements, and modern web UI nuances:
---
${basePrompt}
---

Return ONLY the enhanced prompt in Markdown formatting with clear H2 headers for ## Context, ## Role, ## Task, ## Requirements, and ## Output Format. Keep it exceptionally thorough and directly actionable for an AI code generator.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptInstructions,
    });

    return res.json({ enhancedPrompt: response.text });
  } catch (error: any) {
    console.error('Error enhancing prompt with Gemini:', error);
    return res.status(500).json({
      error: error.message || 'Failed to enhance prompt with Gemini AI',
      usingFallback: true
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Student Resource Hub Prompt Studio listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
