import '@/app/envConfig';

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

export type SchemaItem = {
  type: string
  items?: SchemaItem
  properties?: {
    [key: string]: SchemaItem
  }
}

export async function generateContent(
  systemInstructions: string,
  geminiContent: object,
  schemaItem: SchemaItem
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
    generationConfig: {
      response_mime_type: "application/json",
      response_schema: schemaItem
    }
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