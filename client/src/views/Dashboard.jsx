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
import { getUserByEmail } from "../../services/userService";
import Header from "../components/dashboard/Header";
import RentalCard from "../components/dashboard/RentalCard";
import Main from "../components/dashboard/main";
import HeaderSection from "../components/dashboard/HeaderSection";
import Search from "../components/dashboard/Search";
import Filters from "../components/dashboard/Filters";
import Toggles from "../components/dashboard/Toggles";
import Pagination from "../components/dashboard/Pagination";
import { Typography } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { MenuItem } from "@mui/joy";
import { FormControl } from "@mui/joy"

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function Dashboard() {
  const status = useScript(`https://unpkg.com/feather-icons`);
  const { setCurrentUser, currentUser, setCurrentUserEmail, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [shouldLoad, setShouldLoad] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [eventId, setEventId] = useState();
  const navigate = useNavigate();
  const firstLetter = userName.charAt(0).toUpperCase();
  const uppercaseUserName = firstLetter + userName.slice(1);

  // const tripChangeHandler = (e) => {
  //   console.log(e.target.value);
  //   const selectedEventId = e.target.value;
  //   setEventId(selectedEventId);
  // };

  const handleTripPicker = e => {
    e.preventDefault();
      console.log("Navigating to trip page");
      navigate(`/trip/${eventId}`);
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
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (currentUserEmail) {
      setShouldLoad(true);
    }
  }, [currentUser, currentUserEmail]);

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
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography level="h1">Welcome, {uppercaseUserName}</Typography>
                <Typography level="h1">current trip</Typography>
              </Box>
              <form onSubmit={handleTripPicker}>
                <FormControl>
                <Select
                  name="eventId"
                  value={eventId}
                  placeholder="Select a trip"
                  onChange={e => setEventId(e.target.value)}
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: 240,
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
                    value={event.id}
                    >
                      {event.eventName}
                    </Option>
                  ))}
                </Select>
                <Button type="submit" fullWidth sx={{ mt: 2 }}>
                  Select Trip
                </Button>
                </FormControl>
              </form>
            </Box>
          </Main>
        </Box>
      </CssVarsProvider>
    );
  } else {
    return null;
  }
}
