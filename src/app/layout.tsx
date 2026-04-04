import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Anchored in Christ Baptist Camp",
    default: "Anchored in Christ Baptist Camp",
  },
  description:
    "A Christ-centered youth ministry committed to reaching, reviving, and raising up the next generation for the glory of God.",
  openGraph: {
    title: "Anchored in Christ Baptist Camp",
    description:
      "A Christ-centered youth ministry committed to reaching, reviving, and raising up the next generation for the glory of God.",
    siteName: "ACBC",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
