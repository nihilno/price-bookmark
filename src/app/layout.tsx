import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import Providers from "@/components/global/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Home",
    default: "Pounce | Home",
  },
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

        <div className="flex h-dvh flex-col sm:text-lg">
          <Providers>
            <Header />
            <main className="container mx-auto mt-40 mb-8 flex-1 px-4">
              {children}
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
