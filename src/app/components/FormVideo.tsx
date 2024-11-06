'use client';

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import fetchVideoDuration from "../services/youtubeService";
import { youtubeMobile, youtubeShorts, youtubeStart } from "../constants";

export default function FormVideo() {
  const [urlValue, setUrlValue] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isVideoDurationLong, setIsVideoDurationLong] = useState(false);
  const [isVideoDurationShort, setIsVideoDurationShort] = useState(false);

  const validateVideoDuration = async () => {
    const videoDuration = await fetchVideoDuration(urlValue);
    const duration = videoDuration.duration;
    setIsVideoDurationLong(duration.seconds > 120);
    setIsVideoDurationShort(duration.seconds < 1);
    return duration;
  }

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setUrlValue(newValue);
    console.log(newValue);
    setIsValidUrl(
      newValue !== "" && 
      newValue.startsWith(youtubeStart) && newValue.length > youtubeStart.length || 
      newValue.startsWith(youtubeMobile) && newValue.length > youtubeMobile.length || 
      newValue.startsWith(youtubeShorts) && newValue.length > youtubeShorts.length
    );
  };

  const onSendClick = async () => {
    const duration = await validateVideoDuration();
    console.log(!isValidUrl || duration.seconds > 120 || duration.seconds < 1);
    if (!isValidUrl || duration.seconds > 120 || duration.seconds < 1) return;
    window.open(`/home?url=${urlValue}`, "_self");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <TextField id="url-input" label="Comparte tu clase de Youtube favorita" variant="outlined" onChange={onUrlChange} error={!isValidUrl || isVideoDurationLong || isVideoDurationShort} helperText={
        !isValidUrl 
        ? 
          `El URL no es válido, intenta con un url que empiece por:
          "${youtubeStart}",
          "${youtubeMobile}" o
          "${youtubeShorts}"
        `
        : isVideoDurationLong
        ? 'El video dura más de 2 minutos, intenta con un video más corto 🙏'
        : isVideoDurationShort
        ? 'El video dura menos de 1 segundo, intenta con un video más largo 🙏'
        : ''
      }/>
      <Button onClick={onSendClick} disabled={!isValidUrl}>Enviar</Button>
    </div>
  );
}