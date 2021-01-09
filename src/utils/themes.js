import { base as baseTheme, generate, deepMerge } from "grommet/utils";

// If we ever need to change this, we can regenerate using a different base (24)
// and scale (6) value. 
const baseSpacing = 24;

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
    },

  },
  avatar: {
    size: {
      [`site-small`]: "150px",
      [`site-medium`]: "98px",
      [`site-large`]: "200px",
      [`site-xlarge`]: "400px"
    }
  },
  heading: {
    font: {
      family: "Playfair Display",
      weight: 700
    },
    lineHeight: "1rem"
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
      [`section-heading`]: "#05386B33"
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
      text: "#C5C6C7",
      icon: "#C5C6C7",
      [`section-heading`]: "#66FCF133"
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
      [`section-heading`]: "#E85A4F33"
    }
  }
};

export default [
  deepMerge({}, baseTheme, common, coolAndFresh),
  deepMerge({}, baseTheme, common, strikingAndSimple),
  deepMerge({}, baseTheme, common, minimalYetWarm)
];