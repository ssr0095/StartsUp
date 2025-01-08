import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const outFit = localFont({
  src: [
    {
      path: "./fonts/Outfit-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-Thin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Starts Up - Empower Your Ideas",
  description:
    "Starts Up is the ultimate platform to launch, scale, and manage your startups effortlessly. Join the community today!",
  openGraph: {
    title: "Starts Up - Empower Your Ideas",
    description:
      "Launch, scale, and manage your startup with our easy-to-use platform. Collaborate, innovate, and achieve success with Starts Up.",
    url: "https://starts-up.vercel.app/",
    siteName: "Starts Up",
    images: [
      {
        url: "https://starts-up.vercel.app/static/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Starts Up - Empower Your Ideas",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starts Up - Empower Your Ideas",
    description:
      "Starts Up helps you launch, scale, and manage your startup effortlessly. Join the movement today!",
    images: ["https://starts-up.vercel.app/static/images/og-image.webp"],
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
        <link
          rel="preconnect"
          href="https://o4508493446643712.ingest.us.sentry.io"
          crossOrigin=""
        />
        <link
          rel="dns-prefetch"
          href="https://o4508493446643712.ingest.us.sentry.io"
        />
      </head>
      <body className={`${outFit.variable}`}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
