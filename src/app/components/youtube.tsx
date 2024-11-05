import YouTube from "react-youtube";

export default function YouTubeComponent({ 
  id,
  handlePlay,
  handlePause,
  className
 }: {
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePlay: (event: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePause: (event: any) => void,
  className: string | null
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
      className={className}
      onPlay={handlePlay}
      onPause={handlePause}
      />
  );
}