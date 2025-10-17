import Filter from "@/src/libs/components/hotels/Filter";
import withLayoutSecondary from "@/src/libs/components/layout/LayoutSecondary";
import { Stack } from "@mui/material";
import React from "react";

const Hotels = () => {
  return (
    <Stack overflow={"auto"} mt={"50px"}>
      <Stack className="container">
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Stack width={300}>
            <Filter />
          </Stack>
          <Stack width={980}>
            <Stack>Body</Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutSecondary(Hotels);
