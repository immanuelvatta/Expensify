import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { typographyClasses } from "@mui/joy/Typography";

export default function HeroPageLayout({ children, reversed }) {
  const theme = useTheme();
  const [bgImgString, setBgImgString] = useState(
    "https://images.pexels.com/photos/106152/euro-coins-currency-money-106152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const [imgArr, setImgArr] = useState([]);
  const [bgImageIdx, setBgImageIdx] = useState(0);

  const getRandIdx = () => {
    return Math.floor(Math.random() * imgArr.length);
  };

  useEffect(() => {
    const getImage = async (image = "cash", numImage = 15) => {
      const url = `https://api.pexels.com/v1/search?query=${image}&per_page=${numImage}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setImgArr(data.photos);
        } else {
          console.error(await response.json());
        }
      } catch (error) {
        console.error(error);
      }
    };

    getImage();
  }, []);

  useEffect(() => {
    if (imgArr.length > 0) {
      const interval = setInterval(() => {
        let newIdx = getRandIdx();
        while (newIdx === bgImageIdx) {
          newIdx = getRandIdx();
        }
        setBgImageIdx(newIdx);
        setTimeout(() => {
          setBgImageIdx(newIdx);
          setBgImgString(imgArr[newIdx].src.original);
        }, 750);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [bgImageIdx, imgArr]);

  const isXsScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  let aspectRatio, maxHeight;

  if (isXsScreen) {
    aspectRatio = 700 / 520;
    maxHeight = 700;
  } else if (isMdScreen) {
    aspectRatio = 600 / 400;
    maxHeight = 400;
  } else if (isLgScreen) {
    // Set aspect ratio and maxHeight for lg screens
    aspectRatio = 800 / 600;
    maxHeight = 600;
  }

  return (
    <Container
      sx={(theme) => ({
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: reversed ? "column-reverse" : "column",
        alignItems: "center",
        py: 10,
        gap: 4,
        [theme.breakpoints.up("md")]: {
          flexDirection: "row",
          gap: 6,
        },
        [theme.breakpoints.up("lg")]: {
          gap: 12,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "50ch",
          textAlign: "center",
          flexShrink: 999,
          [theme.breakpoints.up("md")]: {
            minWidth: 420,
            alignItems: "flex-start",
            textAlign: "initial",
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
        })}
      >
        {children}
      </Box>
      <AspectRatio
        ratio={aspectRatio}
        variant="outlined"
        maxHeight={maxHeight}
        sx={{
          minWidth: 300,
          backgroundImage: `url(${bgImgString})`,
          backgroundSize: "contain",
          borderRadius: "lg",
          bgcolor: "background.level3",
          flexBasis: "50%",
          transition: "background-image 5s ease-out"
        }}
      ></AspectRatio>
    </Container>
  );
}
