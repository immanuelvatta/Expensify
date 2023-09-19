import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import { useScript } from "../utils/useScript";
import FirstSidebar from "../components/dashboard/FirstSidebar";
import { getUserByEmail, getAllUsers, getUserByUserName } from "../../services/userService";
import Header from "../components/dashboard/Header";
import RentalCard from "../components/dashboard/RentalCard";
import Main from "../components/dashboard/main";
import HeaderSection from "../components/dashboard/HeaderSection";
import Search from "../components/dashboard/Search";
import Filters from "../components/dashboard/Filters";
import Toggles from "../components/dashboard/Toggles";
import Pagination from "../components/dashboard/Pagination";
import { Card, Typography } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { MenuItem } from "@mui/joy";
import { FormControl } from "@mui/joy"
import Avatar from '@mui/joy/Avatar';
const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function Dashboard() {
  const status = useScript(`https://unpkg.com/feather-icons`);
  const { setCurrentUser, currentUser, setCurrentUserEmail, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [shouldLoad, setShouldLoad] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate();
  const firstLetter = userName.charAt(0).toUpperCase();
  const uppercaseUserName = firstLetter + userName.slice(1);
  

  const handleTripPicker = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    navigate(`/trip/${formJson.eventId}`)
  };

  useEnhancedEffect(() => {
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }, [status]);

  useEffect(() => {
    getUserByEmail(currentUserEmail)
      .then((user) => {
        setUserName(user.userName);
        setAllEvents(user.events);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    getAllUsers()
    .then((users) => {
      setAllUsers(users)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (currentUserEmail) {
      setShouldLoad(true);
    }
  }, [currentUser]);

  if (shouldLoad) {
    return (
      <CssVarsProvider disableTransitionOnChange>
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
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          <Header />
          <FirstSidebar />
          <Main>
            <Box
              sx={{
                p: 5,
                mt: 5,
                display: {xs: "block", sm: "flex"},
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                sx={{
                  fontSize: {xs: 30, sm: 40, md: 50},
                  fontWeight: {xs: 700}
                }}
                >
                  Welcome, {uppercaseUserName}
                </Typography>
                <Typography 
                sx={{
                  mb: {xs: 2, sm: 0},
                  fontSize: {xs: 30, sm: 40, md: 50},
                  fontWeight: {xs: 700}
                }}
                >
                  Current Trip
                </Typography>
              </Box>
              <form onSubmit={handleTripPicker}>
                <FormControl>
                  <Select
                    color="primary"
                    name='eventId'
                    placeholder="Select a Trip"
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      width: {xs: "100%", sm: 240, lg: 400},
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                    }}
                  >
                    {allEvents.map(event => (
                      <Option
                      name='eventId'
                      key={event.id}
                      value={event.id}
                      >
                        {event.eventName}
                      </Option>
                    ))}
                  </Select>
                  <Button type="submit" sx={{ mt: 2, width: {xs: "100%", sm: 240, lg: 400} }}>
                    Select Trip
                  </Button>
                </FormControl>
              </form>
            </Box>
            {/* holds all the boxes */}
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: {xs:"column", md: "row"},
              alignItems: "center",
            }}>
              {/* holds the buddies list box */}
              <Box sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                width: {xs: "100%", md: "auto"},
                mb: {xs: 3, md: 0}
              }}>
                <Card sx={{
                  width: "80%",
                }}>
                  <Typography sx={{
                    fontSize: {xs: 25, sm: 30, md: 40}
                  }}>
                    Buddies List
                  </Typography>
                  {/* holds the icon and username */}
                  {allUsers.filter(user => user.userName !== userName).map(user => (
                  <Box 
                  sx={{
                    display: "flex",
                    fontSize: {xs: 15, sm: 20, md: 30},
                  }} key={user.id}>
                    <Avatar sx={{mr:2}} variant="outlined" />
                    {user.userName}
                  </Box>
                ))}
                </Card>
              </Box>
              {/* holds the create trip and reminders */}
              <Box sx={{
                flexGrow: 2,
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: {xs: "100%", md: "auto"},
              }}>
              <Card sx={{
                width: "80%",
              }}>

              </Card>
              <Card sx={{
                width: "80%",
              }}>
                <Typography sx={{
                  fontSize: {xs: 20, sm: 30, md: 40}
                }}>
                  Buddies List
                </Typography>
              </Card>
              </Box>
            </Box>
          </Main>
        </Box>
      </CssVarsProvider>
    );
  } else {
    return null;
  }
}
