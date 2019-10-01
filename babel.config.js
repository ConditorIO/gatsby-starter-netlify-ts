const path = require("path");

module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    path.resolve("./conditor/babel")
  ]
};
