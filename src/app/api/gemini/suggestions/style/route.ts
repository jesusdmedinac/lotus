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

Indica cuál es el estilo de aprendizaje del alumno desde un extracto de una trasncripción de un vídeo.

El formato para el estilo es el siguiente: "estilos_count": {
  "Reflexivo": 9,
  "Teórico": 17,
  "Pragmático": 9,
  "Activo": 2
}
`;

const schemaItem: SchemaItem = {
  type: "OBJECT",
  properties: {
    reflexivo: { type: "INTEGER" },
    teórico: { type: "INTEGER" },
    pragmático: { type: "INTEGER" },
    activo: { type: "INTEGER" },
  }
};