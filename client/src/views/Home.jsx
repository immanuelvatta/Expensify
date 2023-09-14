import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/joy'

const Home = () => {
  const {setCurrentUser, currentUser, setCurrentUserEmail, currentUserEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [shouldLoad, setShouldLoad] = useState(false);

  const logout = () => {
    setCurrentUser(null)
    setCurrentUserEmail(null)
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (currentUserEmail) {
      setShouldLoad(true);
    }
  }, [currentUser]);
  if (shouldLoad) {
  return (
    <div>
      Welcome home
      {currentUserEmail}
      <Button onClick={logout}>logout</Button>
    </div>
  )
  }
}
export default Home