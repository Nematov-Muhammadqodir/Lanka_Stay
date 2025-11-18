import {
  CustomJwtPartnerPayload,
  CustomJwtPayload,
} from "@/src/libs/types/customJwtPayload";
import { makeVar } from "@apollo/client";

export const themeVar = makeVar({});

export const userVar = makeVar<CustomJwtPayload>({
  _id: "",
  guestType: "",
  guestStatus: "",
  guestAuthType: "",
  guestPhone: "",
  guestGender: "",
  guestEmail: "",
  guestName: "",
  guestFullName: "",
  guestImage: "",
  guestCountry: "",
  guestRegion: "",
  guestPoints: 0,
  userRole: "",
});
export const partnerVar = makeVar<CustomJwtPartnerPayload>({
  _id: "",
  partnerEmail: "",
  partnerFirstName: "",
  partnerLastName: "",
  partnerPhoneNumber: "",
  partnerPassword: "",
  userRole: "",
  memberStatus: "",
});

//@ts-ignore
export const socketVar = makeVar<WebSocket>();
