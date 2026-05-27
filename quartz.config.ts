import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "⛅️ Beyond The Clouds",
    pageTitleSuffix: "Beyond The Clouds",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "topsideboss2.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display",
        body: "Lato",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fdfdfc",
          lightgray: "#eaeae6",
          gray: "#9d9b94",
          darkgray: "#3c3b36",
          dark: "#1c1b18",
          secondary: "#d97706",
          tertiary: "#92400e",
          highlight: "rgba(217, 119, 6, 0.1)",
          textHighlight: "rgba(217, 119, 6, 0.2)",
        },
        darkMode: {
          light: "#111110",
          lightgray: "#333330",
          gray: "#6f6d66",
          darkgray: "#c7c5bc",
          dark: "#eeece7",
          secondary: "#f59e0b",
          tertiary: "#fde68a",
          highlight: "rgba(245, 158, 11, 0.1)",
          textHighlight: "rgba(245, 158, 11, 0.2)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
