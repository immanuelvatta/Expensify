import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import { getUserByEmail, getUserByUserId } from "../../services/userService";
import AspectRatio from "@mui/joy/AspectRatio";
import { Card, Typography } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { FormControl } from "@mui/joy";
import FloatingLabelInput from "../components/InputText";
import emailjs from "@emailjs/browser";
import Alert from "@mui/joy/Alert";
import LinearProgress from "@mui/joy/LinearProgress";
import IconButton from '@mui/joy/IconButton';
import Close from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check';
import { startCase } from "lodash";
import Avatar from "@mui/joy/Avatar";
import { useParams } from "react-router-dom";
import Divider from '@mui/joy/Divider';
import Select, { selectClasses } from "@mui/joy/Select";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Option from "@mui/joy/Option";
import { createUserEvent } from "../../services/userEventService";

export function OneBuddy() {
  const { currentUser, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buddyEmail, setBuddyEmail] = useState("");
  const [buddyUserName, setBuddyUserName] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

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
    getUserByUserId(id)
      .then((friend) => {
        setBuddyEmail(friend.email);
        setBuddyUserName(friend.userName);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeAlert = () => {
    setSuccess(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData(e.target);
      formData.append("user", id);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson)
      await createUserEvent(formData)
        .then(() => {
          setSuccess(true);
          navigate("/dashboard");
        })
        .catch((error) => console.log(error));

    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUserEmail) {
      setShouldLoad(true);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  if (shouldLoad) {
    return (
      <Box sx={{
        px: { xs: 5, md: 15 },
        mt: { xs: 10, md: 5 },
      }}>
        <Typography sx={{
          fontSize: { xs: 30, sm: 40, md: 50 },
          fontWeight: { xs: 700 },
        }}>
          Welcome, {startCase(userName)}
        </Typography>
        <Typography sx={{
          fontSize: { xs: 30, sm: 40, md: 50 },
          fontWeight: { xs: 700 },
        }}>
          Add Buddy To your Event
        </Typography>
        <Box sx={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Card variant="soft" sx={(theme) => ({
            width: { xs: 350, sm: 600, lg: 800 },
            mt: 10,
            borderColor: "var(--joy-palette-primary-500, #0B6BCB)",
            boxShadow: theme.shadow.sm,
            transition: '0.2s',
            '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
            '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
            '&:hover': {
              boxShadow: theme.shadow.xl,
              transform: 'translateY(-3px)',
            }
          })}>
            <AspectRatio ratio="2">
              <img
                src="https://images.unsplash.com/photo-1582578598774-a377d4b32223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                srcSet="https://images.unsplash.com/photo-1582578598774-a377d4b32223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80= 2x"
                loading="lazy"
                alt="buddy"
                style={{
                  borderRadius: "10px",
                }}
              />
            </AspectRatio>
            <CardContent>
              <Box
                level="title-md"
                sx={{
                  textAlign: "start",

                  mb: 3,
                }}
              >
                <Divider sx={{ '--Divider-childPosition': '90%' }}>
                  <Avatar sx={theme => ({
                    backgroundColor: "primary.outlinedBorder" ,
                  })} alt={startCase(buddyUserName)} variant="outlined" size="lg" />
                </Divider>
                <Typography sx={{
                  textAlign: "center",
                  fontSize: { sm: 20, md: 30 },
                  fontWeight: { xs: 700 },
                }}>
                  Username: {startCase(buddyUserName)}
                </Typography>
                <Typography sx={{
                  textAlign: "center",
                  fontSize: { sm: 20, md: 30 },
                  fontWeight: { xs: 700 },
                }}>
                  Email: {buddyEmail}
                </Typography>
              </Box>
              <Box sx={{
                mt: 2,
                width: "100%",
              }}>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <Select
                      color="primary"
                      size="lg"
                      name='event'
                      placeholder="Select a Trip"
                      indicator={<KeyboardArrowDown />}
                      sx={{
                        width: "100%",
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
                          name='event'
                          key={event.id}
                          value={event.id}
                        >
                          {event.eventName}
                        </Option>
                      ))}
                    </Select>
                    <Button type="submit" sx={{ my: 2, width: "100%" }}>
                      Select Trip
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </CardContent>
            <CardOverflow
              variant="soft"
              sx={{ bgcolor: "background.level1" }}
            ></CardOverflow>
          </Card>
        </Box>
        <Box sx={{
          position: "absolute",
          bottom: 5,
          right: 5,
          zIndex: 10
        }}>
          {success && (
            <Alert
              size="lg"
              color="primary"
              variant="soft"
              invertedColors
              startDecorator={
                <AspectRatio
                  variant="outline"
                  ratio="1"
                  sx={{
                    minWidth: 40,
                    borderRadius: '50%',
                    boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                  }}
                >
                  <div>
                    <Check fontSize="xl2" />
                  </div>
                </AspectRatio>
              }
              endDecorator={
                <IconButton
                  variant="plain"
                  sx={{
                    '--IconButton-size': '32px',
                    transform: 'translate(0.5rem, -0.5rem)',
                  }}
                  onClick={closeAlert}
                >
                  <Close />
                </IconButton>
              }
              sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
            >
              <div>
                <Typography level="title-lg">Success</Typography>
                <Typography level="body-sm">
                  Successfully added {startCase(buddyUserName)} to the trip.
                </Typography>
              </div>
              <LinearProgress
                variant="soft"
                value={40}
                sx={(theme) => ({
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: `rgb(${theme.vars.palette.primary.lightChannel} / 0.92)`,
                  '--LinearProgress-radius': '1px',
                })}
              />
            </Alert>
          )}
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}
