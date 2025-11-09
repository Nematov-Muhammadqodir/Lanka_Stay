import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const GUEST_SIGN_UP = gql`
  mutation GuestSignup($input: GuestInput!) {
    guestSignup(input: $input) {
      _id
      guestType
      guestStatus
      guestAuthType
      guestPhone
      guestGender
      guestName
      guestFullName
      guestImage
      guestCountry
      guestRegion
      guestPoints
      deletedAt
      createdAt
      updatedAt
      accessToken
      userRole
    }
  }
`;

export const GUEST_LOGIN = gql`
  mutation GuestLogin($input: GuestLoginInput!) {
    guestLogin(input: $input) {
      _id
      guestType
      guestStatus
      guestAuthType
      guestPhone
      guestGender
      guestName
      guestFullName
      guestImage
      guestCountry
      guestRegion
      guestPoints
      deletedAt
      createdAt
      updatedAt
      accessToken
      userRole
    }
  }
`;

export const UPDATE_GUEST = gql`
  mutation UpdateGuest($input: GuestUpdateInput!) {
    updateGuest(input: $input) {
      _id
      guestType
      guestStatus
      guestAuthType
      guestPhone
      guestGender
      guestName
      guestFullName
      guestImage
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
