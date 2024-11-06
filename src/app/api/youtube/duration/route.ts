function iso8601ToSeconds(isoString: string): number {
  const regex = /P(?:([\d.]+)D)?(?:T(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?)?/;
  const match = isoString.match(regex);
  
  if (!match) return 0;

  const days = parseFloat(match[1]) || 0;
  const hours = parseFloat(match[2]) || 0;
  const minutes = parseFloat(match[3]) || 0;
  const seconds = parseFloat(match[4]) || 0;

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

export interface Duration {
  duration: string
  seconds: number
}

export interface DurationResponse {
  url: string
  duration: Duration
}

async function getVideoDuration(videoId: string): Promise<Duration> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`;
  const response = await fetch(url, {
    method: "GET"
  });
  const responseAsJSON = await response.json();
  const contentDetails = responseAsJSON.items[0].contentDetails;
  const duration = contentDetails.duration;
  const seconds = iso8601ToSeconds(duration);
  const durationObject: Duration = {
    duration,
    seconds
  }
  return durationObject;
}

const youtubeStart = 'https://www.youtube.com/watch?v=';
const youtubeShorts = 'https://www.youtube.com/shorts/';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const url = requestUrl.searchParams.get('url');
  if (!url) return Response.json({
    url,
    duration: {
      duration: "0",
      seconds: 0
    }
  });
  const urlObject = new URL(url);
  const youtubeId = url.startsWith(youtubeStart)
  ? urlObject.searchParams.get("v")
  : url.startsWith(youtubeShorts)
  ? urlObject.pathname.split('/')[2]
  : null;

  if (!youtubeId) return Response.json({
    url,
    duration: {
      duration: "0",
      seconds: 0
    }
  });
  const duration = await getVideoDuration(youtubeId);
  const durationResponse: DurationResponse = {
    url,
    duration
  }
  return Response.json(durationResponse)
}