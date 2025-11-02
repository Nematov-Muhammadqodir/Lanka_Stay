import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useRouter } from "next/router";

type Inputs = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

const CreateAccount = () => {
  const router = useRouter();
  const [signUp, setSignUp] = useState(true);
  const [signUpStage, setSignUpStage] = useState("createPassword");
  // email, contactDetails, createPassword
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("email"));
  return (
    <Stack>
      {signUp ? (
        <Stack className="container">
          <Stack
            className="create-account-main-container"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            {signUpStage === "email" ? (
              <Stack>
                <Stack
                  sx={{ width: 399, gap: 2, borderBottom: "1px solid", pb: 5 }}
                >
                  <Stack sx={{ gap: 1, textAlign: "start" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 25 }}>
                      Create your partner account
                    </Typography>
                    <Typography sx={{ fontSize: 16 }}>
                      Create an account to list and manage your property.
                    </Typography>
                  </Stack>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack alignItems={"start"} className="form" gap={2}>
                      <Stack>
                        <Typography className="small-bold-text">
                          Email address
                        </Typography>
                        <TextField
                          sx={{ width: 399 }}
                          {...register("email")}
                          required={true}
                        />
                      </Stack>

                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          width: "100%",
                          height: 50,
                          backgroundColor: "#086CE4",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          fontSize: 18,
                          color: "white",
                        }}
                      >
                        Continue
                      </Button>
                    </Stack>
                  </form>
                </Stack>
                <Stack sx={{ mt: 3, gap: 1 }}>
                  <Stack sx={{ gap: 1, borderBottom: "1px solid", pb: 3 }}>
                    <Typography>Do you have an account?</Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "399px",
                        height: 50,
                        color: "#086CE4",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        fontSize: 18,
                      }}
                      onClick={() => setSignUp(false)}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <Stack width={399} gap={2}>
                    <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                      By signing in or creating an account, you agree with our
                      Terms & conditions and Privacy statement
                    </Typography>
                    <Stack>
                      <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                        All rights reserved.
                      </Typography>
                      <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                        Copyright (2025) - LankaStay.com™
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            ) : signUpStage === "contactDetails" ? (
              <Stack>
                <Stack
                  sx={{ width: 399, gap: 2, borderBottom: "1px solid", pb: 5 }}
                >
                  <Stack sx={{ gap: 1, textAlign: "start" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 25 }}>
                      Contact details
                    </Typography>
                    <Typography sx={{ fontSize: 16 }}>
                      Your full name and phone number are needed to ensure the
                      security of your LankaStay.com account.
                    </Typography>
                  </Stack>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack alignItems={"start"} className="form" gap={2}>
                      <Stack>
                        <Typography className="small-bold-text">
                          First name
                        </Typography>
                        <TextField
                          sx={{ width: 399 }}
                          {...register("first_name")}
                          required={true}
                        />
                      </Stack>
                      <Stack>
                        <Typography className="small-bold-text">
                          Last name
                        </Typography>
                        <TextField
                          sx={{ width: 399 }}
                          {...register("last_name")}
                          required={true}
                        />
                      </Stack>

                      <Stack gap={1}>
                        <Typography sx={{ fontWeight: 500 }}>
                          Phone No
                        </Typography>

                        <Box
                          sx={{
                            width: 400, // controls total width
                            "--react-international-phone-border-radius": "2px",
                            "--react-international-phone-height": "52px",
                            "--react-international-phone-background-color":
                              "white",
                            "--react-international-phone-border-color":
                              "#D2D2D2",
                            "--react-international-phone-font-size": "16px",
                            "--react-international-phone-text-color": "#000",
                            "& .react-international-phone-input": {
                              width: "100%", // ✅ makes input match the box width
                            },
                            "& .react-international-phone-country-selector-button":
                              {
                                borderTopLeftRadius: "2px",
                                borderBottomLeftRadius: "2px",
                              },
                          }}
                        >
                          <PhoneInput
                            defaultCountry="ua"
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                            style={{ width: "399px" }}
                          />
                        </Box>
                      </Stack>

                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          width: "100%",
                          height: 50,
                          backgroundColor: "#086CE4",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          fontSize: 18,
                          color: "white",
                        }}
                        onClick={() => setSignUpStage("createPassword")}
                      >
                        Next
                      </Button>
                    </Stack>
                  </form>
                </Stack>
                <Stack sx={{ mt: 3, gap: 1 }}>
                  <Stack sx={{ gap: 1, borderBottom: "1px solid", pb: 3 }}>
                    <Typography>Do you have an account?</Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "399px",
                        height: 50,
                        color: "#086CE4",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        fontSize: 18,
                      }}
                      onClick={() => setSignUp(false)}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <Stack width={399} gap={2}>
                    <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                      By signing in or creating an account, you agree with our
                      Terms & conditions and Privacy statement
                    </Typography>
                    <Stack>
                      <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                        All rights reserved.
                      </Typography>
                      <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                        Copyright (2025) - LankaStay.com™
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            ) : (
              <Stack position={"fixed"} top={"20%"}>
                <Stack
                  sx={{ width: 399, gap: 2, borderBottom: "1px solid", pb: 5 }}
                >
                  <Stack sx={{ gap: 1, textAlign: "start" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                      Create password
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      Use a minimum of 10 characters, including uppercase
                      letters, lowercase letters and numbers.
                    </Typography>
                  </Stack>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack alignItems={"start"} className="form" gap={2}>
                      <Stack>
                        <Typography className="small-bold-text">
                          Password *
                        </Typography>
                        <TextField
                          sx={{ width: 399 }}
                          {...register("password")}
                          required={true}
                          placeholder="Password"
                        />
                      </Stack>
                      <Stack>
                        <Typography className="small-bold-text">
                          Confirm password *
                        </Typography>
                        <TextField
                          sx={{ width: 399 }}
                          required={true}
                          placeholder="Confirm password"
                        />
                      </Stack>

                      <Stack gap={2}>
                        <FormControlLabel
                          required
                          control={
                            <Checkbox sx={{ alignSelf: "start", pr: 2 }} />
                          }
                          label="I confirm that I am over the age of 14 and I consent to the mandatory collection and use of my personal information as well as my dependent child (ren)'s personal information (where applicable) as described in the Booking.com"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: 14,
                              lineHeight: 1.4,
                            },
                          }}
                        />
                      </Stack>

                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          width: "100%",
                          height: 50,
                          backgroundColor: "#086CE4",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          fontSize: 18,
                          color: "white",
                        }}
                        onClick={() =>
                          router.push("/register-property/add-new-property")
                        }
                      >
                        Create account
                      </Button>
                    </Stack>
                  </form>
                </Stack>
                <Stack sx={{ mt: 2, gap: 1 }}>
                  <Stack width={399} gap={1}>
                    <Typography sx={{ fontSize: 12, textAlign: "center" }}>
                      By signing in or creating an account, you agree with our
                      Terms & conditions and Privacy statement
                    </Typography>
                    <Stack>
                      <Typography sx={{ fontSize: 12, textAlign: "center" }}>
                        All rights reserved.
                      </Typography>
                      <Typography sx={{ fontSize: 12, textAlign: "center" }}>
                        Copyright (2025) - LankaStay.com™
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      ) : (
        <Stack className="container">
          <Stack
            className="create-account-main-container"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            <Stack
              sx={{ width: 399, gap: 2, borderBottom: "1px solid", pb: 5 }}
            >
              <Stack sx={{ gap: 1, textAlign: "start" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 25 }}>
                  Sign in to manage your property
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack alignItems={"start"} className="form" gap={2}>
                  <Stack>
                    <Typography className="small-bold-text">
                      Email address
                    </Typography>
                    <TextField
                      sx={{ width: 399 }}
                      {...register("email")}
                      required={true}
                    />
                  </Stack>
                  <Stack>
                    <Typography className="small-bold-text">
                      Password
                    </Typography>
                    <TextField
                      sx={{ width: 399 }}
                      {...register("password")}
                      required={true}
                    />
                  </Stack>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "100%",
                      height: 50,
                      backgroundColor: "#086CE4",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Stack sx={{ mt: 3, gap: 1 }}>
              <Stack sx={{ gap: 1, borderBottom: "1px solid", pb: 3 }}>
                <Typography>Do you have an account?</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: "399px",
                    height: 50,
                    color: "#086CE4",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: 18,
                  }}
                  onClick={() => setSignUp(true)}
                >
                  Create your partner account
                </Button>
              </Stack>
              <Stack width={399} gap={2}>
                <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                  By signing in or creating an account, you agree with our Terms
                  & conditions and Privacy statement
                </Typography>
                <Stack>
                  <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                    All rights reserved.
                  </Typography>
                  <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                    Copyright (2025) - LankaStay.com™
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default withLayoutCreateAccountMain(CreateAccount);
