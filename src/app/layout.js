import { Inter } from "next/font/google";
import AppWriteProvider from './appwrite_provider';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "reatret.net",
  description: "reatret.net",
};

export default function RootLayout({ children }) {
  let today = new Date();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWriteProvider>
        {children}
        </AppWriteProvider>
        <div className="
          pt-mono-regular mb-4 lg:mb-10
          text-sm ps-4 pt-8 pb-4
          sm:text-base sm:ps-12">
          © {today.getFullYear()} Daniel Loera, All rights reserved.
        </div>
      </body>
    </html>
  );
}
