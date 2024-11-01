import { GeminiContent } from "@/app/models/gemini.content";
import { generateContent, systemInstructions } from "./gemini";

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
  const responseBody = await generateContent(systemInstructions, geminiContent);

  return new Response(JSON.stringify(responseBody), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}