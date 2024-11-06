function iso8601ToSeconds(isoString: string) {
  const regex = /P(?:([\d.]+)D)?(?:T(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?)?/;
  const match = isoString.match(regex);
  
  if (!match) return null;

  const days = parseFloat(match[1]) || 0;
  const hours = parseFloat(match[2]) || 0;
  const minutes = parseFloat(match[3]) || 0;
  const seconds = parseFloat(match[4]) || 0;

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

async function getVideoDuration(videoId: string) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`;
  const response = await fetch(url, {
    method: "GET"
  });
  const responseAsJSON = await response.json();
  const contentDetails = responseAsJSON.items[0].contentDetails;
  const duration = contentDetails.duration;
  const seconds = iso8601ToSeconds(duration);
  const durationObject = {
    duration,
    seconds
  }  
  return durationObject;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const url = requestUrl.searchParams.get('url');
  if (!url) return Response.json({ message: "El url del video no es válido "});
  const { searchParams } = new URL(url);
  const youtubeId = searchParams.get('v');
  if (!youtubeId) return Response.json({ message: "El id del video no es válido " });
  const duration = await getVideoDuration(youtubeId);
  return Response.json({
    url,
    duration
  })
}