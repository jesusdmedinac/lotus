const { PrismaClient } = require('@prisma/client');
const { withAccelerate } = require('@prisma/extension-accelerate');

const prisma = new PrismaClient()
  .$extends(withAccelerate());

async function main() {
  const userEmail = 'email@co.co';

  const user = await prisma.user.create({
    data: {
      id: "6d5f6d2d-7b61-4e3e-8f1d-3f6f6d2d7b61",
      email: userEmail,
      name: "Sample",
      videos: {
        create: {
          materia: "Matemáticas",
          clase: "Álgebra",
          parrafos: {
            create: {
              parrafo: "Imagina tu carrera profesional si dominas la inteligencia artificial.",
              inicio: "0.0",
              fin: "3.6",
              tiempo: 3,
              estilo: [
                "teorico"
              ]
            }
          },
          estilo: "normal",
          youtube: {
            create: {
              id: "mKMwDHiYm2E",
              title: "Pasa de la Imaginación a la Realidad. Aprende en Platzi.",
              duration: 16,
              webpage_url: "https://www.youtube.com/watch?v=mKMwDHiYm2E",
              video_filename: "assets\\Pasa de la Imaginación a la Realidad. Aprende en Platzi..mp4",
              description: "💚 En https://platzi.com/ hay un curso para ti. Aprende inteligencia artificial, data, programación, inglés, marketing, ¡o lo que tú decidas!\n🚀 Conoce las habilidades que impulsarán tu crecimiento profesional 🔥\n----------------------------------------------------------------------\n\n👉 Platzi es una plataforma de educación Online, con tu suscripción tienes acceso a  cursos en diferentes áreas de aprendizaje:\n\n- Desarrollo e ingeniería\n- Inteligencia artificial\n- Data Science\n- Diseño y UX\n- Marketing\n- Negocios y emprendimiento\n- Producción audiovisual\n- Liderazgo y management\n\nCada área está compuesta por Rutas de aprendizaje y Escuelas que harán de tu perfil uno de los más demandados de la industria. Además, cuentas con ADA -Asistente De Aprendizaje- creada con inteligencia artificial, grupos de estudio, meetups digitales y tutoriales en nuestro sistema de discusiones.\n\n----------------------------------------------------------------------\nTodo esto y más, en https://platzi.com\n\nSíguenos\nFacebook: https://platzi.com/l/fHl6pows/\nTwitter: https://platzi.com/l/0DJ5PONB/\nInstagram: https://platzi.com/l/jt260ue0/",
              subtitles: {},
              thumbnail: "https://i.ytimg.com/vi/mKMwDHiYm2E/maxresdefault.jpg",
              upload_date: "20240618",
              view_count: 162518,
              uploader: "Platzi",
              like_count: 17,
              dislike_count: null,
              average_rating: null,
              categories: [
                "Education"
              ],
              tags: [
                "platzi"
              ],
              channel_id: "UC55-mxUj5Nj3niXFReG44OQ",
              channel_url: "https://www.youtube.com/channel/UC55-mxUj5Nj3niXFReG44OQ",
              age_limit: 0,
              is_live: false,
              start_time: null,
              end_time: null,
              chapters: null
            }
          }
        }
      }
    }
  });
  console.log("User created", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
