import { Stack, Typography } from "@mui/material";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import BoyIcon from "@mui/icons-material/Boy";
import PetsIcon from "@mui/icons-material/Pets";
import PaymentIcon from "@mui/icons-material/Payment";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import { PropertyOverviewProps } from "../PropertyOverview";

const HouseRulesBody = ({
  partnerProperty,
  loading,
}: PropertyOverviewProps) => {
  return (
    <Stack
      p={2}
      border={"1px solid"}
      mt={3}
      borderColor={"secondary.main"}
      borderRadius={3}
    >
      <Stack>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack flexDirection={"row"} width={"25%"} gap={1}>
            <LoginIcon />
            <Typography className="bold-text-medium" width={"100%"}>
              Check-in
            </Typography>
          </Stack>
          <Typography width={"75%"}>
            From {partnerProperty?.checkInTimeFrom}
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack
            flexDirection={"row"}
            width={"25%"}
            alignItems={"start"}
            gap={1}
          >
            <LogoutIcon />
            <Typography className="bold-text-medium" width={"100%"}>
              Check-out
            </Typography>
          </Stack>
          <Typography width={"75%"}>
            From {partnerProperty?.checkOutTimeFrom}
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack flexDirection={"row"} width={"25%"} alignItems={"start"}>
            <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
              <ErrorOutlineIcon />
              <Typography
                className="bold-text-medium"
                width={"100%"}
                alignItems={"center"}
              >
                Cancellation/ prepayment
              </Typography>
            </Stack>
          </Stack>
          <Typography width={"75%"}>
            Cancellation and prepayment policies vary according to accommodation
            type. Please check what conditions may apply to each option when
            making your selection.
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack
            flexDirection={"row"}
            width={"25%"}
            alignItems={"flex-start"}
            gap={1}
          >
            <FamilyRestroomIcon />
            <Typography className="bold-text-medium" width={"100%"}>
              Children and beds
            </Typography>
          </Stack>

          <Stack width={"75%"} gap={3}>
            <Stack gap={1}>
              <Typography width={"100%"} className="small-bold-text">
                Child policies
              </Typography>
              <Typography width={"100%"}>
                {partnerProperty?.allowChildren
                  ? "Children of any age are welcome. To see correct prices and occupancy information, please add the number of children in your group and their ages to your search."
                  : "Children are not allowed at this property."}
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography width={"100%"} className="small-bold-text">
                Cot and extra bed policies
              </Typography>
              <Typography width={"100%"}>
                Cots and extra beds are not available at this property.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack width={"25%"}>
            <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
              <BoyIcon />
              <Typography className="bold-text-medium" width={"100%"}>
                Age restriction
              </Typography>
            </Stack>
          </Stack>
          <Typography width={"75%"}>
            The minimum age for check-in is 18
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack width={"25%"}>
            <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
              <PetsIcon />
              <Typography className="bold-text-medium" width={"100%"}>
                Pets
              </Typography>
            </Stack>
          </Stack>
          <Typography width={"75%"}>
            {partnerProperty?.allowPets ? "Pets are allowed." : "Pets are not allowed."}
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid"}
          borderColor={"secondary.main"}
        >
          <Stack width={"25%"}>
            <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
              <PaymentIcon />
              <Typography className="bold-text-medium" width={"100%"}>
                Accepted payment methods
              </Typography>
            </Stack>
          </Stack>
          <Stack
            width={"75%"}
            flexDirection={"row"}
            gap={2}
            alignItems={"center"}
          >
            <Image
              src={"/img/payments/Mastercard.svg"}
              alt="user-image"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <Image
              src={"/img/payments/ApplePay.svg"}
              alt="user-image"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <Image
              src={"/img/payments/Bitcoin.svg"}
              alt="user-image"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <Image
              src={"/img/payments/GooglePay.svg"}
              alt="user-image"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <Image
              src={"/img/payments/PayPal.svg"}
              alt="user-image"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <Image
              src={"/img/payments/Visa.svg"}
              alt="user-image"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <Stack
              flexDirection={"row"}
              gap={0}
              border={"1px solid"}
              p={0.5}
              sx={{
                backgroundColor: "primary.main",
                color: "secondary.contrastText",
                borderRadius: 2,
              }}
            >
              <Typography textTransform={"capitalize"}>Cash</Typography>
              <CheckIcon />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HouseRulesBody;
