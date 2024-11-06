import { DurationResponse } from "@/app/api/youtube/duration/route";

const API_BASE_URL_YOUTUBE_DURATION = '/api/youtube/duration';

export default async function fetchVideoDuration(url: string): Promise<DurationResponse> {
  const response = await fetch(`${API_BASE_URL_YOUTUBE_DURATION}?url=${url}`, {
    method: "GET",
  });
  return await response.json();
}