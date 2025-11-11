import React, { useEffect, useState } from "react";
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
import { useQuery } from "@apollo/client";
import { GET_GUEST_PROFILE } from "@/apollo/user/query";
import { Guest } from "@/src/libs/types/guest";
import { T } from "@/src/libs/types/common";

const MyAccount = () => {
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editNationality, setEditNationality] = useState(false);
  const [editGender, setEditGender] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [member, setMember] = useState<Guest | null>(null);
  const { guestId } = router.query;

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
    onCompleted: (data: T) => {
      setMember(data?.getGuestProfile);
    },
  });
  console.log("member", member);
  useEffect(() => {
    getGuestRefetch({ input: guestId });
  }, [guestId]);
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
              src="/img/logo/uniface.jpg"
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
              <ImageUploaderMenu open={open} handleClose={handleClose} />
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
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  gap={2}
                >
                  <Stack>
                    <TextField
                      label="Last name"
                      id="outlined-size-small"
                      defaultValue="Last name"
                      size="small"
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      label="First name"
                      id="outlined-size-small"
                      defaultValue="First name"
                      size="small"
                    />
                  </Stack>
                </Stack>
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
                  <Button variant="outlined">
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
                  />
                </Stack>
              </Grid>
            ) : (
              <Grid item xs={6}>
                <Typography>{member?.guestEmail}</Typography>
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
                  <Button variant="outlined">
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
                  <Button variant="outlined">
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
                  <Button variant="outlined">
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

export default withLayoutAttractionsReserve(MyAccount);
