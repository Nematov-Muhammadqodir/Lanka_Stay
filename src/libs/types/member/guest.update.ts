import { GuestType } from "../../enums/user.enum";

export interface UpdateGuestProfile {
  _id: string;
  guestType?: GuestType;
  guestPhone?: string;
  guestEmail?: string;
  guestName?: string;
  guestFullName?: string;
  guestImage?: string;
  guestCountry?: string;
  guestRegion?: string;
}
