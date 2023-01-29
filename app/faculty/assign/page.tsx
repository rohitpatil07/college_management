'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import Assignment from "../../../components/Faculty/Assignment";
const Page = () => {
  const searchParams:any = useSearchParams();
	const subjectid=searchParams.get('subject_id');
	const subjectname=searchParams.get('subject_name');
	  return (
		<div className="mx-auto w-full flex flex-col">
      <Assignment subject_id={subjectid} subject_name={subjectname}/>
    </div>
	  );
}

export default Page;