import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  guestType: string;
  guestStatus: string;
  guestAuthType: string;
  guestPhone: string;
  guestGender: string;
  guestName: string;
  guestEmail: string;
  guestFullName?: string;
  guestImage?: string;
  guestCountry?: string;
  guestRegion?: string;
  guestPoints?: number;
  userRole: string;
}

export interface CustomJwtPartnerPayload extends JwtPayload {
  _id: string;
  partnerEmail: string;
  partnerFirstName: string;
  partnerLastName: string;
  partnerPhoneNumber: string;
  partnerPassword: string;
  userRole: string;
  memberStatus: string;
}
