import { Button } from "@mui/material";
import Image from "next/image";

export default function FeedbackComponent({ className }: { className?: string }) {
  const onVotaClick = () => {
    window.open("https://calendly.com/jesusdmedinac/lotus-internal-testing", "_blank");
  }
  return (<Button className={className} variant="contained" color="info" onClick={onVotaClick}>
    <div className="flex flex-row items-center gap-2 text-black font-bold">
      <Image
        src="/lotus-black.svg"
        alt="Logo Lotus"
        width={24}
        height={24}
        />
      Compartir feedback
    </div>
  </Button>);
}