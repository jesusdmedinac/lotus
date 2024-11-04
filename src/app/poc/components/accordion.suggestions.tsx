"use client";

import SliderSuggestions from "./slider.suggestions";
import LearningProfile from "./learning.profile";
import SuggestedTeachers from "./suggested.teachers";

export default function AccordionSuggestions({
  suggestedContentList,
}: {
  suggestedContentList: string[],
}) {
  return (
    <div className="absolute top-52">
      <h2 className="text-2xl font-semibold mb-4">
        Conoce tu perfil de aprendizaje
      </h2>
      <LearningProfile>
      </LearningProfile>
      <h2 className="text-2xl font-semibold mb-4">
        Estos profesores tienen tu estilo 😎
      </h2>
      <SuggestedTeachers />
      <h2 className="text-2xl font-semibold mb-4">
        Continua aprendiendo a tu estilo
      </h2>
      <SliderSuggestions items={suggestedContentList} />
      <div className="h-52"></div>
    </div>
  );
}
