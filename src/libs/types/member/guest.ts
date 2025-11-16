import {
  GuestAuthType,
  GuestGender,
  GuestStatus,
  GuestType,
  UserRole,
} from "../../enums/user.enum";

export interface Guest {
  _id: string;
  guestType: GuestType;
  guestStatus: GuestStatus;
  guestAuthType: GuestAuthType;
  guestPhone: string;
  guestGender: GuestGender;
  guestName: string;
  guestPassword: string;
  guestFullName?: string;
  guestImage: string;
  guestCountry: string;
  guestEmail: string;
  guestRegion: string;
  guestPoints: number;
  userRole: UserRole;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
  memberStatus: any;
}

export interface TotalCounter {
  total?: number;
}

export interface Guests {
  list: Guest[];
  metaCounter: TotalCounter[];
}
