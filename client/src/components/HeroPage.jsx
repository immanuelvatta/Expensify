import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import HeroPageLayout from "../components/HeroPageLayout";
import { Link as RouterLink } from "react-router-dom";

export default function HeroPage() {
  return (
    <HeroPageLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg"></Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        BWIV Expensify
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        Your financial journey made easy with our intuitive expense tracker.
      </Typography>
      <RouterLink to={"/signup"}>
        <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
          Get Started
        </Button>
      </RouterLink>
      <Typography>
        Already a member?{" "}
        <RouterLink fontSize="sm" to={"/login"} fontWeight="lg">
          Sign in
        </RouterLink>
      </Typography>

      <Typography
        level="body-xs"
        sx={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        BWIV - Expensify
      </Typography>
    </HeroPageLayout>
  );
}
