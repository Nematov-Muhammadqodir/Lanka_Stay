import { logIn, logInPartner } from "@/src/libs/auth";
import { sweetMixinErrorAlert } from "@/src/libs/sweetAlert";
import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState<"guest" | "partner">("guest");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = useCallback((name: string, value: string) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const doLogin = useCallback(async () => {
    try {
      if (loginMode === "guest") {
        await logIn(input.email, input.password);
        await router.push(`${router.query.referrer ?? "/"}`);
      } else {
        await logInPartner(input.email, input.password);
        await router.push("/register-property/dashboard");
      }
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  }, [input, loginMode]);

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      sx={{
        backgroundImage: `url("/img/boat.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(255, 255, 255, 0.3)",
        }}
      />
      <Stack
        flexDirection={"row"}
        width={1000}
        height={"auto"}
        className="container"
        position={"relative"}
        justifyContent={"center"}
        sx={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
        borderRadius={6}
      >
        <Stack className="login-left-side" width={"50%"} position={"relative"}>
          <Image
            src={"/img/Villa.jpg"}
            alt="user-image"
            style={{
              objectFit: "cover",
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
            width={500}
            height={778}
          />
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "85%",
              height: "80%",
              bgcolor: "rgba(255, 255, 255, 0.6)",
              borderRadius: 4,
            }}
          />
          <Image
            src={"/file.svg"}
            alt="logo"
            style={{
              objectFit: "cover",
              position: "absolute",
              top: 322,
              left: 100,
              right: 0,
              bottom: 0,
            }}
            width={300}
            height={50}
          />
        </Stack>
        <Stack className="login-right-side" width={"50%"} pl={8} pr={4} py={5}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 40,
              justifyContent: "center",
              textAlign: "center",
              mb: 2,
            }}
          >
            Login
          </Typography>

          {/* Guest / Partner Toggle */}
          <Tabs
            value={loginMode}
            onChange={(_, v) => setLoginMode(v)}
            variant="fullWidth"
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: 15,
              },
            }}
          >
            <Tab
              icon={<PersonIcon />}
              iconPosition="start"
              label="Guest"
              value="guest"
            />
            <Tab
              icon={<BusinessIcon />}
              iconPosition="start"
              label="Partner"
              value="partner"
            />
          </Tabs>

          <Stack gap={2} overflow={"auto"} height={520}>
            <Stack gap={1}>
              <Typography sx={{ fontWeight: 500 }}>E-mail</Typography>
              <TextField
                onChange={(e) => handleInput("email", e.target.value)}
                value={input.email}
                label="example@gmail.com"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D2D2D2",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "blue",
                  },
                  "& .MuiInputLabel-root": { color: "#D2D2D2" },
                  "&:hover .MuiInputLabel-root": { color: "blue" },
                }}
              />
            </Stack>
            <Stack gap={1} position="relative">
              <Typography sx={{ fontWeight: 500 }}>Password</Typography>
              <TextField
                onChange={(e) => handleInput("password", e.target.value)}
                value={input.password}
                type={showPassword ? "text" : "password"}
                label="6+ characters"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D2D2D2",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "blue",
                  },
                  "& .MuiInputLabel-root": { color: "#D2D2D2" },
                  "&:hover .MuiInputLabel-root": { color: "blue" },
                }}
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                sx={{ position: "absolute", right: 4, bottom: 8, minWidth: 40 }}
              >
                {showPassword ? (
                  <VisibilityOffIcon sx={{ color: "grey.500" }} />
                ) : (
                  <RemoveRedEyeIcon sx={{ color: "grey.500" }} />
                )}
              </Button>
            </Stack>

            <Button
              onClick={doLogin}
              sx={{
                marginTop: "20px",
                height: 70,
                color: "white",
                padding: 2,
                borderRadius: "10px",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 2,
              }}
              variant="contained"
            >
              {loginMode === "guest" ? "Login" : "Login as Partner"}
            </Button>

            <Button
              sx={{ textDecoration: "underline", alignSelf: "flex-end" }}
              onClick={() => router.push("/join/register")}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
