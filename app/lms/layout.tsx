import NavBar from "../../components/NavBar/NavBar";
import LmsStudentSideBar from "../../components/LmsStudent/LmsStudentSideBar";
import LmsStudentMobileSideBar from "../../components/LmsStudent/LmsStudentMobileSideBar";
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