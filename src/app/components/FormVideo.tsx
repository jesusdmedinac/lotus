'use client';

import { Button, TextField } from "@mui/material";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function FormVideo() {
  const [urlValue, setUrlValue] = useState("");

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
  };

  const onSendClick = () => {
    redirect(`/home?url=${urlValue}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <TextField id="url-input" label="Comparte tu clase de Youtube favorita" variant="outlined" onChange={onUrlChange}/>
      <Button onClick={onSendClick} disabled={urlValue === ""}>Enviar</Button>
    </div>
  );
}