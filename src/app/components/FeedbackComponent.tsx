import { Box, Button, Collapse } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function FeedbackComponent({ className }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const onFeedbackClick = () => {
    window.open("https://calendly.com/jesusdmedinac/lotus-internal-testing", "_blank");
  }
  return (
    <Button className={className} variant="contained" color="info" onClick={onFeedbackClick}>
      <Box sx={{ width: 'auto' }}>
        <Collapse orientation="horizontal" in={collapsed} collapsedSize={24} onMouseOver={() => {setCollapsed(true)}} onMouseLeave={() => {setCollapsed(false)}}>
          <div className="flex flex-row items-center gap-2 text-black font-bold">
            <Image
              src="/lotus-black.svg"
              alt="Logo Lotus"
              width={24}
              height={24}
              />
            <p className="overflow-hidden whitespace-nowrap">Compartir feedback</p>
          </div>
        </Collapse>
      </Box>
    </Button>
  );
}