import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Trading Education & Community | Think Beyond the Market`,
  description: site.description,
  openGraph: {
    title: `${site.name} — Trading Education & Community`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${space.variable} bg-brand-void text-[#F5F5F2] font-sans antialiased selection:bg-brand-gold selection:text-black overflow-x-hidden custom-scrollbar`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
