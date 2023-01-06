import NavBar from "../../components/NavBar/NavBar";
import FacultySideBar from "../../components/Faculty/FacultySideBar";
import FacultySideBarMobile from "../../components/Faculty/FacultySideBarMobile";
export default function PlacementLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<NavBar />
			<div className="flex flex-col sm:flex-row overflow-hidden">
				<FacultySideBar/>
				<FacultySideBarMobile/>
				<div className="w-screen">{children}</div>
			</div>
		</div>
	);
}