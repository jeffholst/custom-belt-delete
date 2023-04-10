import { defineConfig } from "vitepress"
import { version } from "../package.json"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: `SVG Belt v. ${version}`,
  base: "/svg-belt/",
  description: "Demo and documentation for SVG Belt",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [],

    socialLinks: [
      { icon: "github", link: "https://github.com/jeffholst/svg-belt" },
    ],
  },
})
