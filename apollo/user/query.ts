import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const GET_GUEST_PROFILE = gql`
  query GetGuestProfile($input: String!) {
    getGuestProfile(memberId: $input) {
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
      guestEmail
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

export const GET_PARTNER_PROPERTY = gql`
  query GetPartnerProperty($input: String!) {
    getPartnerProperty(propertyId: $input) {
      _id
      partnerId
      propertyType
      propertyCountry
      propertyRegion
      propertyCity
      propertyPostCode
      propertyName
      propertyStars
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
      propertyImages
      propertyRooms {
        roomId
        roomType
        roomPricePerNight
        numberOfGuestsCanStay
        roomFacilities
        availableBathroomFacilities
        isBathroomPrivate
        isSmokingAllowed
        roomName
        availableBeds {
          single
          double
          king
          superKing
        }
        reservedDates {
          userId
          from
          until
        }
      }
    }
  }
`;

export const GET_PARTNER_PROPERTY_BY_HOTEL_OWNER = gql`
  query GetPartnerPropertyByHotelOwner($input: String!) {
    getPartnerPropertyByHotelOwner(parnerId: $input) {
      _id
      partnerId
      propertyType
      propertyCountry
      propertyRegion
      propertyCity
      propertyPostCode
      propertyName
      propertyStars
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
      propertyRooms {
        roomId
        roomType
        roomPricePerNight
        numberOfGuestsCanStay
        roomFacilities
        availableBathroomFacilities
        isBathroomPrivate
        isSmokingAllowed
        roomName
        availableBeds {
          single
          double
          king
          superKing
        }
        reservedDates {
          userId
          from
          until
        }
      }
    }
  }
`;

export const GET_ALL_AVAILABLE_PROPERTIES = gql`
  query GetAllAvailableProperties($input: AvailablePropertiesSearchInput!) {
    getAllAvailableProperties(input: $input) {
      _id
      partnerId
      propertyType
      propertyCountry
      propertyRegion
      propertyCity
      propertyPostCode
      propertyName
      propertyStars
      propertyViews
      propertyComments
      propertyFacilities
      breakfastIncluded
      parkingIncluded
      hotelStaffLanguages
      checkInTimeFrom
      propertyStatus
      checkInTimeUntill
      propertyImages
      checkOutTimeFrom
      checkOutTimeUntill
      allowChildren
      allowPets
      createdAt
      updatedAt
      propertyRooms {
        roomId
        roomType
        roomPricePerNight
        numberOfGuestsCanStay
        roomFacilities
        availableBathroomFacilities
        isBathroomPrivate
        isSmokingAllowed
        roomName
        availableBeds {
          single
          double
          king
          superKing
        }
        reservedDates {
          userId
          from
          until
        }
      }
    }
  }
`;

export const GET_VISITED_PROPERTIES = gql`
  query GetVisitedProperties($input: OrdinaryInquery!) {
    getVisitedProperties(input: $input) {
      list {
        _id
        partnerId
        propertyType
        propertyCountry
        propertyRegion
        propertyCity
        propertyPostCode
        propertyName
        propertyStars
        propertyViews
        propertyComments
        propertyFacilities
        breakfastIncluded
        parkingIncluded
        hotelStaffLanguages
        checkInTimeFrom
        propertyStatus
        checkInTimeUntill
        propertyImages
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
