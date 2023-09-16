import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { getAllEvents } from "../../services/eventService";

const Home = () => {
  const { setCurrentUser, currentUser, setCurrentUserEmail, currentUserEmail } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserEmail(null);
    localStorage.clear();
    navigate("/login");
  };

  const createEvent = () => {
    navigate("/event");
  }

  useEffect(() => {
    getAllEvents()
      .then((events) => {
        console.log(events);
        setAllEvents(events);
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
  }, [currentUser]);
  if (shouldLoad) {
    return (
      allEvents.length > 0 && (
        <div>
          Welcome home
          {currentUserEmail}
          <Button onClick={logout}>logout</Button>
          <Button onClick={createEvent}>Event</Button>
          {allEvents.map((event) => (
            <p key={event.id}>
              {event.description} <br />
              {event.eventName}
            </p>
          ))}
        </div>
      )
    );
  }
};

export default Home;
