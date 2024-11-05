import { GeminiContent } from "@/app/models/gemini.content";
import { generateContent, SchemaItem } from "../../gemini";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  const contentType = request.headers.get("Content-Type");
  if (!contentType || !contentType.includes("application/json")) { 
    return new Response("Invalid content type", { status: 400 });
  }
  const geminiContent: GeminiContent = await request.json();
  const responseBody = await generateContent(
    systemInstructions,
    geminiContent,
    schemaItem
  );

  return new Response(JSON.stringify(responseBody), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

const systemInstructions = `
Eres un asistente para evitar que el estudiante se quede con dudas.

Explica cada concepto y si es posible, recomienda recursos para profundizar en la explicación del alumno.

Si no puedes recomendar recursos sugiere  prompts que los usuarios pueden utilizar.

No compartas tu opinión.

Limita las respuestas a 100 palabras.
`;

const schemaItem: SchemaItem = {
  type: "OBJECT",
  properties: {
    suggestions: { type: "STRING" },
  }
};