'use client';

import App from "@/app/context/App";
import { useSearchParams } from "next/navigation";
import Suggestions from "../components/Suggestions";
import { Suspense } from "react";

function Search() {
  const searchParams = useSearchParams();
  const videoURL = searchParams.get("url");
  if (!videoURL) return <div>Loading...</div>;
  return <Suggestions url={videoURL} />;
}

export default function Home() {
  return (
    <App>
      <div className="flex flex-col w-full justify-center">
        <Suspense fallback={<div>Loading suggestions...</div>}>
          <Search />
        </Suspense>
      </div>
    </App>
  );
}