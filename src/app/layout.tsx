import Header from "@/app/Header";
import { ThemeProvider } from "@/app/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProviders from "@/hook/useReactQuery";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kick-off",
  description: "Generated by create next app",
};

const fontSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontGiants = localFont({
  src: "./Giants-Inline.otf",
  variable: "--font-giants",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"ko"}>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          fontSans.variable,
          fontGiants.variable
        )}
      >
        <ReactQueryProviders>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main
              className={
                "m-auto flex w-full max-w-screen-sm flex-1 flex-col border-x p-4"
              }
            >
              {children}
            </main>
          </ThemeProvider>
        </ReactQueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
