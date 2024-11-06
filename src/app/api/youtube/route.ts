function iso8601ToSeconds(isoString: string) {
  const date = new Date(isoString);
  const milliseconds = date.getTime();
  const seconds = Math.floor(milliseconds / 1000);
  return seconds;
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
  console.log(durationObject);
  
  return durationObject;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const url = requestUrl.searchParams.get('url');
  if (!url) return Response.json({ message: "El url del video no es válido "});
  const { searchParams } = new URL(url);
  const youtubeId = searchParams.get('v');
  if (!youtubeId) return Response.json({ message: "El id del video no es válido " });
  const duration = getVideoDuration(youtubeId);
  console.log(duration);
  return Response.json({
    url,
    duration
  })
}