export type GeminiContent = {
  contents: [
    {
      role: string,
      parts: [
        {
          text: string
        }
      ]
    }
  ]
}