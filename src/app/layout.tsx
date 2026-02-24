import type { Metadata } from "next";
import {
  EB_Garamond,
  Geist_Mono,
  Merriweather,
  Mona_Sans,
} from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { envConfig } from "@/configs/env";
import { SITE_CONFIG } from "@/configs/site";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.title,
  description: SITE_CONFIG.metadata.description,
  keywords: SITE_CONFIG.metadata.keywords,
  authors: [
    {
      name: SITE_CONFIG.metadata.author,
      url: SITE_CONFIG.metadata.author_url,
    },
  ],
  publisher: SITE_CONFIG.metadata.publisher,
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const isVietnamese = acceptLanguage.includes("vi");
  return (
    <html
      lang={isVietnamese ? "vi" : "en"}
      suppressHydrationWarning
      className={`${monaSans.variable} ${geistMono.variable} ${ebGaramond.variable} ${merriweather.variable} antialiased`}
    >
      <Script
        src="https://cdn.seline.com/seline.js"
        data-token={envConfig.SELINE_TOKEN}
        strategy="afterInteractive"
      />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <NuqsAdapter>
              <NextTopLoader showSpinner={false} />
              <TooltipProvider>{children}</TooltipProvider>
            </NuqsAdapter>
          </main>
          <ToasterProvider />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
