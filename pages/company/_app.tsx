import NavBar from "../../components/NavBar/NavBar";
import CompanySideBar from "../../components/Company/CompanySidebar";
export default function PlacementLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<NavBar />
			<div className="flex flex-col sm:flex-row overflow-hidden">
				<CompanySideBar />
				<div className="w-screen">{children}</div>
			</div>
		</div>
	);
}
