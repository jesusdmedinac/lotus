"use client";

import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Markdown from "react-markdown";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SliderSuggestions from "./slider.suggestions";
import { Analytics, logEvent } from "firebase/analytics";
import { useState } from "react";
import LearningProfile from "./learning.profile";
import SuggestedTeachers from "./suggested.teachers";

export default function AccordionSuggestions({
  currentTranscript,
  suggestedContentList,
  analytics
}: {
  currentTranscript: string,
  suggestedContentList: string[],
  analytics: Analytics | null
}) {
  const [expanded, setExpanded] = useState(false);

  const onSuggestionsClick = () => {
    setExpanded((prev) => !prev);
    if (!analytics) return;
    logEvent(analytics, "contenido_adicional", {
      expanded
    });
  }
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
