import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ExperienceSidebar from "@/components/ExperienceSidebar";
import { SceneProvider } from "@/components/SceneContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Yanmar Villanueva | Portfolio",
    template: "%s | Yanmar Villanueva",
  },
  description: "An interactive 3D portfolio by Yanmar Villanueva, featuring practical software projects and experiments.",
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg?v=2"],
    apple: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
  },
  keywords: ["Yanmar Villanueva", "Portfolio", "Web development", "Software projects", "Philippines"],
  openGraph: {
    title: "Yanmar Villanueva | Portfolio",
    description: "An interactive 3D portfolio featuring practical software projects and experiments.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable + " " + playfair.variable + " font-sans"}>
        <SceneProvider>
          <ExperienceSidebar />
          <main>{children}</main>
        </SceneProvider>
      </body>
    </html>
  );
}