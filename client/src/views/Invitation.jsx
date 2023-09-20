import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import {
  getUserByEmail,
  getAllUsers,
} from "../../services/userService";
import AspectRatio from "@mui/joy/AspectRatio";
import { Card, Typography } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { FormControl } from "@mui/joy";
import FloatingLabelInput from "../components/InputText";

export function Invitation({ children }) {
  const { currentUser, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [shouldLoad, setShouldLoad] = useState(false);
  const navigate = useNavigate();
  const firstLetter = userName.charAt(0).toUpperCase();
  const uppercaseUserName = firstLetter + userName.slice(1);

  useEffect(() => {
    getUserByEmail(currentUserEmail)
      .then((user) => {
        setUserName(user.userName);
        setAllEvents(user.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        setAllUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUserEmail) {
      setShouldLoad(true);
    }
  }, [currentUser]);

  if (shouldLoad) {
    return (
      <Box sx={{ml: 5}}>
        <GlobalStyles
          styles={(theme) => ({
            "[data-feather], .feather": {
              color: `var(--Icon-color, ${theme.vars.palette.text.icon})`,
              margin: "var(--Icon-margin)",
              fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
              width: "1em",
              height: "1em",
            },
          })}
        />
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        {children}
            <Box
              sx={{
                p: 5,
                mt: 5,
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
              }}
            >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 30, sm: 40, md: 50 },
                  fontWeight: { xs: 700 },
                }}
              >
                Welcome, {uppercaseUserName}
              </Typography>
              <Typography
                sx={{
                  mb: { xs: 2, sm: 0 },
                  fontSize: { xs: 30, sm: 40, md: 50 },
                  fontWeight: { xs: 700 },
                }}
              >
                Invite Friend
              </Typography>
            </Box>
          </Box>
          {/* holds all the boxes */}
          <Box
            sx={{
              width: "100%",
              backgroundSize: "cover",
            }}
            display={{ xs: "block", md: "none" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: { xs: "row", md: "row" },
              alignItems: "center",
            }}
          >
            <Card variant="soft" sx={{ width: { xs: 350, sm: 600, lg:800 } }}>
              <AspectRatio ratio="2">
                <img
                  src="https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  srcSet="https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr= 2x"
                  loading="lazy"
                  alt="inv image"
                />
              </AspectRatio>

              <CardContent>
                <Typography
                  level="title-md"
                  sx={{
                    textAlign: "start",
                    mt: 3,
                    mb: 3,
                  }}
                >
                  Send a buddy an invite
                </Typography>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
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
                  <Button type="submit" fullWidth sx={{
                    textAlign: "start",
                    mt: 3,
                    mb: 3,
                  }}>
                    Send Request
                  </Button>
                </form>
              </CardContent>
              <CardOverflow
                variant="soft"
                sx={{ bgcolor: "background.level1" }}
              ></CardOverflow>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}
