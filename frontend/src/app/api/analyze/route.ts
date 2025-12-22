import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY! });


export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: 'Prompt missing' }, { status: 400 });
    }
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
 const rawText = response.text;

  let parsed;
  try {
    parsed = JSON.parse(rawText || '');
  } catch (e) {
    return Response.json(
      { error: "AI returned invalid JSON" },
      { status: 500 }
    );
  }
  
  return Response.json(parsed, { status: 200 });

  } catch (err) {
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}

