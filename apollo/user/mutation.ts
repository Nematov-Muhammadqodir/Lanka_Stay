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

/**************************
 *         PARTNER        *
 *************************/

export const PARTNER_SIGNUP = gql`
  mutation PartnerSignup($input: PartnerInput!) {
    partnerSignup(input: $input) {
      _id
      partnerEmail
      partnerFirstName
      partnerLastName
      partnerPhoneNumber
      partnerPassword
      userRole
      createdAt
      updatedAt
      accessToken
      memberStatus
    }
  }
`;

export const PARTNER_LOGIN = gql`
  mutation PartnerLogin($input: PartnerLoginInput!) {
    partnerLogin(input: $input) {
      _id
      partnerEmail
      partnerFirstName
      partnerLastName
      partnerPhoneNumber
      partnerPassword
      userRole
      createdAt
      updatedAt
      accessToken
      memberStatus
    }
  }
`;

export const CREATE_PARTNER_PROPERTY = gql`
  mutation CreatePartnerProperty($input: PartnerPropertyInput!) {
    createPartnerProperty(input: $input) {
      _id
      partnerId
      propertyType
      propertyCountry
      propertyRegion
      propertyCity
      propertyPostCode
      propertyName
      propertyStars
      propertyRooms
      propertyViews
      propertyComments
      propertyFacilities
      breakfastIncluded
      parkingIncluded
      hotelStaffLanguages
      checkInTimeFrom
      propertyStatus
      checkInTimeUntill
      checkOutTimeFrom
      checkOutTimeUntill
      allowChildren
      allowPets
      createdAt
      updatedAt
      memberData {
        _id
        partnerEmail
        partnerFirstName
        partnerLastName
        partnerPhoneNumber
        partnerPassword
        userRole
        createdAt
        updatedAt
        accessToken
        memberStatus
      }
    }
  }
`;

export const CREATE_PARTNER_PROPERTY_ROOM = gql`
  mutation CreatePartnerPropertyRoom($input: PartnerPropertyRoomInput!) {
    createPartnerPropertyRoom(input: $input) {
      _id
      propertyId
      roomType
      currentRoomTypeAmount
      numberOfGuestsCanStay
      isSmokingAllowed
      isBathroomPrivate
      availableBathroomFacilities
      roomFacilities
      roomName
      roomPricePerNight
      createdAt
      updatedAt
      availableBeds {
        single
        double
        king
        superKing
      }
    }
  }
`;
