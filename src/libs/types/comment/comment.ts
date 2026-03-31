import { CommentStatus } from "../../enums/comment.enum";
import { Guest, TotalCounter } from "../member/guest";
import { PartnerProperty } from "../partnerInput/partnerProperty";
import { IPartnerPropertyRoom } from "../partnerInput/partnerPropertyRoom";
import { ReservationInfo } from "../reservation/reservation";

export interface Comment {
  _id: string; // ObjectId → string
  commentStatus: CommentStatus;
  commentContent: string;
  commentRefId: string; // ObjectId
  memberId: string; // ObjectId
  commentScore: number;
  commentLikes: number;
  commentDislikes: number;
  likedBy?: string[];
  dislikedBy?: string[];
  createdAt: string;
  updatedAt: string;

  /** Aggregated data (all nullable in GraphQL) */
  memberData?: Guest | null;
  reservationData?: ReservationInfo | null;
  propertyData?: PartnerProperty | null;
  roomData?: IPartnerPropertyRoom | null;
}

export interface Comments {
  list: Comment[];
  metaCounter?: TotalCounter[] | null;
}
