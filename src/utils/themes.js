import { base as baseTheme, deepMerge } from "grommet/utils";


export const common = {
  global: {
    font: {
      family: `"Merriweather", serif`
    },

  },
  avatar: {
    size: {
      site: "200px"
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
      [`section-heading`]: "#37968344"
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
      [`section-heading`]: "#45A29E33"
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
      [`section-heading`]: "#DE8D8A33"
    }
  }
};

export default [
  deepMerge({}, baseTheme, common, coolAndFresh),
  deepMerge({}, baseTheme, common, strikingAndSimple),
  deepMerge({}, baseTheme, common, minimalYetWarm)
];