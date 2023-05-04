"use client";
import React, { useState, useEffect } from "react";
import BarGraphs from "./DashComp/BarGraphs";
import PieCharts from "./DashComp/PieCharts";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
const Dashboard = () => {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [topStudents, setTopStudents] = useState([]);
  const [lpaWiseStudents, setLpaWiseStudents] = useState([]);
  const [lpaWiseStudentsLabels, setLpaWiseStudentsLabels] = useState([]);
  const [companyWiseStudents, setCompanyWiseStudents] = useState([]);
  const [companyWiseStudentsLabels, setCompanyWiseStudentsLabels] = useState(
    []
  );
  const [companyWiseHeading, setCompanyWiseHeading] =
    useState("No Data Available");
  const [lpaWiseHeading, setLpaWiseHeading] = useState("No Data Available");
  const [deptWiseStudents, setDeptWiseStudents] = useState([]);
  const [deptWiseStudentsLabels, setDeptWiseStudentsLabels] = useState([]);
  const [deptWiseHeading, setDeptWiseHeading] = useState(
    "Students Placed Department Wise"
  );
  const getTop10Student = async () => {
    const response = await axios.get(`${server}/filter/top10student`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
    });
    for (let i = 0; i < response.data.top10studentplaced.length; i++) {
      if (response.data.top10studentplaced[i].offers.length == 2) {
        if (
          parseInt(response.data.top10studentplaced[i].offers[1].package) >
          parseInt(response.data.top10studentplaced[i].offers[2].package)
        ) {
          response.data.top10studentplaced[i]["packages"] =
            response.data.top10studentplaced[i].offers[0]["package"];
          response.data.top10studentplaced[i]["company_name"] =
            response.data.top10studentplaced[i].offers[0].company_name;
        } else {
          response.data.top10studentplaced[i]["packages"] =
            response.data.top10studentplaced[i].offers[1]["package"];
          response.data.top10studentplaced[i]["company_name"] =
            response.data.top10studentplaced[i].offers[1].company_name;
        }
      } else {
        response.data.top10studentplaced[i]["packages"] =
          response.data.top10studentplaced[i].offers[0]["package"];
        response.data.top10studentplaced[i]["company_name"] =
          response.data.top10studentplaced[i].offers[0].company_name;
      }
    }

    setTopStudents(response.data.top10studentplaced);
  };
  const getStudentCompanyWise = async () => {
    const response = await axios.get(
      `${server}/filter/studentsplacedcompanywise`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    let setcompany: any = [...companyWiseStudents];
    let setcompanylabels: any = [...companyWiseStudentsLabels];
    for (let i = 0; i < response.data.studentsPlacedCompanyWise.length; i++) {
      setcompanylabels[i] =
        response.data.studentsPlacedCompanyWise[i].placed_company;
      setcompany[i] = response.data.studentsPlacedCompanyWise[i].count;
    }
    if (response.data.studentsPlacedCompanyWise.length > 0) {
      setCompanyWiseHeading("Students Placed Company Wise");
    }
    setCompanyWiseStudents(setcompany);
    setCompanyWiseStudentsLabels(setcompanylabels);
  };
  const getStudentLpaWise = async () => {
    const response = await axios.get(`${server}/filter/studentsplacedlpawise`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
    });
    let setlpa: any = [...lpaWiseStudents];
    let setlpalabels: any = [...lpaWiseStudentsLabels];
    for (let i = 0; i < response.data.studentsPlacedLpaWise.length; i++) {
      setlpalabels[i] = response.data.studentsPlacedLpaWise[i].package;
      setlpa[i] = response.data.studentsPlacedLpaWise[i].count;
    }
    if (response.data.studentsPlacedLpaWise.length > 0) {
      setLpaWiseHeading("Students Placed Package Wise");
    }
    setLpaWiseStudents(setlpa);
    setLpaWiseStudentsLabels(setlpalabels);
  };
  const getPlacedByDept = async () => {
    const response = await axios.get(`${server}/filter/placedByDept`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
    });
    let setdept: any = [...deptWiseStudents];
    let setdeptlabels: any = [...deptWiseStudentsLabels];
    for (let i = 0; i < response.data.length; i++) {
      setdeptlabels[i] = response.data[i].branch;
      setdept[i] = response.data[i].count;
    }
    setDeptWiseStudents(setdept);
    setDeptWiseStudentsLabels(setdeptlabels);
  };
  const dashData = () => {
    getTop10Student(),
      getStudentLpaWise(),
      getStudentCompanyWise(),
      getPlacedByDept();
  };
  useEffect(() => {
    dashData();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
          Dashboard
        </h3>
        {lpaWiseStudents.length == 0 ||
        companyWiseStudents.length == 0 ||
        lpaWiseStudentsLabels.length == 0 ||
        companyWiseStudentsLabels.length == 0 ||
        deptWiseStudents.length == 0 ||
        deptWiseStudentsLabels.length == 0 ? (
          <>Fetching Data</>
        ) : (
          <div className="w-11/12 justify-around gap-2 flex flex-row flex-wrap">
            <BarGraphs
              datas={lpaWiseStudents}
              labels={lpaWiseStudentsLabels}
              label={lpaWiseHeading}
            />
            <BarGraphs
              datas={companyWiseStudents}
              labels={companyWiseStudentsLabels}
              label={companyWiseHeading}
            />
            <PieCharts
              datas={deptWiseStudents}
              labels={deptWiseStudentsLabels}
              label={deptWiseHeading}
            />
            {topStudents.length > 0 ? (
              <div className="w-10/12 m-auto md:w-[40%] min-h-[400px] border-2 rounded-2xl drop-shadow-2xl overflow-auto">
                <table className="table-fixed border-collapse border-spacing-x-4 border-spacing-y-2 mt-3">
                  <thead>
                    <tr className="text-lg font-semibold text-gray-900">
                      <td className="pr-1 sm:pr-2">Roll No</td>
                      <td className="pl-1 sm:pl-2">Name</td>
                      <td className="pl-1 sm:pl-2">Email</td>
                      <td className="pl-1 sm:pl-2">Company</td>
                      <td className="pl-1 sm:pl-2">Package</td>
                      <td className="pl-1 sm:pl-2">Count Offers</td>
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map(
                      (
                        {
                          roll_no,
                          first_name,
                          last_name,
                          email,
                          _count,
                          offers,
                          packages,
                          company_name,
                        }: any,
                        i: number
                      ) => (
                        <tr
                          key={i}
                          className="cursor-pointer border-b border-slate-400 text-sm py-2"
                        >
                          <td className="pr-1 sm:pr-2">{roll_no}</td>
                          <td className="pl-1 sm:pl-2">
                            {first_name} {last_name}
                          </td>
                          <td className="pl-1 sm:pl-2">{email}</td>
                          <td className="pl-1 sm:pl-2">{company_name}</td>
                          <td className="pl-1 sm:pl-2">{packages}</td>
                          <td className="pl-1 sm:pl-2">{_count.offers}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
