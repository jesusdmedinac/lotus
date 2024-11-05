'use client';

import App from "@/app/context/App";
import { useSearchParams } from "next/navigation";
import Suggestions from "@/app/components/Suggestions";
import { Suspense } from "react";
import LoadingComponent from "@/app/components/LoadingComponent";

function Search() {
  const searchParams = useSearchParams();
  const videoURL = searchParams.get("url");
  if (!videoURL) return <LoadingComponent />;
  return <Suggestions url={videoURL} />;
}

export default function Home() {
  return (
    <App>
      <div className="flex flex-col w-full justify-center">
        <Suspense fallback={<LoadingComponent />}>
          <Search />
        </Suspense>
      </div>
    </App>
  );
}