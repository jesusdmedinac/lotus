'use client'

import LottieComponent from "@/app/components/LottieComponent";

export default function LoadingComponent() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <LottieComponent
        defaultOptions={defaultOptions}
        animation="gen-ai"
        className="w-full h-full" />
    </div>
  );
}