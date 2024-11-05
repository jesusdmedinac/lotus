'use client';

import App from "@/app/context/App";
import { useSearchParams } from "next/navigation";
import Suggestions from "../components/Suggestions";

export default function Home() {
  const searchParams = useSearchParams();
  const videoURL = searchParams.get("url");
  if (!videoURL) {
    return <div>Loading...</div>;
  }
  return (
    <App>
      <div className="flex flex-col w-full justify-center">
        <Suggestions url={videoURL} />
      </div>
    </App>
  );
}