import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlacementIQ | Decode Placement Trends",
  description: "Access real interview experiences, placement analytics, salary trends, preparation resources, and AI-powered career guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
