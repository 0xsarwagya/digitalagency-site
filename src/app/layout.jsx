import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LiveChat } from "@/components/live-chat";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { ScrollToTop } from "@/components/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DigitalAgency - Transform Your Business with Digital Solutions",
  description:
    "Professional web development, mobile apps, UI/UX design, and digital marketing services. Transform your business with cutting-edge digital solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <LiveChat />
        <NewsletterPopup />
        <ScrollToTop />
      </body>
    </html>
  );
}
