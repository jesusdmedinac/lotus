'use client';

import { Button } from "@mui/material";
import Image from "next/image";
import { logEvent } from "firebase/analytics";
import { useFirebaseAnalytics } from "@/app/context/Context";

export default function VotaComponent({ className }: { className?: string }) {
  const analytics = useFirebaseAnalytics();
  const onVotaClick = () => {
    window.open("https://api.whatsapp.com/send?phone=14153419905&text=Quiero%20votar%20por%20Lotus", "_blank");
    if (!analytics) return;
    logEvent(analytics, "user_voted");
  }
  return (
    <Button className={className} variant="contained" color="primary" onClick={onVotaClick}>
      <div className="flex flex-row items-center gap-2 text-white font-bold text-2xl">
        <Image
          src="/lotus.svg"
          alt="Logo Lotus"
          width={48}
          height={48}
          />
        <p className="overflow-hidden whitespace-nowrap">Vota por Lotus</p>
      </div>
    </Button>
  );
}