// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "eslint:recommended"],
  ignorePatterns: ["/dist/*"],
  env: {
    browser: true, // Enables browser globals like setTimeout, document, etc.
    es2021: true, // Ensures modern JavaScript syntax support
  },
};
