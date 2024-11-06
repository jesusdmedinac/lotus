import { Button } from "@mui/material";
import Image from "next/image";

export default function VotaComponent({ className }: { className?: string }) {
  const onVotaClick = () => {
    window.open("https://platzi.com/vota", "_blank");
  }
  return (<Button className={className} variant="contained" color="primary" onClick={onVotaClick}>
    <div className="flex flex-row items-center gap-2 text-white font-bold">
      <Image
        src="/lotus.svg"
        alt="Logo Lotus"
        width={24}
        height={24}
        />
      Vota por Lotus
    </div>
  </Button>);
}