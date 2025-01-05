import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";

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
  title: "Starts up",
  description: "Pitch, claim and vote",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outFit.variable}`}>{children}</body>
    </html>
  );
}
