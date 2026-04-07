import PropertyCategoryList from "@/src/libs/components/register-property/add-new-property/PropertyCategoryList";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { useRouter } from "next/router";
import { useQuery, useReactiveVar } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { GET_PARTNER_PROPERTY_BY_HOTEL_OWNER } from "@/apollo/user/query";
import { T } from "@/src/libs/types/common";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AddNewProperty = () => {
  const router = useRouter();
  const partner = useReactiveVar(partnerVar);
  const [propertyExists, setPropertyExists] = useState(false);

  /** APOLLO REQUESTS **/
  const {
    loading: getPartnerPropertyByHotelOwnerLoading,
    data: getPartnerPropertyByHotelOwnerData,
    error: getPartnerPropertyByHotelOwnerError,
    refetch: getPartnerPropertyByHotelOwnerRefetch,
  } = useQuery(GET_PARTNER_PROPERTY_BY_HOTEL_OWNER, {
    fetchPolicy: "network-only",
    variables: { input: partner?._id },
    skip: !partner._id,
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    if (getPartnerPropertyByHotelOwnerData) {
      // do something with data
      console.log(
        "data.getPartnerPropertyByHotelOwnerData",
        getPartnerPropertyByHotelOwnerData.getPartnerProperty
      );
      console.log(
        "data.getPartnerPropertyByHotelOwner",
        getPartnerPropertyByHotelOwnerData.getPartnerPropertyByHotelOwner._id
      );
      if (
        getPartnerPropertyByHotelOwnerData.getPartnerPropertyByHotelOwner._id
      ) {
        router.push("/register-property/dashboard");
      }
    }
  }, [getPartnerPropertyByHotelOwnerData]);

  useEffect(() => {
    if (partner?._id) {
      getPartnerPropertyByHotelOwnerRefetch();
    }
  }, [partner]);
  return (
    <LayoutCreateAccountMain>
      <PropertyCategoryList />
    </LayoutCreateAccountMain>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default AddNewProperty;
