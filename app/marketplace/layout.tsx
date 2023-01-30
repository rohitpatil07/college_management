import React from "react";
// import Nav from "../../components/Marketplace/MarketNav/Nav";
import NavBar from "../../components/NavBar/NavBar";
import MarketplaceSideBar from "../../components/Marketplace/MarketplaceSideBar";

export default function MarketPlace({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* <Nav /> */}
			<NavBar />
			<div className="flex flex-col sm:flex-row h-screen">
				<MarketplaceSideBar />
				<div className="w-screen">{children}</div>
			</div>
		</>
	);
}
