import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Papyrus",
  description: "The connected wordkspace where better, faster work happens.",
  // icons: {
  //   icon: [
  //     {
  //       media: "(prefers-color-scheme: light)",
  //       url: '/logo.svg',
  //       href: '/logo.svg'
  //     },
  //       {
  //         media: "(prefers-color-scheme: dark)",
  //         url: '/logo-dark.svg',
  //         href: '/logo-dark.svg'
  //       },
  //   ]
  // }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
        <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
         storageKey="papyrus-theme-2"
        >
        {children}
        </ThemeProvider>
        </ConvexClientProvider>
        </body>
    </html>
  );
}
