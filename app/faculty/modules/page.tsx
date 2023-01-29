'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Module from "../../../components/Faculty/Module";
import Link from "next/link";
const Page = () => {
	const searchParams:any = useSearchParams();
	const subjectid=searchParams.get('subject_id');
	const subjectname=searchParams.get('subject_name');
    const moduleid=searchParams.get('module_id');
	const modulename=searchParams.get('module_name');
    const modulenumber=searchParams.get('module_number');
	  return (
		<div className="mx-auto w-full flex flex-col bg-slate-100 ">
      <div className="w-11/12 mx-auto flex flex-col  justify-around container py-3 text-slate-500 font-medium">
        <Link href={{
								pathname: "/faculty/subject",
								query:
								{
									subject_id: subjectid,
									subject_name: subjectname
								}
							}} className="flex flex-row items-center pb-2 my-1 border-b border-slate-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
          Home / Dashboard / {subjectname} / Module {modulenumber}: {modulename}
        </Link>
      </div>
      <Module subject_id={subjectid} module_id={moduleid} module_number={modulenumber} module_name={modulename} subject_name={subjectname}/>
    </div>
	  );
}

export default Page;
