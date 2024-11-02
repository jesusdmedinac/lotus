"use client";

import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Markdown from "react-markdown";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SliderSuggestions from "./slider.suggestions";
import { Analytics, logEvent } from "firebase/analytics";
import { useState } from "react";
import LearningProfile from "./learning.profile";

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
      <Accordion className="bg-background text-white">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon
            className="text-white"
             />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => {}}
        >
          <Typography>
            Conoce tu perfil de aprendizaje
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LearningProfile>
          </LearningProfile>
        </AccordionDetails>
      </Accordion>
      <Accordion className="bg-background text-white">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon
            className="text-white"
             />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={onSuggestionsClick}
        >
          Continua aprendiendo a tu estilo
        </AccordionSummary>
        <AccordionDetails>
          <SliderSuggestions items={suggestedContentList} />
        </AccordionDetails>
      </Accordion>
      {/*<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Test
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>*/}
    </div>
  );
}
