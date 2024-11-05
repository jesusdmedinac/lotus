export interface Lambda1Response {
  success: boolean
  data: Video
}

export interface Video {
  inicio: string
  descargado: boolean
  estatus: string
  fin: string
  materia: string
  clase: string
  parrafos: Parrafo[]
  estilo: string
  youtube: Youtube
  metricas: Metricas
}

export interface Parrafo {
  parrafo: string
  inicio: number
  fin: number
  tiempo: number
  estilo: string[]
}

export interface Youtube {
  title: string
  id: string
  duration: number
  webpage_url: string
  video_filename: string
  description: string
  subtitles: Subtitles
  thumbnail: string
  upload_date: string
  view_count: number
  uploader: string
  like_count: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dislike_count: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  average_rating: any
  categories: string[]
  tags: string[]
  channel_id: string
  channel_url: string
  age_limit: number
  is_live: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  start_time: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  end_time: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chapters: any
}

export interface Subtitles {
  live_chat: LiveChat[]
}

export interface LiveChat {
  url: string
  video_id: string
  ext: string
  protocol: string
}

export interface Metricas {
  moda: string[]
  conteo: Conteo
  porcentajes: Porcentajes
}

export interface Conteo {
  teorico: number
  pragmatico: number
  activo: number
  reflexivo: number
}

export interface Porcentajes {
  teorico: number
  pragmatico: number
  activo: number
  reflexivo: number
}
