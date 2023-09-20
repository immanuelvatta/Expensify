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
  };

  const sidebar = () => {
    navigate("/sidebar");
  }

  const dashboard = () => {
    navigate("/dashboard");
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
  }, [currentUser, currentUserEmail]);

  if (shouldLoad) {
    return (
      <div>
        <Button onClick={logout}>logout</Button>
        <Button onClick={createEvent}>Event</Button>
        <Button onClick={sidebar}>Sidebar</Button>
        <Button onClick={dashboard}>Dashboard</Button>
        <p>Welcome home</p> 
        <p>{currentUserEmail}</p>
        {allEvents.length > 0 && (
          <div>
            {allEvents.map((event) => (
              <div key={event.id}>
                <p>{event.description}</p>
                <p>{event.eventName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Home;