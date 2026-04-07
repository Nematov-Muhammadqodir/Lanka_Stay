import React, { useCallback, useEffect, useState } from "react";
import withLayoutAttractionsReserve from "@/src/libs/components/layout/attractions/AttractionReserveLayout";
import {
  Box,
  Button,
  Grid,
  Input,
  Menu,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ImageUploaderMenu from "@/src/libs/components/myAccount/ImageUploaderMenu";
import { CountryDropdown } from "react-country-region-selector";
import { useRouter } from "next/router";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { GET_GUEST_PROFILE } from "@/apollo/user/query";
import { Guest } from "@/src/libs/types/member/guest";
import { T } from "@/src/libs/types/common";
import { UpdateGuestProfile } from "@/src/libs/types/member/guest.update";
import { UPDATE_GUEST } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { Messages, REACT_APP_API_URL } from "@/src/libs/config";
import { getJwtToken, updateStorage, updateUserInfo } from "@/src/libs/auth";
import {
  sweetErrorHandling,
  sweetMixinSuccessAlert,
} from "@/src/libs/sweetAlert";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MyAccount = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [country, setCountry] = useState("");
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editNationality, setEditNationality] = useState(false);
  const [editGender, setEditGender] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [member, setMember] = useState<Guest | null>(null);
  const guestId = router.query.id as string;
  const [updateData, setUpdateData] = useState<UpdateGuestProfile>({
    _id: member?._id || "",
    guestName: member?.guestName || "",
    guestEmail: member?.guestEmail || "",
    guestImage: member?.guestImage || "",
    guestPhone: member?.guestPhone || "",
    guestCountry: member?.guestCountry || "" || "",
  });
  const token = getJwtToken();

  /** UPDATE_GUEST APOLLO REQUESTS **/
  const [updateGuest] = useMutation(UPDATE_GUEST);

  /** APOLLO REQUESTS **/
  const {
    loading: getGuestLoading,
    data: getGuestData,
    error: getGuestError,
    refetch: getGuestRefetch,
  } = useQuery(GET_GUEST_PROFILE, {
    fetchPolicy: "network-only",
    variables: { input: guestId },
    skip: !guestId,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (getGuestData) {
      console.log("getGuestData", getGuestData);
      setMember(getGuestData?.getGuestProfile);
    }
  }, [getGuestData]);

  /** LIFECYCLES **/
  useEffect(() => {
    setUpdateData({
      ...updateData,
      guestName: member?.guestName,
      guestPhone: member?.guestPhone,
      guestEmail: member?.guestEmail,
      guestCountry: member?.guestCountry,
      guestImage: member?.guestImage,
    });
  }, [user]);
  console.log("updateData", updateData);

  useEffect(() => {
    getGuestRefetch({ input: guestId });
  }, [guestId]);

  const updateGuestProfileHandler = useCallback(async () => {
    try {
      if (!user._id) throw new Error(Messages.error2);
      updateData._id = user._id;
      console.log("updateData updateProductHandler", updateData);
      const result = await updateGuest({
        variables: {
          input: updateData,
        },
      });

      //@ts-ignore
      const jwtToken = result.data.updateGuest?.accessToken;
      await updateStorage({ jwtToken });
      updateUserInfo(result.data.updateGuest?.accessToken);
      setEditName(false);
      setEditEmail(false);
      setEditPhoneNumber(false);
      setEditNationality(false);
      getGuestRefetch({ input: guestId });
      await sweetMixinSuccessAlert("Information updated successfully!");
    } catch (err: any) {
      console.log("Error, updateProfileHandler", err);
      sweetErrorHandling(err).then();
    }
  }, [updateData]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleEdit = (value: string) => {
    if (value === "name") {
      setEditName(!editName);
    } else if (value === "email") {
      setEditEmail(!editEmail);
    } else if (value === "phoneNumber") {
      setEditPhoneNumber(!editPhoneNumber);
    } else if (value === "nationality") {
      setEditNationality(!editNationality);
    } else if (value === "gender") {
      setEditGender(!editGender);
    } else {
      return null;
    }
  };

  const onChangeCountry = (val: any) => {
    console.log("val", val);
    setCountry(val);

    setUpdateData({ ...updateData, guestCountry: val });
  };

  const uploadImage = async (file: File) => {
    try {
      console.log("+image:", file);

      const formData = new FormData();
      formData.append(
        "operations",
        JSON.stringify({
          query: `mutation ImageUploader($file: Upload!, $target: String!) {
            imageUploader(file: $file, target: $target) 
          }`,
          variables: {
            file: null,
            target: "member",
          },
        })
      );
      formData.append(
        "map",
        JSON.stringify({
          "0": ["variables.file"],
        })
      );
      formData.append("0", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_GRAPHQL_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "apollo-require-preflight": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseImage = response.data.data.imageUploader;
      console.log("+responseImage: ", responseImage);

      const updated = { ...updateData, guestImage: responseImage };
      setUpdateData(updated);

      // 🔥 Immediately update on backend

      const result = await updateGuest({
        variables: {
          input: {
            ...updated,
            _id: user._id,
          },
        },
      });
      const jwtToken = result.data.updateGuest?.accessToken;
      if (jwtToken) {
        await updateStorage({ jwtToken });
        updateUserInfo(jwtToken); // This updates the userVar
      }
      getGuestRefetch({ input: guestId });
    } catch (err) {
      console.log("Error, uploadImage:", err);
    }
  };

  return (
    <Stack className="container" alignItems={"center"}>
      <Stack px={10} py={5} width={900} mb={10}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderBottom={"1px solid"}
          pb={2}
          borderColor={"text.disabled"}
        >
          <Stack>
            <Typography variant="h3" fontWeight={699}>
              Personal details
            </Typography>
            <Typography variant="h6">
              Update your information and find out how it's used.
            </Typography>
          </Stack>
          <Button
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Image
              src={
                member?.guestImage
                  ? `${REACT_APP_API_URL}/${member?.guestImage}`
                  : `/img/logo/uniface.jpg`
              }
              alt="user-image"
              width={70}
              height={70}
              style={{
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "#FFB700",
              }}
            />
          </Button>
          <Menu
            anchorReference="none"
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              width: 800,
              height: 720,
              justifySelf: "center",
              alignSelf: "center",
              borderRadius: 4,
            }}
          >
            <Stack>
              <ImageUploaderMenu
                open={open}
                handleClose={handleClose}
                uploadImage={uploadImage}
                guestImage={member?.guestImage || ""}
              />
            </Stack>
          </Menu>
        </Stack>

        <Stack mt={1} px={2}>
          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Name</Typography>
            </Grid>
            {editName ? (
              <Grid item xs={6}>
                <TextField
                  label={member?.guestName || "Your Name"}
                  id="outlined-size-small"
                  defaultValue={member?.guestName || "Your Name"}
                  size="small"
                  onChange={({ target: { value } }) =>
                    setUpdateData({ ...updateData, guestName: value })
                  }
                />
              </Grid>
            ) : (
              <Grid item xs={6}>
                <Typography>{member?.guestName}</Typography>
              </Grid>
            )}

            <Grid item xs={2} textAlign="right">
              {editName ? (
                <Stack justifyContent={"space-between"} gap={4}>
                  <Button onClick={() => handleToggleEdit("name")}>
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Cancel
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={updateGuestProfileHandler}
                  >
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Save
                    </Typography>
                  </Button>
                </Stack>
              ) : (
                <Button onClick={() => handleToggleEdit("name")}>
                  <Typography
                    className="bold-text-medium"
                    sx={{ color: "primary.main", textTransform: "capitalize" }}
                  >
                    Edit
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">
                Email address
              </Typography>
            </Grid>

            {editEmail ? (
              <Grid item xs={6}>
                <Stack>
                  <TextField
                    label={member?.guestEmail || "Email address"}
                    id="outlined-size-small"
                    defaultValue={member?.guestEmail || "Email address"}
                    size="small"
                    onChange={({ target: { value } }) =>
                      setUpdateData({ ...updateData, guestEmail: value })
                    }
                  />
                </Stack>
              </Grid>
            ) : (
              <Grid item xs={6}>
                {member?.guestEmail ? (
                  <Typography>{member.guestEmail}</Typography>
                ) : (
                  <Typography>Add your email address</Typography>
                )}
              </Grid>
            )}

            <Grid item xs={2} textAlign="right">
              {editEmail ? (
                <Stack justifyContent={"space-between"} gap={4}>
                  <Button onClick={() => handleToggleEdit("email")}>
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Cancel
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={updateGuestProfileHandler}
                  >
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Save
                    </Typography>
                  </Button>
                </Stack>
              ) : (
                <Button onClick={() => handleToggleEdit("email")}>
                  <Typography
                    className="bold-text-medium"
                    sx={{ color: "primary.main", textTransform: "capitalize" }}
                  >
                    Edit
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Phone number</Typography>
            </Grid>

            {editPhoneNumber ? (
              <Grid item xs={6}>
                <TextField
                  label={member?.guestPhone || "Phone number"}
                  id="outlined-size-small"
                  defaultValue={member?.guestPhone || "Phone number"}
                  size="small"
                  onChange={({ target: { value } }) =>
                    setUpdateData({ ...updateData, guestPhone: value })
                  }
                />
              </Grid>
            ) : (
              <Grid item xs={6}>
                {member?.guestPhone ? (
                  <Typography>{member.guestPhone}</Typography>
                ) : (
                  <Typography>Add your phone number</Typography>
                )}

                <Typography className="small-text" color={"primary.main"}>
                  Properties or attractions you book will use this number if
                  they need to contact you.
                </Typography>
              </Grid>
            )}
            <Grid item xs={2} textAlign="right">
              {editPhoneNumber ? (
                <Stack justifyContent={"space-between"} gap={4}>
                  <Button onClick={() => handleToggleEdit("phoneNumber")}>
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Cancel
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={updateGuestProfileHandler}
                  >
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Save
                    </Typography>
                  </Button>
                </Stack>
              ) : (
                <Button onClick={() => handleToggleEdit("phoneNumber")}>
                  <Typography
                    className="bold-text-medium"
                    sx={{ color: "primary.main", textTransform: "capitalize" }}
                  >
                    Edit
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Nationality</Typography>
            </Grid>

            {editNationality ? (
              <Grid item xs={6}>
                <CountryDropdown
                  value={country}
                  onChange={onChangeCountry}
                  style={{
                    padding: 10,
                    fontSize: 20,
                    borderRadius: 10,
                    borderColor: "#D2D2D2",
                    width: 300,
                  }}
                />
              </Grid>
            ) : (
              <Grid item xs={6}>
                {member?.guestCountry ? (
                  <Typography>{member?.guestCountry}</Typography>
                ) : (
                  <Typography>Select the country/region you're from</Typography>
                )}
              </Grid>
            )}

            <Grid item xs={2} textAlign="right">
              {editNationality ? (
                <Stack justifyContent={"space-between"} gap={4}>
                  <Button onClick={() => handleToggleEdit("nationality")}>
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Cancel
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={updateGuestProfileHandler}
                  >
                    <Typography
                      className="bold-text-medium"
                      sx={{
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      Save
                    </Typography>
                  </Button>
                </Stack>
              ) : (
                <Button onClick={() => handleToggleEdit("nationality")}>
                  <Typography
                    className="bold-text-medium"
                    sx={{ color: "primary.main", textTransform: "capitalize" }}
                  >
                    Edit
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            borderBottom={"1px solid"}
            pb={2}
            borderColor={"text.disabled"}
            mt={1}
          >
            <Grid item xs={4}>
              <Typography className="bold-text-medium">Gender</Typography>
            </Grid>
            <Grid item xs={6}>
              {member?.guestGender ? (
                <Typography>{member.guestGender}</Typography>
              ) : (
                <Typography>Select your gender</Typography>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default withLayoutAttractionsReserve(MyAccount);
