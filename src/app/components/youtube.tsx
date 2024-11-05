import YouTube from "react-youtube";

export default function YouTubeComponent({ 
  id,
  handlePlay,
  handlePause,
 }: {
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePlay: (event: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePause: (event: any) => void,
 }) {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <YouTube 
    videoId={id}
    opts={opts}
    className="w-full h-full border-none z-0"
    onPlay={handlePlay}
    onPause={handlePause}
    />
  );
}