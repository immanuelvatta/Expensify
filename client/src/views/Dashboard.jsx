import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import { getUserByEmail, getAllUsers } from "../../services/userService";
import { Card, Typography } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { FormControl } from "@mui/joy"
import Avatar from '@mui/joy/Avatar';
import { CardCover, CardContent, AspectRatio } from "@mui/joy";
import { extendTheme } from '@mui/joy/styles';

export function Dashboard() {
  const {currentUser, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [shouldLoad, setShouldLoad] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate();
  const firstLetter = userName.charAt(0).toUpperCase();
  const uppercaseUserName = firstLetter + userName.slice(1);
  
  const theme = extendTheme({
    colorSchemes: {
      light: {
        // This creates a 1px box-shadow.
        shadowRing: '0 0 0 1px rgba(0 0 0 / 0.1)',
      },
      dark: {
        shadowChannel: '0 0 0 1px rgba(11 107 203 / 0.65)',
      },
    },
  });

  const handleTripPicker = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    navigate(`/trip/${formJson.eventId}`)
  };

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

  const createTrip = () => {
    navigate("/event");
  }

  useEffect(() => {
    getAllUsers()
    .then((users) => {
      setAllUsers(users)
    })
    .catch((error) => {
      console.log(error)
    })
  })

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (currentUserEmail) {
      setShouldLoad(true);
    }
  }, [currentUser]);

  if (shouldLoad) {
    return (
      <Box sx={{ml: {xs: 0, md:5}}}>
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
        <Box
          sx={{
            px: 10,
            mt: 10,
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
              <Button type="submit" sx={{ my: 2, width: {xs: "100%", sm: 240, lg: 400} }}>
                Select Trip
              </Button>
            </FormControl>
          </form>
        </Box>
        {/* holds all the boxes */}
        <Box sx={{
          mt: {xs: 0, sm: 1,  md: 10},
          display: "flex",
          justifyContent: "center",
          flexDirection: {xs:"column", md: "row"},
        }}>
          {/* holds the buddies list box */}
          <Box sx={{
            flexGrow: {md: 2, lg: 1},
            display: "flex",
            justifyContent: "center",
            width: {xs: "100%", md: "auto"},
            mb: {xs: 3, md: 0}
          }}>
            <Card sx={(theme) => ({
                borderColor: "var(--joy-palette-primary-500, #0B6BCB)",
                width: "80%",
                boxShadow: theme.shadow.sm,
                transition: '0.2s',
                '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                '&:hover': {
                  boxShadow: theme.shadow.xl,
                  transform: 'translateY(-3px)',
                }
              })}>
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
            flexGrow: {md: 1, lg: 2},
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: {xs: "100%", md: "auto"},
          }}>
            {/* create trip box */}
            <Box
              onClick={createTrip}
              sx={{
                perspective: '1000px',
                width: "80%",
                mb: 5,
                transition: 'transform 0.4s',
                '& > div, & > div > div': {
                  transition: 'inherit',
                },
                '&:hover': {
                  cursor: "pointer",
                  '& > div': {
                    transform: 'rotateY(-10deg)',
                    '& > div:nth-of-type(2)': {
                      transform: 'scaleY(0.9) translate3d(0px, 10px, 20px)',
                    },
                    '& > div::nth-of-type(3)': {
                      transform: 'translate3d(15px, 20px, 10px)',
                    },
                  },
                },
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  minHeight: {xs: '280px', md: "450px"},
                  width: "100%",
                  borderColor: '#000',
                }}
              >
                <AspectRatio minHeight="120px" maxHeight="400px">
                <img
                  src="https://images.pexels.com/photos/163185/old-retro-antique-vintage-163185.jpeg"
                  srcSet="https://images.pexels.com/photos/163185/old-retro-antique-vintage-163185.jpeg 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <Typography level="h2" fontSize="lg" textColor="var(--joy-palette-neutral-200, #DDE7EE)">
                Life is short, and the world is wide. You better get started.
              </Typography>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                  border: '1px solid',
                  borderColor: 'var(--joy-palette-primary-500, #0B6BCB)',
                  backdropFilter: 'blur(1px)',
                  '&:hover': {
                    display: "none"
                  }
                }}
              >
              <Typography sx={{ fontSize: {xs: 30, sm: 40, md:50}}} fontSize="lg" textColor="#fff">
                Create a Trip!
              </Typography>
              </CardCover>
              <CardContent
                sx={{
                  alignItems: 'self-end',
                  justifyContent: 'flex-end',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))',
                  border: '1px solid',
                  borderColor: '#000',
                  backdropFilter: 'blur(1px)',
                }}
              >
            </CardContent>
          </Card>
        </Box>
            <Card sx={{
              width: "80%",
            }}>
              <Typography sx={{
                fontSize: {xs: 20, sm: 30, md: 40}
              }}>
                Balance Reminders
              </Typography>
              <Divider/>
              <Typography sx={{
                fontSize: {xs: 20, sm: 30, md: 40}
              }}>
                I don't know what to put here haha
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}
