'use client';

import { Button, TextField } from "@mui/material";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const youtubeStart = 'https://www.youtube.com/watch?v=';
const youtubeShorts = 'https://www.youtube.com/shorts/';

export default function FormVideo() {
  const [urlValue, setUrlValue] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setUrlValue(newValue);
    console.log(newValue);
    setIsValidUrl(
      newValue !== "" && 
      newValue.startsWith(youtubeStart) && newValue.length > youtubeStart.length || 
      newValue.startsWith(youtubeShorts) && newValue.length > youtubeShorts.length
    );
  };

  const onSendClick = () => {
    if (isValidUrl) {
      redirect(`/home?url=${urlValue}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <TextField id="url-input" label="Comparte tu clase de Youtube favorita" variant="outlined" onChange={onUrlChange} error={!isValidUrl && urlValue !== ""} helperText={!isValidUrl && urlValue !== "" ? 'El URL no es válido' : ''}/>
      <Button onClick={onSendClick} disabled={!isValidUrl}>Enviar</Button>
    </div>
  );
}