'use client';

import { useEffect, useState } from "react";
import { fetchLambda1, fetchLambda3 } from "@/app/services/lambdaService";
import { useFirebaseAuth } from "@/app/context/Context";
import { Lambda1Response, Video } from "@/app/models/lambda1";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import TimerIcon from '@mui/icons-material/Timer';
import CodeIcon from '@mui/icons-material/Code';
import { Lambda3Data, Recomendacion } from "../models/lambda3";
import YouTubeComponent from "./youtube";
import LoadingComponent from "@/app/components/LoadingComponent";
import SuggestedContent from "./SuggestedContent";
import Image from "next/image";

const estilos: {
  [key: string]: string
} = {
  "teorico": "bg-pink-500",
  "activo": "bg-green-500",
  "pragmatico": "bg-sky-500",
  "reflexivo": "bg-violet-500"
}

export default function Suggestions({ url }: { url: string }) {
  const auth = useFirebaseAuth();
  const [video, setVideo] = useState<Video | null>(null);
  
  const [lambda3Data, setLambda3Data] = useState<Lambda3Data | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    async function loadSuggestions() {
      if (!auth) return;
      let descargado = false;
      let lambda1Response: Lambda1Response | null = null;
      while (!descargado) {
        lambda1Response = await fetchLambda1(url);
        const video = lambda1Response.data;
        descargado = video.descargado;
        setVideo(video);
        if (!descargado) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    loadSuggestions();
  }, [auth, url]);

  useEffect(() => {
    async function loadSuggestions() {
      if (!video) return;
      if (!video.descargado) return;
      const lambda3Response = await fetchLambda3(
        video.estilo.split(',')[0],
        video.clase
      );
      const data = lambda3Response.data;
      setLambda3Data(data);
    }
    loadSuggestions();
  }, [video]);

  const onTabSelected = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (!auth) return <LoadingComponent message={"Generando perfil de estudio..."} />;
  if (!video) return <LoadingComponent message={"Generando perfil de estudio..."} />;
  if (!lambda3Data) return <LoadingComponent message={video?.estatus} />;

  const recomendaciones = lambda3Data.recomendaciones;
  const exactas = recomendaciones.exactas;
  const parecidas = recomendaciones.parecidas;
  const todas = [
    ...exactas,
    ...parecidas
  ];
  const estilo = video.estilo.split(',')[0] as string;
  
  return (
    <div className="flex flex-col w-full overflow-y-scroll">
      <div className="flex flex-row w-full p-16 justify-center">
        <div className="flex flex-col rounded-xl p-4">
          <div className="flex flex-row justify-center items-center w-full rounded-xl">
            <YouTubeComponent
              id={video.youtube.id}
              handlePlay={() => console.log("play")}
              handlePause={() => console.log("pause")}
              className="w-full aspect-video border-none z-0"
            />
          </div>
          <div className="flex flex-row items-start justify-between w-full mt-8">
            <div className="flex flex-col items-start w-full">
              <p className="text-xl font-semibold uppercase">{video.youtube.uploader} - {video.materia}</p>
              <div className="flex flex-row gap-4 items-center mt-2">
                <p className="px-4 py-2 text-md font-medium rounded-lg border-2 border-slate-700">{video.clase.charAt(0).toUpperCase() + video.clase.slice(1)}</p>
              </div>
            </div>
            <div className={`flex flex-col items-center font-bold gap-2`}>
              <p>Estilo de aprendizaje</p>
              <p className={`text-4xl rounded-lg uppercase p-4 ${estilos[estilo]}`}>{estilo}</p>
            </div>
          </div>
          <Divider className="py-8" />
          <p className="px-4 py-2 text-lg font-semibold">{video.youtube.title}</p>
          <p className="px-4 py-2 text-md font-medium">{video.youtube.description.substring(0, 100) + "..."}</p>
        </div>
      </div>
      <div className="flex flex-col w-full py-16 bg-slate-900">
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          justifyContent: 'center', 
          display: 'flex', 
          alignItems: 'center' 
          }}>
          <Tabs value={selectedTab} onChange={onTabSelected} aria-label="basic tabs example">
            <Tab label="Contenido" {...a11yProps(0)} />
            <Tab label="Recomendaciones" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={selectedTab} index={0}>
          <SuggestedContent video={video} />
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          <div className="flex flex-col w-full py-16 bg-slate-900">
            <div className="flex flex-col items-center w-full">
              <Divider className="w-20" textAlign="center"  />
            </div>
            <p className="px-16 py-8 text-2xl font-semibold">Este es tu siguiente paso 🏃</p>
            <div className="flex flex-col w-full">
              <div className="flex flex-row gap-4 w-full overflow-scroll">
                <div></div>
                {
                  todas.map((recomendacion, index) => (
                    <Recomendation key={index} recomendacion={recomendacion} />
                  ))
                }
                <div></div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function Recomendation({ recomendacion }: { recomendacion: Recomendacion }) {
  const onRecomendacionClick = () => {
    window.open("https://www.youtube.com/watch?v=" + recomendacion.id, "_blank");
  }
  const youtubeThumbnail = `http://i3.ytimg.com/vi/${recomendacion.id}/hqdefault.jpg`
  return (
    <div className="flex flex-col min-w-[480px] h-auto rounded-xl bg-slate-800 aspect-video cursor-pointer" onClick={onRecomendacionClick}>
      <Image
        src={youtubeThumbnail}
        alt="Youtube Thumbnail"
        width={480}
        height={270}
        className="rounded-xl"
        />
      <div className="flex flex-col p-4 ">
        <p className="text-xl font-semibold truncate">{
          recomendacion.profesor ? recomendacion.profesor : "Profesor desconocido"
        }</p>
        <p className="text-md font-medium truncate">{recomendacion.titulo}</p>
        <div className="flex flex-row gap-2 py-2 w-full overflow-hidden flex-wrap items-center">
          <p className={`text-sm font-bold p-2 rounded-lg uppercase ${estilos[recomendacion.estilo]}`}>{recomendacion.estilo}</p>
          <p className="text-sm p-2 border-2 border-slate-700 rounded-lg">{recomendacion.canal}</p>
        </div>
        <div className="flex flex-row gap-2 py-2 w-full overflow-hidden flex-wrap items-center">
          <CodeIcon className="rounded-full bg-slate-500 p-1 size-8" />
          <p className="text-sm p-2 text-cyan-500 rounded-lg">{recomendacion.clase}</p>
        </div>
        <div className="flex flex-row gap-2 py-2 w-full overflow-hidden flex-wrap items-center">
          <TimerIcon className="rounded-full bg-slate-500 p-1 size-8" />
          <p className="text-sm p-2 text-cyan-500 rounded-lg">{recomendacion.duracion}</p>
        </div>
      </div>
    </div>
  );
}