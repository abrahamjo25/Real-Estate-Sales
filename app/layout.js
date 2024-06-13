import { Inter } from "next/font/google";
import "./globals.css";
import Providor from "./Providor";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../components/ui/sonner";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Top Real Estate Sales and Rental Services",
  description: "Discover your dream home with our top-notch real estate services. Whether you're looking to buy, sell, or rent, we offer a wide range of properties to suit all needs and budgets. Explore listings, get expert advice, and find the perfect property today.",
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={inter.className}>
          <Providor>{children}</Providor>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
