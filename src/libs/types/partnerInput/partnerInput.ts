import { UserRole } from "../../enums/user.enum";

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
