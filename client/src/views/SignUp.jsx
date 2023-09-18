import { useState, useContext } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import { GoogleIcon } from "../components/GoogleIcon";
import ColorSchemeToggle from "../components/ColorSchemeToggle";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase/firebase"
import { AuthContext } from "../context/authContext";
import LogoSVG from "../assets/Logo";
import { createUser, getUserByEmail } from "../../services/userService";
import { signInWithPopup } from "firebase/auth";
import FloatingLabelInput from "../components/InputText";

const SignUp = () => {
  const [emailError, setEmailError] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState(null);
  const { setCurrentUser, setCurrentUserEmail } = useContext(AuthContext);

  const navigate = useNavigate("");

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const emailExists = await getUserByEmail(data.user.email);
        if (!emailExists) {
          const formData = new FormData();
          formData.append("uid", data.user.uid);
          formData.append("userName", data.user.displayName);
          formData.append("email", data.user.email);
          try {
            await createUser(formData);
            setCurrentUser(data.user.uid);
            localStorage.setItem("uid", data.user.uid);
            setCurrentUserEmail(data.user.email);
            localStorage.setItem("email", data.user.email);
            navigate("/home");
          } catch (error) {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
        setError(
          "Google Sign-In Error"
        )
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false)

    if (userName.length < 2) {
      setError(
        "User name must be more than two characters"
      )
      return;
    }

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError(true)
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setError(
        "Make sure your passwords match"
      )
      return;
    }
    setPasswordsMatch(true);

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(newUser.user.uid);
      localStorage.setItem("uid", newUser.user.uid);
      setCurrentUserEmail(newUser.user.email);
      localStorage.setItem("email", newUser.user.email);
      console.log(newUser)
      try {
        const formData = new FormData();
        formData.append("uid", newUser.user.uid);
        formData.append("userName", userName);
        formData.append("email", email);
        createUser(formData);
        navigate("/home");
      } catch (err) {
        console.log("Failed to send it to the db", err);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // The email is already in use
        setError(
          "Email is already in use"
        )
        console.error('Email is already taken.');
      } else {
        console.error(error);
      }
    }
  }


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
                >

                </Box>
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
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Please create an account
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                Nice to meet you!
              </Typography>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormControl required>
                <FloatingLabelInput
                  type="text"
                  label="Username"
                  name="userName"
                  placeholder="Enter Your Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
              <FormControl required>
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
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setP(e.target.value)}
                  />
              </FormControl>
              <FormControl required>
                <FloatingLabelInput
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <RouterLink fontSize="sm" to={"/login"} fontWeight="lg">
                  Already have an account?
                </RouterLink>
              </Box>
              <Button type="submit" fullWidth>
                Sign Up
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
            "url(https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1000)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?auto=compress&cs=tinysrgb&w=1000)",
          },
        })}
      />
    </CssVarsProvider>
  );
};
export default SignUp;
