import {
  HotelStaffLanguages,
  PropertyFacilities,
  PropertyType,
} from "../../enums/property.enum";

export interface PartnerPropertyInput {
  partnerId: string;
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
