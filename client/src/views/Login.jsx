/* eslint-disable react/no-unescaped-entities */
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ColorSchemeToggle from "../components/ColorSchemeToggle";
import { GoogleIcon } from "../components/GoogleIcon";
import LogoSVG from "../assets/Logo";
import { AuthContext } from "../context/authContext";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getUserByEmail, createUser } from "../../services/userService";
import FloatingLabelInput from "../components/InputText";

const Login = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setCurrentUserEmail } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const emailExists = await getUserByEmail(data.user.email);
        if (!emailExists) {
          setCurrentUser(data.user.uid);
          localStorage.setItem("uid", data.user.uid);
          setCurrentUserEmail(data.user.email);
          localStorage.setItem("email", data.user.email);
          const formData = new FormData();
          formData.append("uid", data.user.uid);
          formData.append("userName", data.user.displayName);
          formData.append("email", data.user.email);
          createUser(formData);
          navigate("/home");
        } else {
          setCurrentUser(data.user.uid);
          localStorage.setItem("uid", data.user.uid);
          setCurrentUserEmail(data.user.email);
          localStorage.setItem("email", data.user.email);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setEmailError(false);

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user.uid);
        localStorage.setItem("uid", userCredential.user.uid);
        setCurrentUserEmail(userCredential.user.email);
        localStorage.setItem("email", userCredential.user.email);
        navigate("/home");
      })
      .catch((err) => {
        setError(
          "Invalid login credentials. Please check your email and password"
        );
        console.error(err);
      });
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    } else {
      setShouldLoad(true);
    }
  }, [currentUser]);

  if (shouldLoad) {
    return (
      <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Collapsed-breakpoint": "769px",
              "--Cover-width": "40vw",
              "--Form-maxWidth": "700px",
              "--Transition-duration": "0.4s",
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width:
              "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
            transition: "width var(--Transition-duration)",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255 255 255 / 0.6)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(19 19 24 / 0.4)",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
              left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
              width:
                "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
              maxWidth: "100%",
              px: 2,
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontWeight="lg"
                startDecorator={
                  <Box
                    component="span"
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                  ></Box>
                }
              >
                <LogoSVG width={40} height={40} color={"darkgray"} sx={{ m: 1 }} />
                BWIV -Expensify
              </Typography>
              <ColorSchemeToggle />
            </Box>
            <Box
              component="main"
              sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: "hidden",
                },
              }}
            >
              <div>
                <Box style={{ display: "flex", alignContent: "center" }}>
                  <Typography component="h1" fontSize="xl2" fontWeight="lg">
                    Sign in to your account
                  </Typography>
                </Box>
                <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                  Welcome back
                </Typography>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <FormControl required error={emailError}>
                  <FloatingLabelInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl required>
                  <FloatingLabelInput
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                {error && (
                  <Typography level="h4" color="danger" sx={{ my: 2 }}>
                    {error}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link
                    fontSize="sm"
                    href="#replace-with-a-link"
                    fontWeight="lg"
                  >
                    Forgot your password?
                  </Link>
                  <RouterLink fontSize="sm" to={"/signup"} fontWeight="lg">
                    Don't have an Account?
                  </RouterLink>
                </Box>
                <Button type="submit" fullWidth>
                  Sign in
                </Button>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="outlined"
                  color="neutral"
                  fullWidth
                  startDecorator={<GoogleIcon />}
                >
                  Sign in with Google
                </Button>
              </form>
            </Box>
            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-xs" textAlign="center">
                © BWIV {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
            transition:
              "background-image var(--Transition-duration), left var(--Transition-duration) !important",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage:
              "url(https://images.pexels.com/photos/4386335/pexels-photo-4386335.jpeg?auto=compress&cs=tinysrgb&w=1000)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundImage:
                "url(https://images.pexels.com/photos/7063765/pexels-photo-7063765.jpeg?auto=compress&cs=tinysrgb&w=1000)",
            },
          })}
        />
      </CssVarsProvider>
    );
  }
};
export default Login;
