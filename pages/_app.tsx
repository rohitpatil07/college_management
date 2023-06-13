import "../styles/globals.css";
import "../styles/AcademicTableStyle.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import WelcomeModal from "../components/Company/WelcomeModal";
import NavBar from "../components/NavBar/NavBar";
import SideMobile from "../components/NavBar/StudentNavigations/SideMobileNav";
import SideNavBar from "../components/NavBar/StudentNavigations/SideNavBar";
import AdminSideBarMobile from "../components/Admin/AdminSideBarMobile";
import AdminSideBar from "../components/Admin/AdminSideBar";
import CompanySidebar from "../components/Company/CompanySidebar";
import CompanySidebarMobile from "../components/Company/CompanySidebarMobile";
import AuthProvider from "../contexts/AuthContext";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		setShowModal(true);
	}, []);
	const router = useRouter();
	const { pathname } = router;

	const isTPCRoute = pathname.startsWith("/tpc");
	const isAdminRoute = pathname.startsWith("/admin");
	const isCompanyRoute = pathname.startsWith("/company");
	return (
		<AuthProvider>
			<div className="w-screen bg-slate-200">
				{isTPCRoute ? (
					<div className="w-screen bg-slate-200">
						<NavBar />
						<div className="flex flex-col sm:flex-row w-screen min-h-screen h-fit overflow-hidden">
							<SideMobile />
							<SideNavBar />
							<div className="w-full sm:w-3/5 md:w-4/5">
								<Component {...pageProps} />
							</div>
						</div>
					</div>
				) : isAdminRoute ? (
					<>
						<div className="w-screen bg-slate-200">
							<NavBar />
							<div className="flex flex-col sm:flex-row w-screen min-h-screen h-fit overflow-hidden">
								<AdminSideBarMobile />
								<AdminSideBar />
								<div className="w-full sm:w-3/5 md:w-4/5">
									<Component {...pageProps} />
								</div>
							</div>
						</div>
					</>
				) : isCompanyRoute ? (
					<>
						<div className="w-screen bg-slate-200">
							<NavBar />
							<div className="flex flex-col sm:flex-row w-screen min-h-screen h-fit overflow-hidden">
								<CompanySidebarMobile />
								<CompanySidebar />
								<div className="w-full sm:w-3/5 md:w-4/5">
									<Component {...pageProps} />
								</div>
							</div>
						</div>
					</>
				) : (
					<Component {...pageProps} />
				)}
			</div>
		</AuthProvider>
	);
}
