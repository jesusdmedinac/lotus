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
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
          <SignIn />
          <LottieComponent 
            defaultOptions={defaultOptions}
            animation="teacher"
            className="w-full" />
          <FormVideo />
        </main>
        <footer className="row-start-3 w-full">
        </footer>
      </div>
    </App>
  );
}