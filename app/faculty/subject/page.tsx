'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Subject from "../../../components/Faculty/Subject";

const Something = () => {
	const searchParams:any = useSearchParams();
	const subjectid=searchParams.get('subject_id');
	console.log(subjectid);
	  return (
		  <div>
			  <Subject subject_id={subjectid}/>
		  </div>
	  );
}

export default Something;
