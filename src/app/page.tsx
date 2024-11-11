import App from "@/app/context/App";
import VotaComponent from "./components/VotaComponent";

export default function Home() {
  return (
    <App>
      <div className="flex flex-col w-screen h-screen justify-center items-center p-8 overflow-y-scroll">
        <main className="flex flex-col w-full h-full justify-center items-center">
          <h1 className="text-4xl m-8">Gracias por probar Lotus</h1>
          <p className="text-lg m-2">Desafortunadamente Lotus no pasó a la final, por lo que Lotus dejará de funcionar.</p>
          <p className="text-lg m-2">Puedes solicitar que Lotus siga disponible en el siguiente botón.</p>
          <VotaComponent />
        </main>
      </div>
    </App>
  );
}