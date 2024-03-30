import React from "react";
import { Box, Icon, Heading, Image } from "@chakra-ui/react";
import fishSwimming from "../../assets/fishSwimming.mp4";
import logo from "../../assets/logo.png";
import Login from "./Login";

const BackgroundVideo = ({ src }) => {
  return (
    <Box
      position="absolute"
      height="100vh"
      width="100vw"
      overflow="hidden"
      left={"0"}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={fishSwimming} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box position="absolute" top="0" left="0" right="0" bottom="0">
        <Box display="flex" justifyContent="space-between" p={"1em"}>
          <Box display="flex" justifyContent="start" alignItems="center">
            <Image
              src={logo}
              fontSize={"lg"}
              h={"3em"}
              w={"3em"}
              p={"0"}
              mr={"0.5em"}
            />
            <Heading>Minnows</Heading>
          </Box>
        </Box>
        <Box
          w={"full"}
          display={"flex"}
          mt={"20%"}
          justifyContent={"center"}
          fontSize={"2.5em"}
          fontWeight={"bold"}
        >
          <Box w>A new and fun way to succeed from your class!</Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Login />
        </Box>
      </Box>
    </Box>
  );
};

export default BackgroundVideo;
