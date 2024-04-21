import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './../components/Header';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travel As You Want",
  description: "Trip Planning Application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header /> {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
