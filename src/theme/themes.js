import { base as baseTheme } from "grommet";
import { deepMerge } from "grommet/utils";


/**
 * One of the major misses in the Grommet Theming is that it's easy to make minor changes to typography.  
 * For example, I'm not a huge fan of the original Heading sizes, nor the method in which they are 
 * "responsive".  It would have been cool if they were made available externally - or maybe added to
 * `grommet-styles` project.
 */
const baseSpacing = 24, scale = 6;
const baseFontSize = baseSpacing * 0.75; // 18
const fontScale = baseSpacing / scale; // 4

const fontSizing = factor => ({
  size: `${baseFontSize + factor * fontScale}px`,
  height: `${baseSpacing + factor * fontScale}px`,
  maxWidth: `${baseSpacing * (baseFontSize + factor * fontScale)}px`,
});

export const common = {
  global: {
    breakpoints: {
      medium: {
        value: baseSpacing * 50, // 1200
      },
      large: {
        value: baseSpacing * 90,
      },
      xlarge: {
        // Anything above large
      }
    },
    font: {
      family: `"Merriweather", serif`
    }
  },
  anchor: {
    color: "brand"
  },
  avatar: {
    size: {
      [`site-small`]: "92px",
      [`site-medium`]: "98px",
      [`site-large`]: "256px",
      [`site-xlarge`]: "400px"
    }
  },
  heading: {
    font: {
      family: "Playfair Display"
    },
    weight: 400,
    level: {
      [`1`]: {
        small: { ...fontSizing(8) },
        medium: { ...fontSizing(12) },
        large: { ...fontSizing(16) },
        xlarge: { ...fontSizing(24) }
      },
      [`2`]: {
        small: { ...fontSizing(4) },
        medium: { ...fontSizing(6) },
        large: { ...fontSizing(12) },
        xlarge: { ...fontSizing(16) }
      },
      [`3`]: {
        small: { ...fontSizing(2) },
        medium: { ...fontSizing(3) },
        large: { ...fontSizing(8) },
        xlarge: { ...fontSizing(12) }
      },
      [`4`]: {
        small: { ...fontSizing(1) },
        medium: { ...fontSizing(2) },
        large: { ...fontSizing(6) },
        xlarge: { ...fontSizing(10) }
      },
      [`5`]: {
        small: { ...fontSizing(0.5) },
        medium: { ...fontSizing(1) },
        large: { ...fontSizing(4) },
        xlarge: { ...fontSizing(8) }
      },
      [`6`]: {
        small: { ...fontSizing(0) },
        medium: { ...fontSizing(0) },
        large: { ...fontSizing(2) },
        xlarge: { ...fontSizing(4) }
      }
    },
    lineHeight: "1rem"
  },
  grommet: {
    extend: {
      width: "initial"
    }
  },
  layer: {
    background: "transparent"
  },
  paragraph: {
    small: { ...fontSizing(-1) },
    medium: { ...fontSizing(0.25) },
    large: { ...fontSizing(4) },
    xlarge: { ...fontSizing(6) },
    xxlarge: { ...fontSizing(8) },
  }
}

// Cool and Fresh
export const coolAndFresh = {
  global: {
    colors: {
      [`background`]: "#ffffff",
      [`background-back`]: "#ffffff",
      [`background-front`]: "#5CDB95",
      brand: "#05386B",
      text: "#181818",
      icon: "#181818",
      [`section-heading`]: "#05386B44",
      fab: "#ffffff"
    }
  }
};

// Sleek and Futuristic
export const strikingAndSimple = {
  global: {
    colors: {
      [`background`]: "#1F2833",
      [`background-back`]: "#1F2833",
      [`background-front`]: "#0B0C10",
      brand: "#66FCF1",
      text: "#e7e7e7",
      icon: "#e7e7e7",
      [`section-heading`]: "#66FCF144",
      fab: "text"
    }
  }
};

// Minimal Yet Warm
export const minimalYetWarm = {
  global: {
    colors: {
      [`background`]: "#EAE7DC",
      [`background-back`]: "#EAE7DC",
      [`background-front`]: "#D8C3A5",
      brand: "#E85A4F",
      text: "#181818",
      icon: "#181818",
      [`section-heading`]: "#E85A4F44",
      fab: "text"
    }
  }
};

export default [
  deepMerge({}, baseTheme, common, coolAndFresh),
  deepMerge({}, baseTheme, common, strikingAndSimple),
  deepMerge({}, baseTheme, common, minimalYetWarm)
];
