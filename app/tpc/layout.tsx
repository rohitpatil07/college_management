'use client';
import Link from "next/link";
import React from "react";
import SideBar from "../../components/NavBar/SideBar";


export default function PlacementLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    return (
        <div className="flex flex-col sm:flex-row w-screen h-fit overflow-hidden">
        <SideBar/>
        <main>{children}</main>
      </div>
      
    );
  }