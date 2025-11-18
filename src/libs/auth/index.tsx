import decodeJWT from "jwt-decode";
import { initializeApollo } from "@/apollo/client";
import { partnerVar, userVar } from "@/apollo/store";
import {
  CustomJwtPartnerPayload,
  CustomJwtPayload,
} from "../types/customJwtPayload";
import { sweetMixinErrorAlert } from "../sweetAlert";
import {
  GUEST_LOGIN,
  GUEST_SIGN_UP,
  PARTNER_LOGIN,
  PARTNER_SIGNUP,
} from "@/apollo/user/mutation";

export function getJwtToken(): any {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") ?? "";
  }
}

export function getPartnerJwtToken(): any {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessPartnerToken") ?? "";
  }
}

export function setJwtToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function setPartnerJwtToken(token: string) {
  localStorage.setItem("accessPartnerToken", token);
}

export const logIn = async (email: string, password: string): Promise<void> => {
  try {
    const { jwtToken } = await requestJwtToken({ email, password });

    if (jwtToken) {
      updateStorage({ jwtToken });
      updateUserInfo(jwtToken);
    }
  } catch (err) {
    console.warn("login err", err);
    logOut();
    // throw new Error('Login Err');
  }
};

export const logInPartner = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const { jwtToken } = await requestPartnerJwtToken({ email, password });

    if (jwtToken) {
      updatePartnerStorage({ jwtToken });
      updatePartnerInfo(jwtToken);
    }
  } catch (err) {
    console.warn("loginPartner err", err);
    logOutPartner();
    // throw new Error('Login Err');
  }
};

const requestJwtToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ jwtToken: string }> => {
  const apolloClient = await initializeApollo();
  console.log("apolloClint", apolloClient);
  try {
    const result = await apolloClient.mutate({
      mutation: GUEST_LOGIN,
      variables: { input: { guestEmail: email, guestPassword: password } },
      fetchPolicy: "network-only",
    });

    console.log("---------- login ----------");
    const { accessToken } = result?.data?.guestLogin;

    return { jwtToken: accessToken };
  } catch (err: any) {
    console.log("request token err", err.graphQLErrors);
    switch (err.graphQLErrors[0].message) {
      case "Definer: login and password do not match":
        await sweetMixinErrorAlert("Please check your password again");
        break;
      case "Definer: user has been blocked!":
        await sweetMixinErrorAlert("User has been blocked!");
        break;
    }
    throw new Error("token error");
  }
};

const requestPartnerJwtToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ jwtToken: string }> => {
  const apolloClient = await initializeApollo();
  console.log("apolloClint", apolloClient);
  try {
    const result = await apolloClient.mutate({
      mutation: PARTNER_LOGIN,
      variables: { input: { partnerEmail: email, partnerPassword: password } },
      fetchPolicy: "network-only",
    });

    console.log("---------- login ----------");
    const { accessToken } = result?.data?.partnerLogin;

    return { jwtToken: accessToken };
  } catch (err: any) {
    console.log("request token err", err.graphQLErrors);
    switch (err.graphQLErrors[0].message) {
      case "Definer: login and password do not match":
        await sweetMixinErrorAlert("Please check your password again");
        break;
      case "Definer: user has been blocked!":
        await sweetMixinErrorAlert("User has been blocked!");
        break;
    }
    throw new Error("token error");
  }
};

export const signUp = async (
  name: string,
  email: string,
  phone_number: string,
  password: string,
  user_role: string,
  gender: string,
  guest_type: string,
  country: string,
  region: string
): Promise<void> => {
  try {
    const { jwtToken } = await requestSignUpJwtToken({
      name,
      email,
      phone_number,
      password,
      user_role,
      gender,
      guest_type,
      country,
      region,
    });

    if (jwtToken) {
      updateStorage({ jwtToken });
      updateUserInfo(jwtToken);
    }
  } catch (err) {
    console.warn("login err", err);
    logOut();
    // throw new Error('Login Err');
  }
};

export const signUpPartner = async (
  partnerEmail: string,
  partnerFirstName: string,
  partnerLastName: string,
  partnerPhoneNumber: string,
  partnerPassword: string,
  userRole: string
): Promise<void> => {
  try {
    const { jwtToken } = await requestPartnerSignUpJwtToken({
      partnerEmail,
      partnerFirstName,
      partnerLastName,
      partnerPhoneNumber,
      partnerPassword,
      userRole,
    });

    if (jwtToken) {
      updatePartnerStorage({ jwtToken });
      updatePartnerInfo(jwtToken);
    }
  } catch (err) {
    console.warn("logOutPartner err", err);
    logOutPartner();
    // throw new Error('Login Err');
  }
};

const requestSignUpJwtToken = async ({
  name,
  email,
  phone_number,
  password,
  user_role,
  gender,
  guest_type,
  country,
  region,
}: {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  user_role: string;
  gender: string;
  guest_type: string;
  country: string;
  region: string;
}): Promise<{ jwtToken: string }> => {
  const apolloClient = await initializeApollo();
  console.log("apolloClint", apolloClient);
  // console.log('inputs', nick, password, phone, type);
  try {
    const result = await apolloClient.mutate({
      mutation: GUEST_SIGN_UP,
      variables: {
        input: {
          guestName: name,
          guestEmail: email,
          guestPhone: phone_number,
          guestPassword: password,
          guestGender: gender,
          guestType: guest_type,
          guestCountry: country,
          guestRegion: region,
        },
      },
      fetchPolicy: "network-only",
    });

    console.log("---------- login ----------");
    const { accessToken } = result?.data?.guestSignup;

    return { jwtToken: accessToken };
  } catch (err: any) {
    console.log("request token err", err.graphQLErrors);
    switch (err.graphQLErrors[0].message) {
      case "Definer: login and password do not match":
        await sweetMixinErrorAlert("Please check your password again");
        break;
      case "Definer: user has been blocked!":
        await sweetMixinErrorAlert("User has been blocked!");
        break;
    }
    throw new Error("token error");
  }
};

const requestPartnerSignUpJwtToken = async ({
  partnerEmail,
  partnerFirstName,
  partnerLastName,
  partnerPhoneNumber,
  partnerPassword,
  userRole,
}: {
  partnerEmail: string;
  partnerFirstName: string;
  partnerLastName: string;
  partnerPhoneNumber: string;
  partnerPassword: string;
  userRole: string;
}): Promise<{ jwtToken: string }> => {
  const apolloClient = await initializeApollo();
  console.log("apolloClint", apolloClient);
  // console.log('inputs', nick, password, phone, type);
  try {
    const result = await apolloClient.mutate({
      mutation: PARTNER_SIGNUP,
      variables: {
        input: {
          partnerEmail: partnerEmail,
          partnerFirstName: partnerFirstName,
          partnerLastName: partnerLastName,
          partnerPhoneNumber: partnerPhoneNumber,
          partnerPassword: partnerPassword,
          userRole: userRole,
        },
      },
      fetchPolicy: "network-only",
    });

    console.log("---------- login ----------");
    const { accessToken } = result?.data?.partnerSignup;

    return { jwtToken: accessToken };
  } catch (err: any) {
    console.log("request token err", err.graphQLErrors);
    switch (err.graphQLErrors[0].message) {
      case "Definer: login and password do not match":
        await sweetMixinErrorAlert("Please check your password again");
        break;
      case "Definer: user has been blocked!":
        await sweetMixinErrorAlert("User has been blocked!");
        break;
    }
    throw new Error("token error");
  }
};

export const updateStorage = ({ jwtToken }: { jwtToken: any }) => {
  setJwtToken(jwtToken);
  window.localStorage.setItem("login", Date.now().toString());
};

export const updatePartnerStorage = ({ jwtToken }: { jwtToken: any }) => {
  setPartnerJwtToken(jwtToken);
  window.localStorage.setItem("loginPartner", Date.now().toString());
};

export const updateUserInfo = (jwtToken: any) => {
  if (!jwtToken) return false;

  const claims = decodeJWT<CustomJwtPayload>(jwtToken);
  userVar({
    _id: claims._id ?? "",
    guestType: claims.guestType ?? "",
    guestStatus: claims.guestStatus ?? "",
    guestAuthType: claims.guestAuthType,
    guestPhone: claims.guestPhone ?? "",
    guestGender: claims.guestGender ?? "",
    guestEmail: claims.guestEmail ?? "",
    guestName: claims.guestName ?? "",
    guestFullName: claims.guestFullName ?? "",
    guestImage:
      claims.guestImage === null || claims.guestImage === undefined
        ? "/img/Villa.jpg"
        : `${claims.guestImage}`,
    guestCountry: claims.guestCountry ?? "",
    guestRegion: claims.guestRegion ?? "",
    guestPoints: claims.guestPoints,
    userRole: claims.userRole ?? "",
  });
};

export const updatePartnerInfo = (jwtToken: any) => {
  if (!jwtToken) return false;

  const claimsPartner = decodeJWT<CustomJwtPartnerPayload>(jwtToken);
  partnerVar({
    _id: claimsPartner._id ?? "",
    partnerEmail: claimsPartner.partnerEmail ?? "",
    partnerFirstName: claimsPartner.partnerFirstName ?? "",
    partnerLastName: claimsPartner.partnerLastName ?? "",
    partnerPhoneNumber: claimsPartner.partnerPhoneNumber ?? "",
    partnerPassword: claimsPartner.partnerPassword ?? "",
    userRole: claimsPartner.userRole ?? "",
    memberStatus: claimsPartner.memberStatus ?? "",
  });
};

export const logOut = () => {
  deleteStorage();
  deleteUserInfo();
  // window.location.reload();
};
export const logOutPartner = () => {
  deleteParterStorage();
  deletePartnerInfo();
  // window.location.reload();
};

const deleteStorage = () => {
  localStorage.removeItem("accessToken");
  window.localStorage.setItem("logout", Date.now().toString());
};

const deleteParterStorage = () => {
  localStorage.removeItem("accessPatnerToken");
  window.localStorage.setItem("logoutPartner", Date.now().toString());
};

const deleteUserInfo = () => {
  userVar({
    _id: "",
    guestType: "",
    guestStatus: "",
    guestAuthType: "",
    guestPhone: "",
    guestGender: "",
    guestName: "",
    guestEmail: "",
    guestFullName: "",
    guestImage: "",
    guestCountry: "",
    guestRegion: "",
    guestPoints: 0,
    userRole: "",
  });
};

const deletePartnerInfo = () => {
  partnerVar({
    _id: "",
    partnerEmail: "",
    partnerFirstName: "",
    partnerLastName: "",
    partnerPhoneNumber: "",
    partnerPassword: "",
    userRole: "",
    memberStatus: "",
  });
};
