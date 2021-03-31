const path = require("path");
module.exports = {
  siteMetadata: {
    title: "gatsby-dfx",
  },
  plugins: ["gatsby-plugin-styled-components"],
  proxy: {
    prefix: "/api",
    url: "http://localhost:8000",
  },
};
