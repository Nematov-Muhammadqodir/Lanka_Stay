const path = require("path");

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en", "uz"],
    localeDetection: false,
  },
  // Absolute path so it works in Vercel serverless (where cwd is not the project root)
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
