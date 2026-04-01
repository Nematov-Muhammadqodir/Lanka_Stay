export interface FaqItem {
  question?: string;
  answer?: string;
}

export interface Attraction {
  _id: string;
  partnerId: string;
  attractionType: string;
  attractionName: string;
  attractionDescription: string;
  attractionCountry: string;
  attractionRegion: string;
  attractionCity: string;
  attractionImages: string[];
  attractionAdultPrice: number;
  attractionChildPrice: number;
  attractionDuration: string;
  attractionHighlights: string[];
  attractionIncludes: string[];
  attractionExcludes: string[];
  faqItems?: FaqItem[];
  maxParticipants: number;
  freeCancellation: boolean;
  attractionStatus: string;
  attractionViews: number;
  attractionLikes: number;
  totalReviews: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  memberData?: {
    _id: string;
    partnerEmail: string;
    partnerFirstName: string;
    partnerLastName: string;
    partnerPhoneNumber: string;
  };
}
