import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/eventService";
import { AuthContext } from "../context/authContext";
import { getUserByEmail } from "../../services/userService";
import Box from "@mui/joy/Box";
import { AspectRatio, Button, Card, FormControl, Typography } from "@mui/joy";
import FloatingLabelInput from "../components/InputText";
import Calculate from '../assets/img/calculate.jpg?w=400&format=webp'
import { Block } from "@mui/icons-material";
import {capitalize } from "lodash";

function CreateEvent() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [userName, setUserName] = useState("");
  const { currentUserEmail, currentUser } = useContext(AuthContext);
  const [ eventName, setEventName ] = useState("");
  const [ eventDate, setEventDate ] = useState("");
  const [ description, setDescription ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userObj = await getUserByEmail(currentUserEmail);
      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("description", description);
      formData.append("eventDate", eventDate);
      formData.append("user", userObj.id);
      console.log(formData)
      await createEvent(formData)
        .then(() => navigate("/dashboard"))
        .catch((error) => console.log(error));
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserByEmail(currentUserEmail)
      .then((user) => {
        setUserName(user.userName);
      })
      .catch((error) => {
        console.log(error);
      })
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
      <Box sx={{
        px: { xs: 0, md: 10 },
        mt: 10,
      }}>
        <Box>
          <Typography sx={{
            fontSize: { xs: 30, sm: 40, md: 50 },
            fontWeight: { xs: 700 },
            ml: { xs: 5, md: 0 }
          }}>
            Welcome, {capitalize(userName)}
          </Typography>
        </Box>
        <Box sx={{
          display: "flex",
          alignItems: "flex-start",
          pt: 5,
          px: {xs: 5, md: 0},
          gap: 10
        }}>
          <Box sx={{
            flex: 2,
            // mt: 5

          }}>
            <Card sx={(theme) => ({
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
              <Typography sx={{
                fontSize: { xs: 30, sm: 40, md: 50 },
                fontWeight: { xs: 700 }
              }}>
                Create a Trip
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  mt: 5
                }}>
                  <FormControl>
                    <FloatingLabelInput
                      type="text"
                      label="Event Name"
                      name="eventName"
                      size="lg"
                      placeholder="Enter an Event name"
                      value={eventName}
                      onChange={e => setEventName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FloatingLabelInput
                      size="lg"
                      type="text"
                      label="Description"
                      name="description"
                      placeholder="Enter a description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FloatingLabelInput
                      size="lg"
                      type="date"
                      label="Event Date"
                      name="eventDate"
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                    />
                  </FormControl>
                  <Box sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "end"
                  }}>
                    <Button sx={{
                      px: 10
                    }}
                      type="submit"
                      size="lg"
                      variant="outlined"
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </form>
            </Card>
          </Box>
          <Box sx={{
            flex: 1,
            display: {xs: "none", md: "block"}
          }}>
            <img style={{
              width: "clamp(355px, 80%, 80%)",
              borderRadius: "lg",
            }}
            src={Calculate}
            />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}

export default CreateEvent;