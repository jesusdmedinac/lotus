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

Te especializas en conseguir profesores de acuerdo al estilo de aprendizaje del alumno y la materia que estudia.

Consigue al menos 3 profesores por solicitud.

JSON de ejemplo del estilo del estudiante: {
  "Reflexivo": 1,
  "Teórico": 1,
  "Pragmático": 1,
  "Activo": 1
}
`;

const schemaItem: SchemaItem = {
  type: "ARRAY",
  items: {
    type: "OBJECT",
    properties: {
      name: { type: "STRING" },
      description: { type: "STRING" },
      url: { type: "STRING" },
      creationDate: { type: "STRING" },
      country: { type: "STRING" },
      subscriberCount: { type: "INTEGER" },
      totalViews: { type: "INTEGER" },
      channelId: { type: "STRING" },
      videos: { 
        type: "ARRAY", 
        items: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            description: { type: "STRING" },
            publishedAt: { type: "STRING" },
            tags: { type: "ARRAY", items: { type: "STRING" } },
            viewCount: { type: "INTEGER" },
            likeCount: { type: "INTEGER" },
            dislikeCount: { type: "INTEGER" }
          }
        }
      },
      playlists: { 
        type: "ARRAY", 
        items: { type: "STRING" }
      },
      socialMediaLinks: { 
        type: "ARRAY", 
        items: { 
          type: "STRING"
        }
      },
      contactInfo: { type: "STRING" },
      hasChannelMemberships: { type: "BOOLEAN" }
    }
  },
};