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
				<div className="w-screen sm:3/5 md:4/5">{children}</div>
			</div>
		</div>
	);
}
