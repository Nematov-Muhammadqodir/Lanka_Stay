import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CheckIcon from "@mui/icons-material/Check";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import {
  partnerPropertyRoomInputValue,
  setPropertyId,
  setRoomPricePerNight,
} from "@/src/slices/partnerPropertyRoomSlice";
import { sweetBasicAlert } from "@/src/libs/sweetAlert";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { CREATE_PARTNER_PROPERTY_ROOM } from "@/apollo/user/mutation";
import {
  GET_PARTNER_PROPERTY,
  GET_PARTNER_PROPERTY_BY_HOTEL_OWNER,
} from "@/apollo/user/query";
import { getPartnerJwtToken, updatePartnerInfo } from "@/src/libs/auth";
import { partnerVar } from "@/apollo/store";
import { T } from "@/src/libs/types/common";
import { IPartnerProperty } from "@/src/libs/types/partnerInput/partnerPropertyInput";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const RoomPrice = () => {
  const partner = useReactiveVar(partnerVar);

  useEffect(() => {
    const jwt = getPartnerJwtToken();
    if (jwt) updatePartnerInfo(jwt);
  }, []);
  const router = useRouter();
  const dispatch = useDispatch();
  const roomInput = useSelector(partnerPropertyRoomInputValue);
  console.log("partnerPropertyRoomInput", roomInput);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRoomPricePerNight(event.target.value));
  };

  /** APOLLO REQUESTS **/
  const [createPartnerPropertyRoom] = useMutation(CREATE_PARTNER_PROPERTY_ROOM);

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
      console.log(
        "data.getPartnerPropertyByHotelOwner",
        getPartnerPropertyByHotelOwnerData.getPartnerPropertyByHotelOwner
      );
      dispatch(
        setPropertyId(
          getPartnerPropertyByHotelOwnerData.getPartnerPropertyByHotelOwner._id
        )
      );
    }
  }, [getPartnerPropertyByHotelOwnerData]);

  const handleAddPropertyRoom = async () => {
    if (roomInput.roomPricePerNight === "") {
      sweetBasicAlert("Please set the price for this room!");
      router.push(
        "/register-property/add-new-property/add-property-rooms/room-price"
      );
    } else {
      await createPartnerPropertyRoom({
        variables: {
          input: {
            propertyId: roomInput.propertyId,
            roomType: roomInput.roomType,
            currentRoomTypeAmount: roomInput.currentRoomTypeAmount,
            availableBeds: roomInput.availableBeds,
            numberOfGuestsCanStay: roomInput.numberOfGuestsCanStay,
            isSmokingAllowed: roomInput.isSmokingAllowed,
            isBathroomPrivate: roomInput.isBathroomPrivate,
            availableBathroomFacilities: roomInput.availableBathroomFacilities,
            roomFacilities: roomInput.roomFacilities,
            roomName: roomInput.roomName,
            roomPricePerNight: roomInput.roomPricePerNight,
          },
        },
      });
      router.push("/register-property/dashboard");
    }
  };

  return (
    <LayoutCreateAccountMain>
      <Stack sx={{ backgroundColor: "#FAF8FA", height: "87vh", pb: 20 }}>
        <Stack className="container">
          <Stack sx={{ mt: 10, gap: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              Set the price per night for this room
            </Typography>

            <Stack sx={{ flexDirection: "row", gap: 3 }}>
              <Stack
                width={500}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={1.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Typography className="bold-text-medium">
                  How much do you want to charge per night?
                </Typography>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl sx={{ m: 1, width: "90%" }}>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">KRW</InputAdornment>
                      }
                      label="Amount"
                      value={roomInput.roomPricePerNight}
                      onChange={handlePriceChange}
                      type="number"
                    />
                    <Typography className="small-text">
                      Including taxes, commission and charges
                    </Typography>
                  </FormControl>
                </Box>

                <Stack>
                  <Typography
                    className="bold-text-medium"
                    color={"primary.main"}
                  >
                    15.00% LankaStay.com commission
                  </Typography>
                  <Stack my={1} ml={4} gap={1}>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <CheckIcon />
                      <Typography>24/7 help in your language</Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <CheckIcon />
                      <Typography>
                        Save time with automatically confirmed bookings
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <CheckIcon />
                      <Typography>We promote your place on Google</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                width={400}
                height={"150px"}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={1.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Stack gap={1} sx={{ flexDirection: "row" }}>
                  <LightbulbIcon />
                  <Typography className="bold-text-medium">
                    What if I'm not sure about my price?
                  </Typography>
                </Stack>

                <Typography>
                  Don't worry, you can always change it later. You can even set
                  weekend, midweek and seasonal prices, giving you more control
                  over what you earn.
                </Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 500,
              }}
            >
              <Button
                variant="outlined"
                sx={{ height: 40, fontWeight: "bold", width: "30%" }}
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/add-property-rooms/room-name"
                  )
                }
              >
                <KeyboardArrowLeftIcon />
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: 40,
                  color: "white",
                  fontWeight: "bold",
                  width: "68%",
                }}
                onClick={() => {
                  handleAddPropertyRoom();
                }}
              >
                Continue
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </LayoutCreateAccountMain>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default RoomPrice;
