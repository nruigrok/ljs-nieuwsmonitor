import { absoluteUrl } from "@/lib/utils";
import "./globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "LJS Nieuwsmonitor",
    template: "%s | LJS",
  },
  description:
    "LJS Nieuwsmonitor - Onderzoeksbureau van Nel Ruigrok en Wouter van Atteveldt",
  openGraph: {
    title: "LJS Nieuwsmonitor",
    description: "Onderzoeksbureau van Nel Ruigrok en Wouter van Atteveldt.",
    url: absoluteUrl("/"),
    //siteName: "Next.js",
    // images: [
    //   {
    //     url: absoluteUrl("/images/og-image.png"),
    //     width: 1800,
    //     height: 1600,
    //   },
    // ],
    locale: "nl_NL",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon/favicon-32x32.png" }],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
