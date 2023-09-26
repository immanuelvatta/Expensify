import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Box from "@mui/joy/Box";
import { getUserByEmail } from "../../services/userService";
import { Card, Typography } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { FormControl } from "@mui/joy";
import FloatingLabelInput from "../components/InputText";
import { getAllTripBuddies } from "../../services/userEventService";
import { startCase } from 'lodash';
import { useParams } from "react-router-dom";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { getAllExpensesForEvent, createExpense } from "../../services/expenseService";
import { createBalance } from "../../services/balanceService";
import { getEventById } from "../../services/eventService";


function OneExpense() {
  const [expenseList, setExpenseList] = useState([]);
  const [allBuddies, setAllBuddies] = useState([]);
  const { currentUser, currentUserEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [buddySelector, setBuddySelector] = useState("");
  const [eventObj, setEventObj] = useState({});
  const [shouldLoad, setShouldLoad] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    getEventById(id)
      .then((event) => {
        setEventObj(event)
        console.log(event);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    getAllExpensesForEvent(id)
      .then((res) => {
        setExpenseList(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id])

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newExpense;
    try {
      const userObj = await getUserByEmail(currentUserEmail);
      const expFormData = new FormData();
      expFormData.append("expenseAmount", expenseAmount);
      expFormData.append("expenseName", title);
      expFormData.append("event", id);
      expFormData.append("expenseCreator", userObj.id)
      newExpense = await createExpense(expFormData)
    } catch (error) {
      console.log(error);
    }
    try {
      const balFormData = new FormData();
      balFormData.append("expenseSharer", buddySelector)
      balFormData.append("amount", expenseAmount)
      balFormData.append("expense", newExpense.id)
      await createBalance(balFormData);
      navigate(`/event/${id}`)
    } catch (error) {
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
          <Box>
            {expenseList && expenseList.map(expense => (
              <Box display={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Typography sx={{
                  fontSize: { xs: 20, sm: 20, md: 25 }
                }}>{startCase(expense.expenseName)}</Typography>
                <Typography key={expense.id}>{USDollar.format(expense.expenseAmount)}</Typography>
              </Box>
            ))}
          </Box>
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
                  {eventObj}
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
                <Box sx={{ display: { xs: "block", md: "flex" }, justifyContent: "center", gap: { md: 2 } }}>
                  <FormControl required sx={{ flexGrow: 1, }} size="lg">

                    <FloatingLabelInput
                      type="text"
                      label="Expense Name"
                      name="title"
                      placeholder="Enter Item"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>
                  <FormControl required sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, }} size="lg">
                    <FloatingLabelInput
                      type="text"
                      label="Amount"
                      name="expenseAmount"
                      placeholder="Total amount"
                      onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box sx={{
                  display: { xs: "block", md: "flex" },
                  mt: 2,
                  gap: 2,
                }}>
                  <Select
                    color="primary"
                    value={buddySelector}
                    name='userId'
                    size="lg"
                    placeholder="Select Buddy"
                    indicator={<KeyboardArrowDown />}
                    onChange={(e, newValue) => {setBuddySelector(newValue)}}
                    sx={{
                      width: { xs: "auto", sm: 570, lg: 790 },
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                      flexGrow: 2,
                    }}
                  >
                    {allBuddies.map((buddy, idx) => (
                      <Option name='userId' key={buddy.id} value={buddy.id}>
                        {startCase(buddy.userName)}
                      </Option>
                    ))}
                  </Select>
                  <Button type="submit" fullWidth variant="solid" sx={{
                    textAlign: "start",
                    flexGrow: 1,
                    mt: { xs: 2, md: 0 }
                  }}>
                    Add an Expense
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}
export default OneExpense