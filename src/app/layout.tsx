import type { Metadata } from "next";

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
            <body>
                {children}
            </body>
        </html>
    );
}
