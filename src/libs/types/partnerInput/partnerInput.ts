import { ObjectId } from "mongoose";
import { GuestStatus, UserRole } from "../../enums/user.enum";

export interface PartnerSignupInput {
  partnerEmail: string;
  partnerFirstName: string;
  partnerLastName: string;
  partnerPhoneNumber: string;
  partnerPassword: string;
  userRole: UserRole;
}

export interface PartnerLoginInput {
  partnerEmail: string;
  partnerPassword: string;
}

export interface Partner {
  _id: ObjectId | string;
  partnerEmail: string;
  partnerFirstName: string;
  partnerLastName: string;
  partnerPhoneNumber: string;
  partnerPassword: string;
  userRole: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  accessToken?: string;
  memberStatus: GuestStatus;
}
