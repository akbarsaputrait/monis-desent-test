import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://monis.rent";
const siteName = "monis.rent";

export const metadata: Metadata = {
  title: {
    default: "Monis Workspace Configurator — Design Your Bali Workspace",
    template: "%s | monis.rent",
  },
  description:
    "Rent workspace essentials in Bali — monitors, desks, chairs & more. Design your ideal setup and have it delivered to your villa or coworking space.",
  keywords: [
    "Rent Monitors Bali",
    "Workspace Configurator",
    "Monitor Rental",
    "Office Equipment Rental",
    "Bali Remote Work",
    "Desk Rental Bali",
    "Gaming Monitors",
    "Flexible Rentals",
  ],
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName,
    title: "Monis Workspace Configurator — Design Your Bali Workspace",
    description:
      "Rent your remote work setup in Bali. Monitors, desks, chairs, gaming gear, and more — delivered to your door. Next day delivery.",
    url: siteUrl,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "monis.rent — Rent tech equipment in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monis Workspace Configurator — Design Your Bali Workspace",
    description:
      "Rent your remote work setup in Bali. Monitors, desks, chairs, gaming gear, and more — delivered to your door.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
