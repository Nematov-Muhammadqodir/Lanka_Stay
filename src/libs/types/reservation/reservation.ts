export interface ReservationInfo {
  _id: string;
  guestId: string;
  guestName: string;
  guestLastName?: string | null;
  guestEmail: string;
  guestPhoneNumber: string;
  travelForWork: boolean;
  stripePaymentIntentId: string;
  paymentStatus: string;
  paymentAmount: number;
  roomId: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  ageConfirmation: boolean;
  createdAt: string;
  updatedAt: string;
}
