import React, { useContext, useState } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import Logo from "../../assets/Logo";
import { openSidebar, closeSidebar } from "../../utils/utils";
import ColorSchemeToggle from "./ColorSchemeToggle";
import LogoSVG from "../../assets/Logo";
import { Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Tooltip from "@mui/joy/Tooltip";
import { capitalize } from "lodash";

export default function FirstSidebar() {
  const [variant, setVariant] = useState('outlined');
  const navigate = useNavigate();
  const { currentUserEmail, setCurrentUser, setCurrentUserEmail } = useContext(AuthContext);

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserEmail(null);
    localStorage.clear();
    navigate("/bwiv");
  };
  return (
    <Sheet
      className="FirstSidebar"
      color="primary"
      invertedColors
      sx={{
        position: {
          xs: "fixed",
          // md: 'sticky',
        },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--FirstSidebar-width)",
        top: 0,
        p: 1.5,
        py: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={{
          ":root": {
            "--FirstSidebar-width": "68px",
          },
        }}
      />
      <IconButton
        variant="soft"
        color="neutral"
        onClick={() => closeSidebar()}
        sx={{ display: { md: "none" }, mt: -2, borderRadius: "50%" }}
      >
        <i data-feather="arrow-left" />
      </IconButton>
      <LogoSVG width={40} height={40} color={"darkgray"} sx={{ mb: 0 }} />
      <List sx={{ "--ListItem-radius": "8px", "--List-gap": "12px" }}>
        <Tooltip title="Dashboard" arrow placement="right-end" color="primary" variant={variant}>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <i data-feather="home" />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="All Trips" arrow placement="right-end" color="primary" variant={variant}>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="grid" />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Invite Buddies" arrow placement="right-end" color="primary" variant={variant}>
          <ListItemButton onClick={() => navigate("/invite/buddies")}>
            <i data-feather="user-plus" />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Create Event" arrow placement="right-end" color="primary" variant={variant}>
          <ListItemButton onClick={() => navigate("/event")}>
            <i data-feather="calendar" />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Balance" arrow placement="right-end" color="primary" variant={variant}>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="bar-chart-2" />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Add Buddy" arrow placement="right-end" color="primary" variant={variant}>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="users" />
          </ListItemButton>
        </Tooltip>
      </List>
      <List
        sx={{
          mt: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "end",

          "--ListItem-radius": "8px",
          "--List-gap": "8px",
        }}
      >
        <Tooltip title="Light/Dark Theme" arrow placement="right-end" color="primary" variant={variant}>
          <ColorSchemeToggle sx={{ display: { xs: "none", md: "inline-flex" } }} />
        </Tooltip>
        <Tooltip title="Contact-Us" arrow placement="right-end" color="primary" variant={variant}>
          <ListItem>
            <ListItemButton onClick={() => navigate("/contactus")}>
              <i data-feather="at-sign" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        <Tooltip title="Settings" arrow placement="right-end" color="primary" variant={variant}>
          <ListItem>
            <ListItemButton>
              <i data-feather="settings" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        <Tooltip title="Logout" arrow placement="right-end" color="primary" variant={variant}>
          <ListItem>
            <ListItemButton onClick={logout}>
              <i data-feather="log-out" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
      <Tooltip title={currentUserEmail} arrow placement="right-end" color="primary" variant={variant}>
        <Avatar sx={theme => ({
          backgroundColor: "primary.outlinedBorder",
        })} alt={capitalize(currentUserEmail)} variant="outlined" />
      </Tooltip>
    </Sheet>
  );
}
