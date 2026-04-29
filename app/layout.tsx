import type { Metadata } from "next";
import { IM_Fell_English, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-im-fell"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter"
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat"
});

export const metadata: Metadata = {
  title: "Tiwi Lanre-Adisa",
  description: "UX design portfolio."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${imFellEnglish.variable} ${inter.variable} ${caveat.variable}`}>
      <body>
        <div className="min-h-dvh">
          <Nav />
          <main className="mx-auto w-full max-w-[960px] px-3 py-10 sm:px-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

