import { useState } from "react";
import Markdown from "react-markdown";

export default function SliderSuggestions({ 
  items 
}: { items: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full justify-start">
        {items.map((item, index) => (
          <div key={index} style={{"display": currentSlide === index ? "block" : "none"}}>
            <Markdown>{item}</Markdown>
          </div>
        ))}
      </div>
      <br></br>
      <div className="flex flex-row w-full justify-center">
        <a className="" onClick={() => {
          const previousSlide = currentSlide - 1;
          if (previousSlide < 0) return;
          setCurrentSlide(previousSlide);
        }}>❮</a>
        <div className="grow"></div>
        
        {items.map((_, index) => (
          <span key={index} className="cursor-pointer w-2 h-2 m-2 rounded-full inline-block" onClick={() => {
            const nextSlide = currentSlide + 1;
            if (nextSlide > items.length - 1) return;
            setCurrentSlide(nextSlide);
          }} style={{backgroundColor: currentSlide === index ? "#64748b" : "#cbd5e1"}}></span>
        ))}

        <div className="grow"></div>
        <a className="" onClick={() => { setCurrentSlide(currentSlide + 1) }}>❯</a>
      </div>
    </div>
  );
}