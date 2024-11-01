import video from "@/app/video-oscar.json";

export function fetchVideoTranscript(counter: number) {
  return video.find((section) => {
    return section.start === counter;
  })
  ?.text;
}