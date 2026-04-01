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

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      _id
      guestName
      accessToken
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount {
      _id
      guestStatus
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
      partnerType
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
      partnerType
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
      reservedDates {
        userId
        from
        until
      }
      roomPropertyLocation
    }
  }
`;

export const UPDATE_PARTNER_PROPERTY = gql`
  mutation UpdatePartnerProperty($input: PartnerPropertyUpdate!) {
    updatePartnerProperty(input: $input) {
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
      }
    }
  }
`;

export const LIKE_TARGET_PROPERTY = gql`
  mutation LikeTargetProperty($input: String!) {
    likeTargetProperty(propertyId: $input) {
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
    }
  }
`;

export const LIKE_TARGET_ATTRACTION = gql`
  mutation LikeTargetAttraction($input: String!) {
    likeTargetAttraction(attractionId: $input) {
      _id
      attractionName
      attractionLikes
    }
  }
`;

export const CREATE_ATTRACTION_PAYMENT_INTENT = gql`
  mutation CreateAttractionPaymentIntent(
    $input: CreateAttractionPaymentIntentInput!
  ) {
    createAttractionPaymentIntent(input: $input)
  }
`;

export const ADD_ATTRACTION_RESERVATION = gql`
  mutation AddAttractionReservation($input: AttractionReservationInput!) {
    addAttractionReservation(input: $input) {
      _id
      guestId
      attractionId
      guestName
      guestEmail
      ticketCount
      selectedDate
      selectedTime
      paymentStatus
      paymentAmount
      createdAt
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {
    createPaymentIntent(input: $input)
  }
`;

export const ADD_RESERVATION_INFO = gql`
  mutation AddReservationInfo($input: ReservationInfoInput!) {
    addReservationInfo(input: $input) {
      _id
      guestId
      guestName
      guestLastName
      guestEmail
      guestPhoneNumber
      travelForWork
      stripePaymentIntentId
      paymentStatus
      paymentAmount
      roomId
      propertyId
      ageConfirmation
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
      _id
      commentStatus
      commentContent
      commentRefId
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: String!) {
    likeComment(commentId: $commentId) {
      _id
      commentScore
      commentLikes
      commentDislikes
      likedBy
      dislikedBy
    }
  }
`;

export const DISLIKE_COMMENT = gql`
  mutation DislikeComment($commentId: String!) {
    dislikeComment(commentId: $commentId) {
      _id
      commentScore
      commentLikes
      commentDislikes
      likedBy
      dislikedBy
    }
  }
`;

export const UPDATE_PARTNER_PROPERTY_ROOM = gql`
  mutation UpdatePartnerPropertyRoom($input: PartnerPropertyRoomUpdate!) {
    updatePartnerPropertyRoom(input: $input) {
      _id
      roomType
      roomName
      roomPricePerNight
      numberOfGuestsCanStay
      isSmokingAllowed
      isBathroomPrivate
      roomFacilities
      availableBathroomFacilities
    }
  }
`;

export const DELETE_PARTNER_PROPERTY_ROOM = gql`
  mutation DeletePartnerPropertyRoom($roomId: String!) {
    deletePartnerPropertyRoom(roomId: $roomId) {
      _id
    }
  }
`;

/**************************
 *       ATTRACTIONS      *
 *************************/

export const CREATE_ATTRACTION = gql`
  mutation CreateAttraction($input: AttractionInput!) {
    createAttraction(input: $input) {
      _id
      partnerId
      attractionType
      attractionName
      attractionDescription
      attractionCountry
      attractionRegion
      attractionCity
      attractionImages
      attractionAdultPrice
      attractionChildPrice
      attractionDuration
      attractionHighlights
      attractionIncludes
      attractionExcludes
      faqItems {
        question
        answer
      }
      maxParticipants
      freeCancellation
      attractionStatus
      attractionViews
      attractionLikes
      totalReviews
      averageRating
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ATTRACTION = gql`
  mutation UpdateAttraction($input: AttractionUpdate!) {
    updateAttraction(input: $input) {
      _id
      partnerId
      attractionType
      attractionName
      attractionDescription
      attractionCountry
      attractionRegion
      attractionCity
      attractionImages
      attractionAdultPrice
      attractionChildPrice
      attractionDuration
      attractionHighlights
      attractionIncludes
      attractionExcludes
      faqItems {
        question
        answer
      }
      maxParticipants
      freeCancellation
      attractionStatus
      attractionViews
      attractionLikes
      totalReviews
      averageRating
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ATTRACTION = gql`
  mutation DeleteAttraction($attractionId: String!) {
    deleteAttraction(attractionId: $attractionId) {
      _id
    }
  }
`;

export const SUBMIT_REVIEW = gql`
  mutation SubmitReview($input: ReviewInput!) {
    submitReview(input: $input) {
      _id
      reviewRefId
      memberId
      staffRating
      facilitiesRating
      cleanlessRating
      comfortRating
      valueOfMoneyRating
      locationRating
      freeWiFiRating
      createdAt
      updatedAt
    }
  }
`;
