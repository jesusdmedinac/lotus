"use client";

import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Markdown from "react-markdown";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SliderSuggestions from "./slider.suggestions";

export default function AccordionSuggestions({
  currentTranscript,
  suggestedContentList
}: {
  currentTranscript: string,
  suggestedContentList: string[]
}) {
  return (
    <div className="absolute top-52">
      <Typography>
        Transcripción actual:
        <Markdown>
          {currentTranscript}
        </Markdown>
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Contenido adicional
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
