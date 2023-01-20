import NavBar from "../../components/NavBar/NavBar";
import LmsStudentSideBar from "../../components/LmsAdmin/LmsSideBar";
import LmsStudentMobileSideBar from "../../components/LmsAdmin/LmsSideBarMobile";
export default function PlacementLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<NavBar />
			<div className="flex flex-col sm:flex-row overflow-hidden">
				<LmsStudentSideBar/>
				<LmsStudentMobileSideBar/>
				<div className="w-screen">{children}</div>
			</div>
		</div>
	);
}