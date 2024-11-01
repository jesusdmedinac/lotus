import { GeminiContent } from "@/app/models/gemini.content";

const API_BASE_URL = "/api/gemini";

export async function fetchGeneratedContent(currentTranscript: string) {
  if (!currentTranscript) return;
  const geminiContent: GeminiContent = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
            ¿Podrías sugerirme contenido adicional sobre el siguiente fragmento?:
            ${currentTranscript}
            `
          }
        ]
      }
    ]
  };
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(geminiContent)
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}