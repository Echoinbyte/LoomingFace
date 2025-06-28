import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LoomingFace",
  description:
    "A beautiful and intuitive avatar builder that allows users to create unique face portraits by combining different facial features. Part of the NepLoom ecosystem.",
  applicationName: "LoomingFace",
  manifest: "/manifest.json",
  themeColor: "#ef4444",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", url: "/icons/icon-16x16.png", sizes: "16x16" },
    { rel: "icon", url: "/icons/icon-32x32.png", sizes: "32x32" },
    { rel: "icon", url: "/icons/icon-48x48.png", sizes: "48x48" },
    { rel: "icon", url: "/icons/icon-57x57.png", sizes: "57x57" },
    { rel: "icon", url: "/icons/icon-60x60.png", sizes: "60x60" },
    { rel: "icon", url: "/icons/icon-72x72.png", sizes: "72x72" },
    { rel: "icon", url: "/icons/icon-76x76.png", sizes: "76x76" },
    { rel: "icon", url: "/icons/icon-96x96.png", sizes: "96x96" },
    { rel: "icon", url: "/icons/icon-120x120.png", sizes: "120x120" },
    { rel: "icon", url: "/icons/icon-128x128.png", sizes: "128x128" },
    { rel: "icon", url: "/icons/icon-144x144.png", sizes: "144x144" },
    { rel: "icon", url: "/icons/icon-152x152.png", sizes: "152x152" },
    { rel: "icon", url: "/icons/icon-167x167.png", sizes: "167x167" },
    { rel: "icon", url: "/icons/icon-180x180.png", sizes: "180x180" },
    { rel: "icon", url: "/icons/icon-192x192.png", sizes: "192x192" },
    { rel: "icon", url: "/icons/icon-256x256.png", sizes: "256x256" },
    { rel: "icon", url: "/icons/icon-384x384.png", sizes: "384x384" },
    { rel: "icon", url: "/icons/icon-512x512.png", sizes: "512x512" },
    { rel: "icon", url: "/icon512_maskable.png", sizes: "512x512" },
    { rel: "icon", url: "/icon512_rounded.png", sizes: "512x512" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LoomingFace",
    startupImage: [
      {
        url: "/icons/splash-640x1136.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-750x1334.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-1242x2208.png",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/icons/splash-1125x2436.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/icons/splash-828x1792.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-1242x2688.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/icons/splash-1536x2048.png",
        media:
          "(min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-1668x2224.png",
        media:
          "(min-device-width: 834px) and (max-device-width: 1112px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-1668x2388.png",
        media:
          "(min-device-width: 834px) and (max-device-width: 1194px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/splash-2048x2732.png",
        media:
          "(min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  openGraph: {
    title: "LoomingFace",
    description:
      "A beautiful and intuitive avatar builder that allows users to create unique face portraits by combining different facial features. Part of the NepLoom ecosystem.",
    type: "website",
    url: "https://loomingface.vercel.app",
    images: [
      {
        url: "/banner.png",
        alt: "LoomingFace Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "LoomingFace",
    description:
      "A beautiful and intuitive avatar builder that allows users to create unique face portraits by combining different facial features. Part of the NepLoom ecosystem.",
    images: [
      {
        url: "/banner.png",
        alt: "LoomingFace Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="A beautiful and intuitive avatar builder that allows users to create unique face portraits by combining different facial features. Part of the NepLoom ecosystem."
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LoomingFace" />
        <meta name="application-name" content="LoomingFace" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icons/ms-icon-144x144.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden lg:overflow-auto`}
      >
        {children}
      </body>
    </html>
  );
}
