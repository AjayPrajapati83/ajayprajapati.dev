import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ajay Prajapati | Cybersecurity Specialist & Frontend Developer",
  description: "Results-driven Cybersecurity Specialist and Frontend Developer with expertise in Python, Flutter, Next.js, React Native, and AI integration. Award-winning researcher and tech innovation leader.",
  keywords: [
    "Ajay Prajapati",
    "Cybersecurity Specialist",
    "Frontend Developer",
    "Python Developer",
    "Flutter Developer",
    "Next.js Developer",
    "React Native",
    "Firebase",
    "AI Integration",
    "Gemini API",
    "Cybersecurity Awareness",
    "Mumbai Developer",
    "Web Development",
    "Mobile Development"
  ],
  authors: [{ name: "Ajay Prajapati" }],
  creator: "Ajay Prajapati",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ajayprajapati.dev",
    title: "Ajay Prajapati | Cybersecurity Specialist & Frontend Developer",
    description: "Award-winning Cybersecurity Specialist and Frontend Developer specializing in mobile and web applications with AI integration.",
    siteName: "Ajay Prajapati Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Prajapati | Cybersecurity Specialist & Frontend Developer",
    description: "Award-winning Cybersecurity Specialist and Frontend Developer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
