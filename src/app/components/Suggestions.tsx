'use client';

import { useEffect, useState } from "react";
import { fetchLambda1, fetchLambda2, fetchLambda3 } from "@/app/services/lambdaService";
import { addVideo, getVideo, PrismaVideo } from "@/app/services/prismaService";
import { useFirebaseAuth } from "@/app/context/Context";
import { Video } from "@/app/models/lambda1";
import { signInAnonymously } from "firebase/auth";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import TimerIcon from '@mui/icons-material/Timer';
import CodeIcon from '@mui/icons-material/Code';
import { Lambda2Data } from "../models/lambda2";
import { Lambda3Data } from "../models/lambda3";
import YouTubeComponent from "./youtube";
import LoadingComponent from "@/app/components/LoadingComponent";

export default function Suggestions({ url }: { url: string }) {
  const auth = useFirebaseAuth();
  const [video, setVideo] = useState<PrismaVideo | null>(null);
  const [lambda2Data, setLambda2Data] = useState<Lambda2Data | null>(null);
  const [lambda3Data, setLambda3Data] = useState<Lambda3Data | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!auth) return;
    async function createVideo(userId: string, url: string) {      
      const lambda1Response = await fetchLambda1(url);
      const data: Video = lambda1Response.data;
      const videoId = (await addVideo(userId, {
        materia: data.materia,
        clase: data.clase,
        estilo: data.estilo,
        parrafos: {
          create: data.parrafos.map((parrafo) => ({
            parrafo: parrafo.parrafo,
            inicio: `${parrafo.inicio}`,
            fin: `${parrafo.fin}`,
            tiempo: parrafo.tiempo,
            estilo: parrafo.estilo
          }))
        },
        youtube: {
          create: data.youtube
        }
      })).id;
      const video = await getVideo(videoId);
      setVideo(video);
    };
    async function signIn() {
      try {
        if (!auth) return;
        const userCredential = await signInAnonymously(auth);
        const userId = userCredential.user.uid;
        createVideo(userId, url);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
    signIn();
  }, [auth, url]);

  useEffect(() => {
    async function loadSuggestions() {
      if (!video) return;
      const estilos = ["práctica", "ejemplo", "resumen", "examen"]
      const lambda2Response = await fetchLambda2(
        video.estilo,
        video.materia,
        video.clase,
        estilos[Math.floor(Math.random() * estilos.length)]
      );
      const data = lambda2Response.data;
      setLambda2Data(data);
    }
    loadSuggestions();
  }, [video]);

  useEffect(() => {
    async function loadSuggestions() {
      if (!video) return;
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

  if (!auth) return <LoadingComponent />;
  if (!video) return <LoadingComponent />;
  if (!lambda2Data) return <LoadingComponent />;
  if (!lambda3Data) return <LoadingComponent />;

  const recomendaciones = lambda3Data.recomendaciones;
  const exactas = recomendaciones.exactas;
  const parecidas = recomendaciones.parecidas;
  const todas = [
    ...exactas,
    ...parecidas
  ];
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
          <div className="flex flex-col w-full p-16 bg-slate-900">
            <div className="flex flex-col items-center w-full">
              <Divider className="w-20" textAlign="center"  />
            </div>
            <p className="px-4 py-2 text-2xl font-semibold">Este contenido te podría interesar</p>
            <div className="px-4 py-2 flex flex-row w-full">
              <p className="px-4 py-2 text-md border-2 border-slate-700 rounded-lg">{lambda2Data.tipo}</p>
            </div>
            <p className="px-4 py-2 text-md font-medium">{lambda2Data.contenido}</p>
          </div>
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
                    <div key={index} className="flex flex-col w-[480px] h-[270px] p-4 rounded-xl bg-slate-800 aspect-video">
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