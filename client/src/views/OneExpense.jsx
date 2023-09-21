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
import { getAllTripBuddies } from "../../services/userEventService";
import { startCase } from 'lodash';
import { useParams } from "react-router-dom";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Avatar from '@mui/joy/Avatar';


function OneExpense() {
  const [allBuddies, setAllBuddies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [buddySelector, setBuddySelector] = useState("");
  const [shouldLoad, setShouldLoad] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getUserByEmail(currentUserEmail)
      .then((user) => {
        setUserName(user.userName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllTripBuddies(id)
      .then((buddies) => {
        setAllBuddies(buddies)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const closeAlert = () => {
    setSuccess(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography level="h1">
                  Trip Name
                </Typography>
              </Box>
              <Typography level="h2" sx={{ mt: 4 }}>
                Total Cost ||
              </Typography>

              <Typography
                level="title-md"
                sx={{
                  textAlign: "start",
                  mt: 3,
                  mb: 3,
                }}
              >

              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <FormControl required sx={{ flexGrow: 1, mr: 2 }}>
                    <FloatingLabelInput
                      type="text"
                      label="Expense Name"
                      name="title"
                      placeholder="Enter Item"
                      onChange={() => setTitle(e.target.value)}
                    />
                  </FormControl>
                  <FormControl required sx={{ flexGrow: 1 }}>
                    <FloatingLabelInput
                      type="number"
                      label="Amount"
                      name="totalAmount"
                      placeholder="Total amount"
                      onChange={() => setTotalAmount(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box sx={{
                  display: "flex"
                }}>
                  <Select
                    color="primary"
                    name='userId'
                    size="lg"
                    placeholder="Select Buddy"
                    indicator={<KeyboardArrowDown />}
                    onChange={() => setBuddySelector(e.target)}
                    sx={{
                      flex:1,
                      width: { xs: "100%", sm: 240, lg: 400 },
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                    }}
                  >
                    {allBuddies.map(buddy => (
                      <Option name='userId' key={buddy.id} value={buddy.id}>
                        
                          <Avatar alt={startCase(buddy.userName)} sx={theme => ({
                    backgroundColor: "primary.outlinedBorder" ,
                   mr:2})}/>{startCase(buddy.userName)}
                        
                      </Option>
                    ))}
                  </Select>
                  <Button type="submit" fullWidth sx={{
                    textAlign: "start",
                    mt: 3,
                    mb: 3,
                    flex:1
                  }}>
                    Add an Expense
                  </Button>
                </Box>
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
export default OneExpense