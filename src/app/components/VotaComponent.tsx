import { Box, Button, Collapse } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function VotaComponent({ className }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const onVotaClick = () => {
    window.open("https://platzi.com/vota", "_blank");
  }
  return (
    <Button className={className} variant="contained" color="primary" onClick={onVotaClick}>
      <Box sx={{ width: 'auto' }}>
        <Collapse orientation="horizontal" in={collapsed} collapsedSize={24} onMouseOver={() => {setCollapsed(true)}} onMouseLeave={() => {setCollapsed(false)}}>
          <div className="flex flex-row items-center gap-2 text-white font-bold">
            <Image
              src="/lotus.svg"
              alt="Logo Lotus"
              width={24}
              height={24}
              />
            <p className="overflow-hidden whitespace-nowrap">Vota por Lotus</p>
          </div>
        </Collapse>
      </Box>
    </Button>
  );
}