import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/layout/SkipLink";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/background/NoiseOverlay";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransition from "@/components/transitions/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-phi-cyan-86.vercel.app"),
  title: {
    default: "Vishal Kumar Sharma — Full-Stack & AI Developer",
    template: "%s | Vishal Kumar Sharma",
  },
  description:
    "Third-year Computer Engineering student (expected 2028) building full-stack applications with React, Next.js, TypeScript, and Python/FastAPI, plus machine-learning pipelines with scikit-learn and Apache Kafka. 145+ passing pytest and Playwright tests.",
  keywords: [
    "developer",
    "portfolio",
    "full-stack",
    "AI",
    "machine learning",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "scikit-learn",
    "Apache Kafka",
    "Docker",
    "testing",
    "Three.js",
    "GSAP",
  ],
  openGraph: {
    title: "Vishal Kumar Sharma — Full-Stack & AI Developer",
    description:
      "Full-stack applications with React, Next.js, TypeScript, and Python/FastAPI, plus ML pipelines with scikit-learn and Apache Kafka.",
    siteName: "Vishal Kumar Sharma",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vishal Kumar Sharma — Full-Stack & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Kumar Sharma — Full-Stack & AI Developer",
    description:
      "Full-stack applications with React, Next.js, TypeScript, and Python/FastAPI, plus ML pipelines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScrollProvider>
          <SkipLink />
          <CustomCursor />
          <NoiseOverlay />
          <Navbar />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
