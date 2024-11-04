import { GeminiContent } from "@/app/models/gemini.content";

const API_BASE_URL_CONTENT = "/api/gemini/suggestions/content";
const API_BASE_URL_STYLE = "/api/gemini/suggestions/style";
const API_BASE_URL_TEACHERS = "/api/gemini/suggestions/teachers";

async function fetchGeminiContent(apiBaseUrl: string, prompt: string): Promise<string> {
  const geminiContent: GeminiContent = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };
  const response = await fetch(apiBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(geminiContent)
  });
  return (await response.json()).candidates[0].content.parts[0].text;
}

export type SuggestedContent = {
  suggestions: string
}

export async function fetchSuggestedContent(currentTranscript: string): Promise<SuggestedContent> {
  if (!currentTranscript) return {
    suggestions: "Dime cómo puedo hacer una recomendación"
  };
  try {
    const responseAsString = await fetchGeminiContent(
      API_BASE_URL_CONTENT,
      `
      ¿Podrías sugerirme contenido adicional sobre el siguiente fragmento?:
      ${currentTranscript}
      `
    );
    return JSON.parse(responseAsString);
  } catch (error) {
    console.log(error);
    return {
      suggestions: "Dime cómo puedo hacer una recomendación"
    };
  }
}

export type SuggestedStyle = {
  activo: number,
  pragmático: number,
  reflexivo: number,
  teórico: number
}

export async function fetchSuggestedStyle(currentTranscript: string): Promise<SuggestedStyle> {
  if (!currentTranscript) return {
    activo: 0,
    pragmático: 0,
    reflexivo: 0,
    teórico: 0
  };
  try {
    const responseAsString = await fetchGeminiContent(
      API_BASE_URL_STYLE,
      `¿Podrías cuál es mi estilo de aprendizaje? Este es el fragmento que elegí: ${currentTranscript}`
    )
    return JSON.parse(responseAsString);
  } catch (error) {
    console.log(error);
    return {
      activo: 0,
      pragmático: 0,
      reflexivo: 0,
      teórico: 0
    }
  }
}

export type TeacherVideo = {
  title: string,
  description: string,
  publishedAt: string,
  tags: string[],
  viewCount: number
  likeCount: number
  dislikeCount: number
}

export type Teacher = {
  name: string,
  description: string,
  url: string,
  creationDate: string,
  country: string,
  subscriberCount: number
  totalViews: number
  channelId: string,
  videos: TeacherVideo[],
  playlists: string[],
  socialMediaLinks: string[],
  contactInfo: string,
  hasChannelMemberships: boolean
}

export type SuggestedTeachers = {
  teachers: string[]
}

export async function fetchSuggestedTeachers(
  style: SuggestedStyle, 
  subject: string
): Promise<SuggestedTeachers> {
  if (!subject) return {
    teachers: []
  };
  try {
    const responseAsText = await fetchGeminiContent(
      API_BASE_URL_TEACHERS,
      `¿Podrías sugerirme profesores de acuero a mi estilo? {
        estilo: ${JSON.stringify(style)}, 
        materia: "${subject}"
      }`
    );
    return JSON.parse(responseAsText);
  } catch (error) {
    console.log(error);
    return {
      teachers: []
    }
  }
}