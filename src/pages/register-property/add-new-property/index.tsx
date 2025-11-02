import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import PropertyCategoryList from "@/src/libs/components/register-property/add-new-property/PropertyCategoryList";
import { Stack } from "@mui/material";
import React, { useState } from "react";

const AddNewProperty = () => {
  const [stage, setStage] = useState("propertyCategory");
  return (
    <Stack sx={{ backgroundColor: "#FAF8FA" }}>
      <PropertyCategoryList />
    </Stack>
  );
};

export default withLayoutCreateAccountMain(AddNewProperty);
