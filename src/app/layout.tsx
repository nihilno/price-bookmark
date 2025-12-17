import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pounce | Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "relative min-h-dvh antialiased")}>
        <video
          autoPlay
          muted
          playsInline
          loop
          poster="/bg-poster.webp"
          className="fixed inset-0 -z-10 h-full w-full object-cover"
        >
          <source
            src="/bg-optimized-downscaled-keyframed.webm"
            type="video/webm"
          />
        </video>

        <div className="sm:text-lg">
          <Providers>
            <Header />
            <main className="container mx-auto my-8 px-4">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
