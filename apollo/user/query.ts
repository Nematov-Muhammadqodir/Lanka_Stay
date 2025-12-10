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
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
      propertyLikes
      totalReviews
      staffRating
      facilitiesRating
      cleanlessRating
      comfortRating
      valueOfMoneyRating
      locationRating
      freeWiFiRating
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
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_PARTNER_PROPERTY_ROOM = gql`
  query GetPartnerPropertyRoom($input: String!) {
    getPartnerPropertyRoom(roomId: $input) {
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
      roomPropertyLocation
      createdAt
      updatedAt
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
`;

export const GET_LIKED_PROPERTIES = gql`
  query GetLikedProperties($input: OrdinaryInquery!) {
    getLikedProperties(input: $input) {
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
        propertyLikes
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
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_RESERVED_ROOMS = gql`
  query GetReservedRooms($input: OrdinaryInquery!) {
    getReservedRooms(input: $input) {
      metaCounter {
        total
      }
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
        propertyLikes
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
        roomData {
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
          roomPropertyLocation
          createdAt
          updatedAt
        }
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
        reservationData {
          _id
          guestId
          guestName
          guestLastName
          guestEmail
          guestPhoneNumber
          travelForWork
          cardholderName
          cardNumber
          expiryDate
          cvs
          roomId
          propertyId
          startDate
          endDate
          ageConfirmation
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($input: CommentsInquiry!) {
    getComments(input: $input) {
      list {
        _id
        commentStatus
        commentContent
        commentRefId
        memberId
        createdAt
        updatedAt
        memberData {
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
        reservationData {
          _id
          guestId
          guestName
          guestLastName
          guestEmail
          guestPhoneNumber
          travelForWork
          cardholderName
          cardNumber
          expiryDate
          cvs
          roomId
          propertyId
          startDate
          endDate
          ageConfirmation
          createdAt
          updatedAt
        }
        propertyData {
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
          propertyLikes
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
          totalReviews
          staffRating
          facilitiesRating
          cleanlessRating
          comfortRating
          valueOfMoneyRating
          locationRating
          freeWiFiRating
        }
        roomData {
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
          roomPropertyLocation
          createdAt
          updatedAt
          reservedDates {
            userId
            from
            until
          }
          availableBeds {
            single
            double
            king
            superKing
          }
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
