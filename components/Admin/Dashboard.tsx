"use client";
import React, { useState, useEffect } from "react";
import BarGraphs from './DashComp/BarGraphs'
import PieCharts from './DashComp/PieCharts'
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
const Dashboard = () => {
  const AuthData: any = useAuth();
  const [topStudents, setTopStudents] = useState([]);
  const [lpaWiseStudents, setLpaWiseStudents] = useState([]);
  const [lpaWiseStudentsLabels, setLpaWiseStudentsLabels] = useState([]);
  const [companyWiseStudents, setCompanyWiseStudents] = useState([]);
  const [companyWiseStudentsLabels, setCompanyWiseStudentsLabels] = useState([]);
  const [companyWiseHeading, setCompanyWiseHeading] = useState('No Data Available');
  const [lpaWiseHeading, setLpaWiseHeading] = useState('No Data Available');
  const [deptWiseStudents, setDeptWiseStudents] = useState([]);
  const [deptWiseStudentsLabels, setDeptWiseStudentsLabels] = useState([]);
  const [deptWiseHeading, setDeptWiseHeading] = useState('Students Placed Department Wise')
  const getTop10Student = async () => {
		const response = await axios.get(
			`http://localhost:5000/filter/top10student`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		)
		setTopStudents(response.data);
  }
  const getStudentCompanyWise = async () => {
	const response = await axios.get(
		`http://localhost:5000/filter/studentsplacedcompanywise`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthData.user.token}`,
			},
		}
	)
	let setcompany:any = [...companyWiseStudents];
	let setcompanylabels:any = [...companyWiseStudentsLabels];
	for(let i=0;i<response.data.studentsPlacedCompanyWise.length;i++){
		setcompanylabels[i] = response.data.studentsPlacedCompanyWise[i].placed_company;
		setcompany[i] = response.data.studentsPlacedCompanyWise[i].count;
	}
	if(response.data.studentsPlacedCompanyWise.length>0){
		setCompanyWiseHeading('Students Placed Company Wise')
	}
	setCompanyWiseStudents(setcompany);
	setCompanyWiseStudentsLabels(setcompanylabels);
}
const getStudentLpaWise = async () => {
	const response = await axios.get(
		`http://localhost:5000/filter/studentsplacedlpawise`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthData.user.token}`,
			},
		}
	)
	let setlpa:any = [...lpaWiseStudents];
	let setlpalabels:any = [...lpaWiseStudentsLabels];
	for(let i=0;i<response.data.studentsPlacedLpaWise.length;i++){
		setlpalabels[i] = response.data.studentsPlacedLpaWise[i].package;
		setlpa[i] = response.data.studentsPlacedLpaWise[i].count;
	}
	if(response.data.studentsPlacedLpaWise.length>0){
		setLpaWiseHeading('Students Placed Package Wise');
	}
	setLpaWiseStudents(setlpa);
	setLpaWiseStudentsLabels(setlpalabels);
}
const getPlacedByDept = async () => {
	const response = await axios.get(
		`http://localhost:5000/filter/placedByDept`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthData.user.token}`,
			},
		}
	)
	let setdept:any = [...deptWiseStudents];
	let setdeptlabels:any = [...deptWiseStudentsLabels];
	for(let i=0;i<response.data.length;i++){
		setdeptlabels[i] = response.data[i].branch;
		setdept[i] = response.data[i].count;
	}
	setDeptWiseStudents(setdept);
	setDeptWiseStudentsLabels(setdeptlabels);
}
const dashData=()=>{
	getTop10Student(),
	getStudentLpaWise(),
	getStudentCompanyWise(),
	getPlacedByDept()
}
  useEffect(() => {
	dashData()
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
			<div className="flex bg-white w-10/12 mt-5 flex-col px-20 pt-8 items-center rounded-2xl drop-shadow-lg">
				<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
					Dashboard
				</h3>
       {
	   lpaWiseStudents.length==0 || companyWiseStudents.length==0 || lpaWiseStudentsLabels.length==0 || companyWiseStudentsLabels.length==0 || deptWiseStudents.length==0 || deptWiseStudentsLabels.length==0 
	   ? <></> : 
	   <div className='w-full flex flex-wrap'>
	   <BarGraphs datas={lpaWiseStudents} labels={lpaWiseStudentsLabels} label={lpaWiseHeading}/>
	   <BarGraphs datas={companyWiseStudents} labels={companyWiseStudentsLabels} label={companyWiseHeading}/>
	   <PieCharts datas={deptWiseStudents} labels={deptWiseStudentsLabels} label={deptWiseHeading}/>
	   </div>
	   }
            </div>
    </div>
  )
}

export default Dashboard
