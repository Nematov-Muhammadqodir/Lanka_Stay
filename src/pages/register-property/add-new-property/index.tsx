import PropertyCategoryList from "@/src/libs/components/register-property/add-new-property/PropertyCategoryList";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";

const AddNewProperty = () => {
  return (
    <LayoutCreateAccountMain>
      <PropertyCategoryList />
    </LayoutCreateAccountMain>
  );
};

export default AddNewProperty;
