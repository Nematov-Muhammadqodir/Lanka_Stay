import { Stack } from "@mui/material";
import React from "react";
import GridCard from "./GridCard";
import { PartnerProperty } from "@/src/libs/types/partnerInput/partnerProperty";

// export interface HotelsGridProps {
//   data: PartnerProperty[];
// }

const HotelsGrid = ({ data }: { data: any[] }) => {
  console.log("dataaa", data);
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
    >
      {data.map((item: any, i) => {
        return <GridCard key={i} item={item} />;
      })}
    </Stack>
  );
};

export default HotelsGrid;
