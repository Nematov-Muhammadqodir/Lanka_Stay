import {
  HotelStaffLanguages,
  PropertyFacilities,
  PropertyStatus,
  PropertyType,
} from "../../enums/property.enum";
import { ObjectId } from "mongoose";
import { Partner } from "./partnerInput";
import { TotalCounter } from "../member/guest";

export interface PartnerPropertyInput {
  propertyType: PropertyType;
  propertyCountry: string;
  propertyRegion: string;
  propertyCity: string;
  propertyPostCode: string;
  propertyName: string;
  propertyStars: number;
  propertyFacilities: PropertyFacilities[];
  breakfastIncluded: boolean;
  parkingIncluded: boolean;
  hotelStaffLanguages: HotelStaffLanguages[];
  checkInTimeFrom: string;
  checkInTimeUntill: string;
  checkOutTimeFrom: string;
  checkOutTimeUntill: string;
  allowChildren: boolean;
  allowPets: boolean;
}

export interface IPartnerProperty {
  _id: ObjectId | string;
  partnerId: string;
  propertyType: string;
  propertyCountry: string;
  propertyRegion: string;
  propertyCity: string;
  propertyPostCode: string;
  propertyName: string;
  propertyStars: number;
  propertyRooms: number;
  propertyViews: number;
  propertyComments: number;
  propertyFacilities: string[];
  breakfastIncluded: boolean;
  parkingIncluded: boolean;
  hotelStaffLanguages: string[];
  checkInTimeFrom: string;
  propertyStatus: PropertyStatus;
  checkInTimeUntill: string;
  checkOutTimeFrom: string;
  checkOutTimeUntill: string;
  allowChildren: boolean;
  allowPets: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  memberData?: Partner;
}

export interface IPartnerProperties {
  list: IPartnerProperty[];
  metaCounter?: TotalCounter[];
}
