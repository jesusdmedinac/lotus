"use client";

import { Video } from "@/app/models/lambda1";
import { Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchLambda2 } from "../services/lambdaService";
import { Lambda2Data } from "../models/lambda2";
import LoadingComponent from "./LoadingComponent";

const tiposDeContenido = ["práctica", "ejemplo", "resumen", "examen"];

export default function SuggestedContent({ video }: { video: Video}) {
  const [loading, setLoading] = useState(false);
  const [lambda2Data, setLambda2Data] = useState<Lambda2Data>({
    tipo: "",
    contenido: ""
  });

  const loadSuggestions = async (tipoDeContenido: string) => {
    setLoading(true);
    if (!video) return;

    const lambda2Response = await fetchLambda2(
      video.estilo,
      video.materia,
      video.clase,
      tipoDeContenido
    );
    const data = lambda2Response.data;
    setLambda2Data(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    async function loadSuggestions() {
      if (!video) return;
      
      const lambda2Response = await fetchLambda2(
        video.estilo,
        video.materia,
        video.clase,
        tiposDeContenido[0]
      );
      const data = lambda2Response.data;
      setLambda2Data(data);
      setLoading(false);
    }
    loadSuggestions();
  }, [video]);

  const estilo = video.estilo.split(',')[0] as string;
  const estilos: {
    [key: string]: string
  } = {
    "teorico": "bg-pink-500",
    "activo": "bg-green-500",
    "pragmatico": "bg-sky-500",
    "reflexivo": "bg-violet-500"
  }

  return (
    <div className="flex flex-col w-full p-16 bg-slate-900">
      <div className="flex flex-col items-center w-full">
        <Divider className="w-20" textAlign="center"  />
      </div>
      <div className="flex flex-row w-full font-semibold items-center">
        <p className="px-4 py-2 text-2xl">Contenido de acuerdo a tu estilo</p>
        <p className={`text-lg rounded-lg uppercase p-2 ${estilos[estilo]}`}>{estilo}</p>
      </div>
      <div className="px-4 py-2 flex flex-row w-full">
        {
          tiposDeContenido.map((tipoDeContenido, index) => (
            <Button onClick={() => loadSuggestions(tipoDeContenido)} key={index} className="px-4 py-2 text-md border-2 border-slate-700 rounded-lg">{tipoDeContenido}</Button>
          ))
        }
      </div>
      <div className="flex flex-col w-full rounded-full">{
          loading ? 
          <LoadingComponent message="Generando contenido..." />
          : <p className="px-4 py-2 text-md font-medium">{lambda2Data.contenido}</p>
      }</div>
    </div>
  );
}