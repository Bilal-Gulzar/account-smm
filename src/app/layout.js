import "./globals.css";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import { AppWrapper } from "@/app/contextApi/Accoutsmm";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import {Montserrat} from "next/font/google"
import LogOut from "./component/logout";

const Mont = Montserrat({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST),
  title: {
    default:
      "Accountsmm -  Buy verified account & Buy Payment Gateway on Accountsmm",
    template: "%s - Buy verified account & Buy Payment Gateway on Accountsmm ",
  },
  description: "Buy Exchanges & Buy Payment Gateways verified | Accountsmm",
  other: {
    'google-site-verification': 'covt8FrNX_PW_SdQkQ0JCeGwYRlEuPKxtIUY4YS_gYo',
  },
  keywords: [
    "verified accounts",
    "buy accounts online",
    "crypto accounts",
    "social media accounts",
    "bank payment gateways",
    "buy verified social media accounts",
    "buy crypto accounts",
    "payment gateway services",
    "exchange rates",
    "secure account transactions",
    "buy crypto currencise",
  ],
  twitter: {
    card: "summary_large_image", // Use a large image card for better visibility
    title: "Accountsmm - Buy Verified Accounts & Payment Gateways",
    description:
      "Buy verified accounts, crypto accounts, bank payment gateways, and social media accounts securely at Accountsmm.",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Mont.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWrapper>
          <div className="flex flex-col min-h-screen justify-between">
            <div>
              <Navbar />
              <Toaster />
              <LogOut />
              {children}
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
