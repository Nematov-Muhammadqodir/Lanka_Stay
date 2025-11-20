import PropertyCategoryList from "@/src/libs/components/register-property/add-new-property/PropertyCategoryList";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { partnerVar } from "@/apollo/store";

const AddNewProperty = () => {
  const router = useRouter();
  const partner = useReactiveVar(partnerVar);

  useEffect(() => {
    if (partner._id !== "") {
      router.push(
        "/register-property/add-new-property/property-details-complete"
      );
    }
  }, [partner]);
  return (
    <LayoutCreateAccountMain>
      <PropertyCategoryList />
    </LayoutCreateAccountMain>
  );
};

export default AddNewProperty;
