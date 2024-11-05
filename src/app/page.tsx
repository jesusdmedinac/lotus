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
      <div className="flex flex-col w-screen h-screen justify-center items-center p-8">
        <main className="flex flex-col w-full h-full justify-center items-center">
          <SignIn />
          <LottieComponent 
            defaultOptions={defaultOptions}
            animation="teacher"
            className="w-full" />
          <FormVideo />
        </main>
      </div>
    </App>
  );
}