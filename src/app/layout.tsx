import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import CookieConsent from "./cookies";
import ClientRootWrapper from "./clientRoot";
import ScrollToTopButton from "./scrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pakwach FM",
  description: "100.2 Pakwach FM official website for news, sports, entertainment and bringing the Pakwach community together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CookieConsent/>
            <ClientRootWrapper>        {children} <ScrollToTopButton/>
            </ClientRootWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
