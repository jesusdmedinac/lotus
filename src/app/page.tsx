import App from "@/app/context/App";
import SignIn from "@/app/components/SignIn";
import FormVideo from "./components/FormVideo";
import LottieComponent from "./components/LottieComponent";

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <App>
      <div className="flex flex-col w-screen h-screen justify-center items-center p-8 overflow-y-scroll">
        <main className="flex flex-col w-full h-full justify-center items-center">
          <SignIn />
          <p className="flex flex-row w-full text-2xl items-center justify-center text-center">Aprendizaje personalizado, con tu profe ideal</p>
          <p className="flex flex-row w-full text-lg items-center justify-center text-center">Busca un video de tu profe favorito y nosotros te diremos cual es tu estilo de aprendizaje</p>
          <LottieComponent 
            defaultOptions={defaultOptions}
            animation="teacher"
            className="w-full" />
          <FormVideo />
          <p className="flex flex-row w-full text-xl items-center justify-center text-center">Por la alta demanda, sólo aceptamos videos menores a 2 minutos 🙏</p>
        </main>
      </div>
    </App>
  );
}