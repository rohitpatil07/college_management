"use client";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/NavBar/SideBar";

export default function PlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen bg-slate-200">
      <NavBar />
      <div className="flex flex-col sm:flex-row w-screen h-fit overflow-hidden">
        <SideBar />
        <div>{children}</div>
      </div>
    </div>
  );
}
