const React = require("react")

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("link", {
      key: "preconnect-gstatic",
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    }),
    React.createElement("link", {
      key: "ibm-plex-sans",
      rel: "preload",
      as: "style",
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
    }),
    React.createElement("link", {
      key: "ibm-plex-sans-stylesheet",
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
    }),
  ])
}
