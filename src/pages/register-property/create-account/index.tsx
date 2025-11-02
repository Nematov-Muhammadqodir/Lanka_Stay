import React, { useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const CreateAccount = () => {
  const [signUp, setSignUp] = useState(true);
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
