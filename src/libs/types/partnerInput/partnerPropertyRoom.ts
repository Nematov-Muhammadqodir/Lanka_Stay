import {
  BathroomFacilities,
  RoomFacilities,
  RoomNames,
  RoomTypes,
} from "../../enums/propertyRoom.enum";

export interface IAvailableBeds {
  single: number;
  double: number;
  king: number;
  superKing: number;
}

export interface IPartnerPropertyRoom {
  propertyId: string;
  roomType: RoomTypes;
  currentRoomTypeAmount: number;
  availableBeds: IAvailableBeds;
  numberOfGuestsCanStay: number;
  isSmokingAllowed: boolean;
  isBathroomPrivate: boolean;
  availableBathroomFacilities: BathroomFacilities[];
  roomFacilities: RoomFacilities[];
  roomName: RoomNames;
  roomPricePerNight: string;
}
