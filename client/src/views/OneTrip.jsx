import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext"
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, Card } from "@mui/joy";
import { Divider } from "@mui/joy";
import { Chip } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import { Button } from "@mui/joy";
import { getUserByEmail } from "../../services/userService";
import { getAllTripBuddies } from "../../services/userEventService";
import { useParams } from "react-router-dom";
import { startCase } from "lodash";

export function OneTrip() {
  const [ allBuddies, setAllBuddies ] = useState([]);
  const { currentUser, currentUserEmail } = useContext(AuthContext);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getAllTripBuddies(id)
      .then((buddies) => {
        setAllBuddies(buddies)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

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
      // the over all div
      <Box sx={{
        px: { xs: 0, md: 10 },
        mt: 10,
      }}>
        {/* box to contain welcome user */}
        <Box>
          <Typography sx={{
            fontSize: { xs: 30, sm: 40, md: 50 },
            fontWeight: { xs: 700 },
            ml: { xs: 5, md: 0 },
          }}>
            Welcome, {startCase(userName)}
          </Typography>
        </Box>
        {/* Box the contains the lower page */}
        <Box sx={{
          mt: { xs: 10, md: 5 },
          px: { xs: 5, md: 15 },
          display: {sm: "Block", md: "flex"},
          justifyContent: {sm: "start", md: "center"},
          gap: {sm: 0, md: 10} 
        }}>
          {/* the one that contains the left box */}
          <Box sx={{

          }}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 25, fontWeight: 700 }}>
                  Buddies List
                </Typography>
                <Divider sx={{ '--Divider-childPosition': '85%' }}>
                  <Chip variant="soft" color="neutral" size="sm">
                    Add a Buddy
                  </Chip>
                </Divider>
                {allBuddies.map(buddy => (
                  <Typography>{startCase(buddy.userName)}</Typography>
                ))}
                <Button>Add a Buddy</Button>
              </CardContent>
            </Card>
          </Box>
          {/* the div that contains the right 2 boxes */}
          <Box sx={{
            display: {lg: "flex"},
            gap: {lg: 10},
            mt: { xs: 5, md: 0 }
          }}>
            {/* the expenses box */}
            <Box>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 25, fontWeight: 700 }}>
                    Expenses
                  </Typography>
                  <Divider sx={{ '--Divider-childPosition': '85%' }}>
                    <Chip variant="soft" color="neutral" size="sm">
                      Add Expense
                    </Chip>
                  </Divider>
                  <Button onClick={() => navigate(`/expense/${id}`)}>Add an Expense</Button>
                </CardContent>
              </Card>
            </Box>
            {/* the balance box */}
            <Box sx={{
              mt: { xs: 5, lg: 0 }
            }}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 25, fontWeight: 700 }}>
                    Balance Reminders
                  </Typography>
                  <Divider sx={{mt:1}}/>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  } else {
    return null;
  }
}