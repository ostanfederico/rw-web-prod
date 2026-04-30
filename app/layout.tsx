import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/app-shell/BottomNav";
import { PullToRefresh } from "@/components/app-shell/PullToRefresh";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Prometheus Design System uses Roboto for component-level typography
// (e.g. Button Large = Roboto Medium 15/20). Body text remains Geist
// until the full Prometheus typography pass.
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Montserrat — Prometheus display typography (Amount Input large numbers,
// unit labels like "$" and "BSV", and balance line text).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RW Product Whiteboard",
  description:
    "RockWallet Product Whiteboard — a canvas for PMs and designers to prototype mobile flows. Frontend-only, mocked data.",
  applicationName: "RW PWB",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "RW PWB",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#121c1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PullToRefresh>
          <div className="phone-frame pb-24">{children}</div>
        </PullToRefresh>
        <BottomNav />
      </body>
    </html>
  );
}
