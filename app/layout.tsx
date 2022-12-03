"use client";
import "../styles/globals.css";
import { Inter } from "@next/font/google";
 import AuthProvider from '../contexts/AuthContext';


const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className={`${inter.variable} font-sans`}>
			<head />
			<AuthProvider><body className="bg-slate-100">{children}</body></AuthProvider>
		</html>
	);
}
