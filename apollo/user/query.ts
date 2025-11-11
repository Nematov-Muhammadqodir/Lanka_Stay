import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const GET_GUEST_PROFILE = gql`
  query GetGuestProfile {
    getGuestProfile {
      _id
      guestType
      guestStatus
      guestAuthType
      guestPhone
      guestGender
      guestName
      guestFullName
      guestImage
      guestEmail
      guestCountry
      guestRegion
      guestPoints
      userRole
      deletedAt
      createdAt
      updatedAt
      accessToken
    }
  }
`;
