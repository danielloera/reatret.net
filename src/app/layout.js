import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "reatret.net",
  description: "reatret.net",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <a href="/">
        <div className="
          pt-mono-regular bg-stone-900/95 h-fit fixed-top
          text-fuchsia-200
          text-xl     ps-4    pt-4    pb-4
          sm:text-3xl sm:ps-6 sm:pt-4 sm:pb-4">
                reatret.net
        </div>
      </a>
      {children}
      </body>
    </html>
  );
}
