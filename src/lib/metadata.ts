import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "Haritha Akkad — Software Engineer",
    template: "%s | Haritha Akkad",
  },
  description:
    "Senior software engineer building at the intersection of mobile, backend, and generative AI.",
  metadataBase: new URL("https://harithaakkad.dev"),
  openGraph: {
    title: "Haritha Akkad — Software Engineer",
    description:
      "Senior software engineer building at the intersection of mobile, backend, and generative AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
