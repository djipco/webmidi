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

  scripts: [
    // Inject MailChimp newsletter pop-up in <head>
    {
      src: "/scripts/mailchimp/newsletter-exit-prompt.js",
      async: true,
      id: "mcjs"
    }
  ],

  themeConfig: {
    navbar: {
      // title: "My Site",
      logo: {
        alt: "WebMidi.js",
        src: "img/webmidijs-logo-dark.svg",
        srcDark: "img/webmidijs-logo-light.svg",
      },
      items: [
        {
          type: "doc",
          docId: "index",
          position: "left",
          label: "Documentation",
        },
        {
          type: "dropdown",
          label: "API",
          position: "left",
          items: [
            {
              label: "3.0.0-alpha.16",
              to: "api/index",
            },
            {
              label: "2.5.3 (stable, recommended)",
              href: "https://djipco.github.io/webmidi/archives/api/v2/"
            },
            {
              label: "1.0.0-beta.15",
              href: "https://djipco.github.io/webmidi/archives/api/v1/classes/WebMidi.html"
            }
          ]
        },
        {
          type: "dropdown",
          label: "Community",
          position: "left",
          items: [
            {
              label: "GitHub Discussions",
              href: "https://github.com/djipco/webmidi/discussions"
            },
            {
              label: "Forum (Archived)",
              href: "https://webmidijs.org/forum/"
            }
          ]
        },
        {
          to: "showcase",
          label: "Showcase",
          position: "left",
        },
        {
          to: "about",
          label: "About",
          position: "left",
        },
        {
          href: "https://github.com/djipco/webmidi",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository"
        },

      ]
    },
    footer: {
      style: "dark",
      logo: {
        alt: "WebMidi.js",
        src: "static/img/webmidijs-logo-dark.svg",
        srcDark: "static/img/webmidijs-logo-light.svg",
      },
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `© 2015-${new Date().getFullYear()} Jean-Philippe Côté`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    algolia: {
      apiKey: "af63ae0f5f71033e19ac5047d02b08bb",
      indexName: "webmidi",
      appId: "BH4D9OD16A",

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
      placeholder: "Search website..."
    },
    image: "og-card.png",
    announcementBar: {
      id: "github-banner",
      content: "If you like WebMidi.js, give it a star ⭐ or sponsor it 💜 on <a target='_blank' " +
        "href='https://github.com/djipco/webmidi'>GitHub</a>! "
    },
    gtag: {
      trackingID: "UA-162785934-1",
    },
    googleAnalytics: {
      trackingID: "UA-162785934-1"
    },
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        theme: {
          customCss: [
            require.resolve("./src/css/custom.scss"),
            require.resolve("./src/css/index.scss"),
          ],
        },
        docs: {
          path: "docs",
          lastVersion: "current",
          onlyIncludeVersions: ["current"],
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/djipco/webmidi/edit/master/website/",
        },
        blog: false,
        pages: {},
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api",
        path: "api",
        routeBasePath: "api",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "docusaurus-plugin-sass",
      {

      }
    ],
  ],

};
