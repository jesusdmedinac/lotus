export interface Lambda3Response {
  success: boolean
  data: Lambda3Data
}

export interface Lambda3Data {
  recomendaciones: Recomendaciones
}

export interface Recomendaciones {
  exactas: Recomendacion[]
  parecidas: Recomendacion[]
}

export interface Recomendacion {
  clase: string
  materia: string
  canal: string
  profesor: string
  titulo: string
  estilo: string
  duracion: string
}
