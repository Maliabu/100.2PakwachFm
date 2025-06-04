import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

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

      <footer className="row-start-3 sm:p-3 p-4 bg-black text-white flex gap-[24px] text-sm flex-wrap items-center justify-center">
      <div className="text-sm">Follow us on:</div>
    <a
      className="flex items-center sm:gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.linkedin.com/company/pakwach-fm/about"
      target="_blank"
      rel="noopener noreferrer"
    >
    <div className="font-bold rounded-full border-2 w-8 h-8 grid items-center justify-center">ln</div>
      <span className="sm:block hidden">linkedIn</span>
    </a>
    <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.instagram.com/pakwachfm/"
      target="_blank"
      rel="noopener noreferrer"
    >
    <div className="font-bold rounded-full border-2 w-8 h-8 grid items-center justify-center">i</div>
    <span className="sm:block hidden">instagram</span>
    </a>
    <a
      className="flex items-center font-bold tracking-tight sm:gap-2 hover:underline hover:underline-offset-4"
      href="https://www.facebook.com/100.2pakwachfm"
      target="_blank"
      rel="noopener noreferrer">
    <div className="font-bold rounded-full border-2 w-8 h-8 grid items-center justify-center">f</div>
    <span className="sm:block hidden">facebook</span>
    </a>
  </footer>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
