import './envConfig.ts'

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

export async function generateContent(
  systemInstructions: string,
  geminiContent: object,
) {  
  const requestBody = {
    system_instruction: {
      role: 'system',
      parts: [
        {
          text: systemInstructions,
        }
      ]
    },
    ...geminiContent,
    // generationConfig
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return await response.json();
}

export const systemInstructions = `
Eres un asistente para evitar que el estudiante se quede con dudas.

Explica cada concepto y si es posible, recomienda recursos para profundizar en la explicación del alumno.

Si no puedes recomendar recursos sugiere  prompts que los usuarios pueden utilizar.

No compartas tu opinión.

Limita las respuestas a 100 palabras.
`;

export const generationConfig = {
  response_mime_type: "application/json",
  response_schema: {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        channelName: {type:"STRING"},
        authorName: {type:"STRING"},
        description: {type:"STRING"},
        suscriptors: {type:"STRING"},
        avatar: {type: "STRING"},
        webSite: {type:"STRING"}
      }
    }
  }
}