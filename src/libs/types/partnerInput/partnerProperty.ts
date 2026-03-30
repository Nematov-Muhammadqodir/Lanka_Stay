import { ObjectId } from "mongoose";
import { PropertyStatus } from "../../enums/property.enum";

export interface AvailableBeds {
  single: number;
  double: number;
  queen: number;
  king: number;
}

export interface ReservedDate {
  from: string; // ISO string
  until: string; // ISO string
  userId?: string;
}

export interface PropertyRoom {
  roomId: string;
  roomType: string;
  roomPricePerNight: string;
  numberOfGuestsCanStay: number;
  availableBeds: AvailableBeds;
  reservedDates: ReservedDate[];
  roomFacilities: string[];
  availableBathroomFacilities: string[];
  isBathroomPrivate: boolean;
  isSmokingAllowed: boolean;
  roomName: string;
}

export interface MeLiked {
  memberId: string;
  likeRefId: string;
  myFavorite: boolean;
}

export interface Partner {
  _id: string;
  partnerName: string;
  partnerEmail: string;
  partnerPhoneNumber: string;
  accessToken?: string;
  // Add other Partner fields if needed
}

export interface PartnerProperty {
  _id?: string;
  partnerId?: string;
  propertyType?: string;
  propertyCountry?: string;
  propertyRegion?: string;
  propertyCity?: string;
  propertyPostCode?: string;
  propertyName?: string;
  propertyStars?: number;
  propertyRooms?: PropertyRoom[];
  propertyViews?: number;
  propertyComments?: number;
  propertyFacilities?: string[];
  breakfastIncluded?: boolean;
  parkingIncluded?: boolean;
  hotelStaffLanguages?: string[];
  checkInTimeFrom?: string;
  checkInTimeUntill?: string;
  checkOutTimeFrom?: string;
  checkOutTimeUntill?: string;
  propertyStatus?: PropertyStatus;
  propertyImages?: string[];
  allowChildren?: boolean;
  allowPets?: boolean;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
  memberData?: Partner | null;
  meLiked?: MeLiked[] | null;
  propertyLikes?: number;
  totalReviews?: number;
  staffRating?: number;
  facilitiesRating?: number;
  cleanlessRating?: number;
  comfortRating?: number;
  valueOfMoneyRating?: number;
  locationRating?: number;
  freeWiFiRating?: number;
}

// For service returning multiple properties
export interface PartnerPropertiesResponse {
  list: PartnerProperty[];
  metaCounter?: { key: string; value: number }[]; // matches TotalCounter type
}
