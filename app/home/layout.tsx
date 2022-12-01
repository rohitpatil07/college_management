import Header from "./Header";

export default function StuLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-screen h-screen">
			<Header />
			{children}
		</div>
	);
}
