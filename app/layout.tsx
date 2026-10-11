import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitorTracker from "@/components/VisitorTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://villanuevayanmar.github.io"),
  title: {
    default: "Yanmar Villanueva | BSIT Student & Aspiring Developer",
    template: "%s | Yanmar Villanueva",
  },
  description:
    "Portfolio of Yanmar Villanueva, a first-year BSIT student building practical tools in C, Python and JavaScript. Open to part-time work.",
  keywords: [
    "Yanmar Villanueva",
    "BSIT",
    "Portfolio",
    "Web Developer",
    "Philippines",
    "Next.js",
  ],
  openGraph: {
    title: "Yanmar Villanueva | BSIT Student & Aspiring Developer",
    description:
      "First-year BSIT student building practical tools in C, Python and JavaScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <VisitorTracker />
        </Providers>
      </body>
    </html>
  );
}
