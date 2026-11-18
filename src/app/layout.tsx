import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:5443"),
  title: "Garaga Venkatesh | Senior Full Stack Developer & Cloud Engineer",
  description:
    "Portfolio of Garaga Venkatesh — 6 years of experience architecting scalable web applications using Python (Django, FastAPI), React.js, Apache Kafka, MySQL, Docker, and Kubernetes. Client deliverables for Aeronautical Development Agency (ADA) and Enterprise ERPs.",
  keywords: [
    "Garaga Venkatesh",
    "Full Stack Developer",
    "Python Developer",
    "FastAPI",
    "Django",
    "React.js",
    "Apache Kafka",
    "Kubernetes",
    "Docker",
    "Playwright",
    "Bangalore Software Engineer",
  ],
  authors: [{ name: "Garaga Venkatesh" }],
  openGraph: {
    title: "Garaga Venkatesh | Senior Full Stack Developer & Cloud Engineer",
    description:
      "6 years of experience architecting scalable web applications, event-driven streaming pipelines, and resilient cloud systems.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Garaga Venkatesh - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garaga Venkatesh | Senior Full Stack Developer",
    description:
      "Building scalable web applications with Python, Django, FastAPI, React.js, and Apache Kafka.",
    images: ["/profile.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-sky-500 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
