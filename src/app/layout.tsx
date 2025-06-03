import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Speek",
	description: "Simple, minimal, and quick AI chat-bot application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.className} antialiased bg-black text-white`}
			>
				<Suspense fallback={null}>
					{children}
				</Suspense>
			</body>
		</html>
	);
}
