const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import("@docusaurus/types").DocusaurusConfig} */
module.exports = {
  title: "WebMidi.js",
  tagline: "Kickstart your JavaScript MIDI projects!",
  url: "https://webmdidijs.org",
  baseUrl: "/webmidi/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "djipco",
  projectName: "webmidi",
  themeConfig: {
    navbar: {
      // title: "My Site",
      logo: {
        alt: "WebMidi.js",
        src: "img/webmidijs-logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "index",
          position: "left",
          label: "Documentation",
        },
        {
          to: "api",
          label: "API",
          position: "left",
        },
        {
          to: "showcase",
          label: "Showcase",
          position: "left",
        },
        {
          href: "https://github.com/djipco/webmidi/discussions",
          label: "Forum",
          position: "right",
        },
        {
          href: "https://github.com/djipco/webmidi",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository"
        },
      ],
    },
    footer: {
      style: "dark",
      // links: [
      //   {
      //     title: "Docs",
      //     items: [
      //       {
      //         label: "Tutorial",
      //         to: "/docs/intro",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Community",
      //     items: [
      //       {
      //         label: "Stack Overflow",
      //         href: "https://stackoverflow.com/questions/tagged/docusaurus",
      //       },
      //       {
      //         label: "Discord",
      //         href: "https://discordapp.com/invite/docusaurus",
      //       },
      //       {
      //         label: "Twitter",
      //         href: "https://twitter.com/docusaurus",
      //       },
      //     ],
      //   },
      //   {
      //     title: "More",
      //     items: [
      //       {
      //         label: "Blog",
      //         to: "/blog",
      //       },
      //       {
      //         label: "GitHub",
      //         href: "https://github.com/facebook/docusaurus",
      //       },
      //     ],
      //   },
      // ],
      copyright: `© 2015-${new Date().getFullYear()} Jean-Philippe Côté`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    // algolia: {
    //   apiKey: "YOUR_API_KEY",
    //   indexName: "YOUR_INDEX_NAME",
    //
    //   // Optional: see doc section below
    //   contextualSearch: true,
    //
    //   // Optional: see doc section below
    //   appId: "YOUR_APP_ID",
    //
    //   // Optional: Algolia search parameters
    //   searchParameters: {},
    //
    //   //... other Algolia params
    // },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/djipco/webmidi/edit/master/docusaurus/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/djipco/webmidi/edit/master/docusaurus/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
