import { useEffect, useState } from "react";
import { useColorScheme } from "@mui/joy/styles";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import IconButton from "@mui/joy/IconButton";

export default function ColorSchemeToggle({...props }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}