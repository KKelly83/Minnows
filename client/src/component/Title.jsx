import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const Title = () => {
  const words = ["Innovative.", "Collaborative", "Engaging."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isDeleting) {
      if (subIndex === 0) {
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1200);
      } else {
        timeoutId = setTimeout(() => {
          setSubIndex((prevSubIndex) => prevSubIndex - 1);
        }, 60);
      }
    } else {
      if (subIndex === words[index].length + 1) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeoutId = setTimeout(() => {
          setSubIndex((prevSubIndex) => prevSubIndex + 1);
        }, 120);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [subIndex, index, words, isDeleting]);

  const blinkCursor = subIndex === 0 || subIndex === words[index].length + 1;
  const cursorColor = blinkCursor ? "navy" : "transparent";

  return (
    <>
      <Text as="span" color="navy">
        {words[index].substring(0, subIndex)}
      </Text>
      <Text as="span" color={cursorColor} className="blink">
        |
      </Text>
    </>
  );
};

export default Title;
