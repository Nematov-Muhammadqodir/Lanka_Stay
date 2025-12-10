export interface ReservationInfo {
  _id: string; // ObjectId → string in FE
  guestId: string;
  guestName: string;
  guestLastName?: string | null;
  guestEmail: string;
  guestPhoneNumber: string;
  travelForWork: boolean;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvs: string;
  roomId: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  ageConfirmation: boolean;
  createdAt: string; // GraphQL sends Date as string
  updatedAt: string; // same
}
