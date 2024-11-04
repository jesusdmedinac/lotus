import { Video } from "./lambda1"

export interface User {
  id: string
  email: string
  name: string
  videos: Video[]
}