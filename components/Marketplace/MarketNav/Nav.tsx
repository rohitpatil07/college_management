import React from "react";
import MarketMobileNav from "./NavComponents/MarketMobileNav";
import MarketNavbar from "./NavComponents/MarketNavbar";

const Nav = () => {
	return (
		<div>
			<MarketNavbar />
			<MarketMobileNav />
		</div>
	);
};

export default Nav;
