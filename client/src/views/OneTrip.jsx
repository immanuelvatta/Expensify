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
import { getAllExpensesForEvent } from "../../services/expenseService";
import Avatar from '@mui/joy/Avatar';

export function OneTrip() {
  const [allBuddies, setAllBuddies] = useState([]);
  const { currentUser, currentUserEmail } = useContext(AuthContext);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [userName, setUserName] = useState("");
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
    getAllExpensesForEvent(id)
      .then((expense) => {
        setExpenses(expense)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

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
          display: { sm: "Block", md: "flex" },
          justifyContent: { sm: "start", md: "center" },
          gap: { sm: 0, md: 10 }
        }}>
          {/* the one that contains the left box */}
          <Card sx={{
            p: 3,
            flexGrow: 2,
          }}>
            <CardContent>
              <Typography sx={{
                fontSize: { xs: 30, sm: 35, md: 40 },
                fontWeight: 700
              }}>
                Buddies List
              </Typography>
              <Divider sx={{ '--Divider-childPosition': '85%' }}>
                <Chip variant="soft" color="neutral" size="sm">
                  Add a Buddy
                </Chip>
              </Divider>
              {allBuddies.map(buddy => (
                <Typography 
                startDecorator={<Avatar variant="outlined" size="lg" />} 
                key={buddy.id} 
                sx={{
                  fontSize: { xs: 20, sm: 20, md: 30 },
                  mt: 3
                }}
                >
                  {startCase(buddy.userName)}
                </Typography>
              ))}
              <Button variant="outlined" size="lg" sx={{ mt: 2 }}>Add a Buddy</Button>
            </CardContent>
          </Card>
          {/* the div that contains the right 2 boxes */}
          {/* the expenses box */}
          <Card sx={{
            p: 3,
            flexGrow: 2,
            mt: { xs: 3, md: 0 }
          }}>
            <CardContent sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <Box>
                <Typography sx={{ fontSize: 25, fontWeight: 700 }}>
                  Expenses
                </Typography>
                <Divider sx={{ '--Divider-childPosition': '85%', mb:3 }}>
                  <Chip variant="soft" color="neutral" size="sm">
                    Add Expense
                  </Chip>
                </Divider>
              {expenses.map(expense => (
                <Box display={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <Typography sx={{
                    fontSize: { xs: 20, sm: 20, md: 25 },
                  }}>{startCase(expense.expenseName)}</Typography>
                  <Typography key={expense.id}>{USDollar.format(expense.expenseAmount)}</Typography>
                </Box>
              ))}
              </Box>
              <Box sx={{display: "flex", width: "100%", mt: 3}}>
                <Button
                  onClick={() => navigate(`/expense/${id}`)}
                  variant="outlined"
                  size="lg"
                  fullWidth
                >
                  Add an Expense
                </Button>
              </Box>
            </CardContent>
          </Card>
          {/* the balance box */}
          <Card sx={{
            p: 3,
            flexGrow: 1,
            mt: { xs: 3, md: 0 }
          }}>
            <CardContent>
              <Typography sx={{
                fontSize: 25,
                fontWeight: 700,
              }}>
                Balance Reminders
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    )
  } else {
    return null;
  }
}