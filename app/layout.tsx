import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Yanmar Villanueva — Portfolio",
    template: "%s — Yanmar Villanueva",
  },
  description: "A collection of projects, experiments, and practical digital tools by Yanmar Villanueva.",
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg?v=2"],
    apple: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
  },
  keywords: ["Yanmar Villanueva", "Portfolio", "Web development", "Software projects", "Philippines"],
  openGraph: {
    title: "Yanmar Villanueva — Portfolio",
    description: "A collection of projects, experiments, and practical digital tools.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable + " " + playfair.variable + " font-sans"}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
