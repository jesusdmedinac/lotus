'use client';

import { Button, TextField } from "@mui/material";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FormVideo() {
  const [validURL, setValidURL] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  useEffect(() => {
    const validateURL = (url: string) => {
      if (!url) {
        setValidURL(false);
        return;
      }
      const validURL = url.startsWith("https://www.youtube.com/watch?v=");
      setValidURL(validURL);
    };
    validateURL(urlValue);
  }, [urlValue]);

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
  };

  const onSendClick = () => {
    redirect(`/home?url=${urlValue}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <TextField id="url-input" label="Comparte tu clase de Youtube favorita" variant="outlined" onChange={onUrlChange}/>
      <Button onClick={onSendClick} disabled={!validURL || urlValue === ""}>Enviar</Button>
    </div>
  );
}