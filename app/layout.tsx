import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});


export const metadata: Metadata = {
  title: {
    default: "Medicipher - AI-Powered Medical Documentation & Billing Solutions",
    template: "%s | Medicipher"
  },
  description: "MEDICIPHER is revolutionizing skilled nursing billing and medical documentation workflow with our comprehensive suite of AI-powered software solutions.",
  keywords: ["medical billing", "skilled nursing", "AI healthcare", "medical documentation", "healthcare software", "billing automation", "nursing workflow"],
  authors: [{ name: "Medicipher" }],
  creator: "Medicipher",
  publisher: "Medicipher",
  metadataBase: new URL('https://medicipher.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medicipher.com",
    siteName: "Medicipher",
    title: "Medicipher - AI-Powered Medical Documentation & Billing Solutions",
    description: "MEDICIPHER is revolutionizing skilled nursing billing and medical documentation workflow with our comprehensive suite of AI-powered software solutions.",
    images: [
      {
        url: "/graph-image.png",
        width: 1200,
        height: 630,
        alt: "Medicipher - AI-Powered Healthcare Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicipher - AI-Powered Medical Documentation & Billing Solutions",
    description: "MEDICIPHER is revolutionizing skilled nursing billing and medical documentation workflow with our comprehensive suite of AI-powered software solutions.",
    images: ["/graph-image.png"],
    creator: "@medicipher",
    site: "@medicipher",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
