export interface Lambda1Response {
  success: boolean
  data: Video
}

export interface Video {
  materia: string
  clase: string
  parrafos: Parrafo[]
  estilo: string
  youtube: Youtube
}

export interface Parrafo {
  parrafo: string
  inicio: string
  fin: string
  tiempo: number
  estilo: string[]
}

export interface Youtube {
  id: string
  title: string
  duration: number
  webpage_url: string
  video_filename: string
  description: string
  subtitles: object
  thumbnail: string
  upload_date: string
  view_count: number
  uploader: string
  like_count: number
  dislike_count: number | null
  average_rating: number | null
  categories: string[]
  tags: string[]
  channel_id: string
  channel_url: string
  age_limit: number
  is_live: boolean
  start_time: string | null
  end_time: string | null
  chapters: string | null
}
