import NavBar from "../../components/NavBar/NavBar";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AdminSideBarMobile from "../../components/Admin/AdminSideBarMobile";
export default function PlacementLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<NavBar />
			<div className="flex flex-col sm:flex-row overflow-hidden">
				<AdminSideBarMobile />
				<AdminSideBar />
				<div className="w-screen">{children}</div>
			</div>
		</div>
	);
}
