import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/modules/shared/ui/header";
import { ProductsProvider } from "@/modules/products/infrastructure/products-provider";
import { CartProvider } from "@/modules/cart/infrastructure/cart-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mobile Shop Test",
    description: "Next.js Hexagonal Architecture Test",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
            >
                <ProductsProvider>
                    <CartProvider>
                        <Header />
                        <main>
                            {children}
                        </main>
                    </CartProvider>
                </ProductsProvider>
            </body>
        </html>
    );
}
