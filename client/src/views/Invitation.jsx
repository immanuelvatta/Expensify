import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import { getUserByEmail } from "../../services/userService";
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
import { startCase } from 'lodash';


export function Invitation() {
  const [loading, setLoading] = useState(false);
  const { currentUser, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [shouldLoad, setShouldLoad] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getUserByEmail(currentUserEmail)
      .then((user) => {
        setUserName(user.userName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeAlert = () => {
    setSuccess(false);
  }

  useEffect(() => emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY), [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        from_name: currentUserEmail,
        recipient: email,
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          Invite a Friend
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
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FloatingLabelInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
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
                  Successfully sent an invitation to {email}.
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
