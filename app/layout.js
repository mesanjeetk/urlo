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

export const metadata = {
  title: "URLO",
  description:
    "URLO is the fastest way to shorten, track, and share URLs. Boost your digital reach with lightning speed.",
  keywords: [
    "URL shortener",
    "link shortener",
    "shorten URL",
    "URL short link",
    "custom short links",
    "QR code generator",
    "URL tracking",
    "URL analytics",
    "short URL generator",
    "shareable links",
    "URL management",
    "fast URL shortener",
    "free URL shortener",
    "short URL API",
    "digital marketing tools",
    "social media links",
  ],
  authors: [{ name: "Sanjeet Kumar", url: "https://urlo.vercel.app" }],
  creator: "Sanjeet Kumar",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="GCqul-vepBbSrbJ2nK15J3zAeu2jg99l4jHGHd_niEU" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
