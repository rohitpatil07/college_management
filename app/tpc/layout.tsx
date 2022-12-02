"use client";
import NavBar from "../../components/NavBar/NavBar";
import SideMobile from "../../components/NavBar/StudentNavigations/SideMobileNav";
import SideNavBar from "../../components/NavBar/StudentNavigations/SideNavBar";

export default function PlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen bg-slate-200">
      <NavBar />
      <div className="flex flex-col sm:flex-row w-screen min-h-screen h-fit overflow-hidden">
        <SideMobile/>
        <SideNavBar/>
        <div className='w-full sm:w-3/5 md:w-4/5'>{children}</div>
      </div>
    </div>
  );
}
