import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peaarly — Character beats credentials",
  description:
    "Peaarly is a no-nonsense peer mentoring community. Drop a question, pick a peer, grow together.",
  openGraph: {
    title: "Peaarly — Character beats credentials",
    description:
      "Drop a question, pick a peer, grow together.",
    url: "https://peaarly-mvp1.vercel.app",
    siteName: "Peaarly",
    images: [
      {
        url: "/og-peaarly.png",
        width: 1200,
        height: 630,
        alt: "Peaarly Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peaarly — Character beats credentials",
    description:
      "Drop a question, pick a peer, grow together.",
    images: ["/og-peaarly.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
