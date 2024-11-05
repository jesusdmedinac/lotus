import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../context/Context";
import { signInAnonymously } from "firebase/auth";
import { addVideo, createNewUser, deleteAllVideos, deleteUser, getUser } from "../services/prismaService";
import { User } from "../models/user";
import { Button } from "@mui/material";

export default function Admin() {
  const auth = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function signIn() {
      try {
        if (!auth) return;
        const userCredential = await signInAnonymously(auth);
        const userId = userCredential.user.uid;
        const user = await getUser(userId);
        setUser(user);
        console.log("User logged in:", user);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
    signIn();
  }, [auth]);

  const onAddUserClick = async () => {
    if (!auth) return;
    const userCredential = await signInAnonymously(auth);
    const userId = userCredential.user.uid;
    await createNewUser(userId);
    const updatedUser = await getUser(userId);
    setUser(updatedUser);
  };
  
  const onDeleteClick = async () => {
    if (!user) return;
    const userId = user.id;
    await deleteUser(userId);
    const updatedUser = await getUser(userId);
    setUser(updatedUser);
  };

  const onAddVideoClick = async () => {
    if (!user) return;
    const userId = user.id;
    await addVideo(userId, {
      materia: "Matemáticas",
      clase: "Álgebra",
      estilo: "Educacional",
      parrafos: {
        create: [
          {
            parrafo: "El álgebra es una rama de las matemáticas que se ocupa del estudio de las estructuras algebraicas, como los grupos, anillos, cuerpos y espacios vectoriales.",
            inicio: "00:00",
            fin: "00:30",
            tiempo: 30,
            estilo: ["Negrita", "Italic"]
          },
          {
            parrafo: "El álgebra moderna se desarrolló en el siglo XIX y principios del siglo XX, con contribuciones de matemáticos como Évariste Galois, Richard Dedekind, Leopold Kronecker, y David Hilbert.",
            inicio: "00:30",
            fin: "01:00",
            tiempo: 30,
            estilo: ["Negrita", "Italic"]
          }
        ]
      },
      youtube: {
        create: {
          id: "dQw4w9WgXcQ",
          title: "Introducción al Álgebra",
          duration: 360,
          webpage_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          video_filename: "introduccion_al_algebra.mp4",
          description: "Un video introductorio al álgebra, cubriendo los conceptos básicos y su importancia en las matemáticas.",
          subtitles: {},
          thumbnail: "introduccion_al_algebra_thumbnail.jpg",
          upload_date: "2022-01-01",
          view_count: 1000,
          uploader: "Profesor de Matemáticas",
          like_count: 100,
          dislike_count: null,
          average_rating: null,
          categories: ["Educación", "Matemáticas"],
          tags: ["Álgebra", "Matemáticas Básicas"],
          channel_id: "UC_xxxxxxxxxxxxxxxxxxxxxxx",
          channel_url: "https://www.youtube.com/channel/UC_xxxxxxxxxxxxxxxxxxxxxxx",
          age_limit: 0,
          is_live: false,
          start_time: null,
          end_time: null,
          chapters: null
        }
      }
    });
    const updatedUser = await getUser(userId);
    setUser(updatedUser);
  }

  const onDeleteVideoClick = async () => {
    if (!user) return;
    const userId = user.id;
    await deleteAllVideos(userId);
    const updatedUser = await getUser(userId);
    setUser(updatedUser);
  }
  
  if (!auth) return <div>Loading auth...</div>;
  return (
    <div className="flex flex-col w-full justify-start">
      <Button onClick={onAddUserClick}>Add user</Button>
      <Button onClick={onDeleteClick} color="error">Delete user</Button>
      <Button onClick={onAddVideoClick}>Add video</Button>
      <Button onClick={onDeleteVideoClick} color="error">Delete video</Button>
      {JSON.stringify(user, null, 2)}
    </div>
  );
}