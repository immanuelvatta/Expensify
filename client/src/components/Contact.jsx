import { useState, useRef, useEffect } from "react";
import HeroPageLayout from "../components/HeroPageLayout";
import { Link as RouterLink } from "react-router-dom";
import { Link, CardContent, Typography, Button, FormControl, Card } from "@mui/joy"
import FloatingLabelInput from "../components/InputText";
import CardOverflow from "@mui/joy/CardOverflow";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [subject, setSubject] = useState("");
  const [templateParams, setTemplateParams] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber || !subject || !message) {
      console.log("Please enter every field in the form");
      return;
    }
    setTemplateParams({
      message,
      name,
      email,
      phoneNumber,
      subject
    });
    console.log(templateParams);
  }

  useEffect(() => {
    if (Object.keys(templateParams).length > 0) {
      sendEmail();
    }
  }, [templateParams]);
  
  const sendEmail = () => {
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        console.log(result.text, "Status is 200");
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <HeroPageLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg"></Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Contact Us
      </Typography>
      <Card variant="soft" sx={(theme) => ({
        width: { xs: 350, sm: 400, lg: 500 },
        mt: 0,
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
          <Typography
            level="title-md"
            sx={{
              fontSize: 34,
              fontWeight: 700,
              textAlign: "start",
              mt: 2,
              mb: 2,
            }}
          >
            Get in Touch
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl required>
              <FloatingLabelInput
                type="text"
                id="name"
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{
              mt: 2
            }}>
              <FloatingLabelInput
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{
              mt: 2
            }} required>
              <FloatingLabelInput
                type="tel"
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{
              mt: 2
            }} required>
              <FloatingLabelInput
                type="text"
                label="Subject"
                name="subject"
                placeholder="Enter the Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{
              mt: 2
            }} required>
              <FloatingLabelInput
                type="text"
                label="Message"
                name="message"
                placeholder="Leave your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth sx={{
              textAlign: "start",
              mt: 3,
              mb: 3,
            }}>
              Submit
            </Button>
          </form>
        </CardContent>
        <CardOverflow
          variant="soft"
          sx={{ bgcolor: "background.level1" }}
        ></CardOverflow>
      </Card>

      <Typography
        level="body-xs"
        sx={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <RouterLink to="/">BWIV - Expensify</RouterLink>
      </Typography>
    </HeroPageLayout>
  );
}
