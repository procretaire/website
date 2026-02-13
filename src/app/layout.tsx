import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import meta from "@/data/metadata.json";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.site.url),
  title: meta.site.title,
  description: meta.site.description,
  authors: [{ name: meta.site.author }],
  keywords: meta.seo.keywords,
  openGraph: {
    type: "website",
    locale: meta.site.locale,
    url: meta.site.url,
    title: meta.site.title,
    description: meta.site.description,
    images: [
      {
        url: meta.seo.ogImage,
        alt: meta.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.site.title,
    description: meta.site.description,
    images: [meta.seo.ogImage],
    creator: meta.seo.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={meta.site.language}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Procretaire" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
