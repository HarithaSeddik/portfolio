import type { Metadata } from "next";

const BASE_URL = "https://harithaakkad.dev";
const DEFAULT_DESCRIPTION =
  "Senior software engineer building at the intersection of mobile, backend, and generative AI.";

export { BASE_URL };

export function buildOgUrl(title: string, description: string) {
  const params = new URLSearchParams({ title, description });
  return `${BASE_URL}/og?${params.toString()}`;
}

export const siteMetadata: Metadata = {
  title: {
    default: "Haritha Akkad — Software Engineer",
    template: "%s | Haritha Akkad",
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Haritha Akkad — Software Engineer",
    description: DEFAULT_DESCRIPTION,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: buildOgUrl("Haritha Akkad", DEFAULT_DESCRIPTION),
        width: 1200,
        height: 630,
        alt: "Haritha Akkad — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
