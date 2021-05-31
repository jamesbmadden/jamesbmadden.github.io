// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  root: 'web/',
  mount: {
    /* ... */
  },
  plugins: [
    ["snowpack-plugin-raw", { extensions: [".css", ".vert", ".frag"] }]
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
