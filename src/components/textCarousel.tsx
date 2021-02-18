import React, { FunctionComponent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Text } from "./grommet";

const variants = {
  enter: {
    zIndex: 0,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    y: -20,
    opacity: 0,
  },
};

export interface TextCarouselProps {
  /**
   * Array of text to be displayed
   */
  terms: string[];

  /**
   * Delay in seconds
   */
  delay?: number;
}

export const TextCarousel: FunctionComponent<TextCarouselProps> = ({
  terms,
  delay = 3,
}) => {
  const [termIndex, setTermIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setTermIndex((termIndex + 1) % terms.length),
      delay * 1000 // seconds
    );
    return () => clearInterval(interval);
  });

  return (
    <Text>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.span
          key={termIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          style={{ display: "inline-block" }}
        >
          {terms[termIndex]}
        </motion.span>
      </AnimatePresence>
    </Text>
  );
};
