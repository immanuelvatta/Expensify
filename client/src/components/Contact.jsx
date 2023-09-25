import { useState, useRef } from "react";
import ArrowForward from "@mui/icons-material/ArrowForward";
import HeroPageLayout from "../components/HeroPageLayout";
import { Link as RouterLink } from "react-router-dom";
import { Link, CardContent, Typography, Button, FormControl, Card } from "@mui/joy"
import AspectRatio from "@mui/joy/AspectRatio";
import FloatingLabelInput from "../components/InputText";
import CardOverflow from "@mui/joy/CardOverflow";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });

  const sendEmail = (e) => {
    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_CONTACT_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formRef.current, import.meta.env.VITE_EMAILJS_PUBLIC_CONTACT_KEY)
      .then((result) => {
        console.log(result.text, "Status is 200");
      }, (error) => {
        console.log(error.text);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendEmail(e)
    setContactForm({
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
    })
  }
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setContactForm((prev) =>
      ({ ...prev, [name]: value }))
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
              textAlign: "start",
              mt: 2,
              mb: 2,
            }}
          >
            Get in Touch
          </Typography>
          <form onSubmit={handleSubmit} ref={formRef}>
            <FormControl >
              <FloatingLabelInput
                type="text"
                label="Name"
                name="name"
                placeholder="Enter your name"
                onChange={onChangeHandler}
                value={contactForm.name}
              />
            </FormControl>
            <FormControl >
              <FloatingLabelInput
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                onChange={onChangeHandler}
                value={contactForm.email}
              />
            </FormControl>
            <FormControl >
              <FloatingLabelInput
                type="tel"
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                onChange={onChangeHandler}
                value={contactForm.phoneNumber}
              />
            </FormControl>
            <FormControl >
              <FloatingLabelInput
                type="text"
                label="Subject"
                name="subject"
                placeholder="Enter the Subject"
                onChange={onChangeHandler}
                value={contactForm.subject}
              />
            </FormControl>
            <FormControl >
              <FloatingLabelInput
                type="text"
                label="Message"
                name="message"
                placeholder="Leave your message"
                onChange={onChangeHandler}
                value={contactForm.message}
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
