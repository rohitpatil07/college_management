"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const AttendanceRecord = () => {
   const router = useRouter();
   const server=process.env.NEXT_PUBLIC_SERVER_URL;
  const AuthData: any = useAuth();
  const [attend, setattend]:any = useState(null);
  const searchParams: any = useSearchParams();
  const subjectid = parseInt(searchParams.get("subject_id"));
  const subject_name = searchParams.get("subject_name");
    const get_attendance_record= async () => {
    const response = await axios.get(
      `${server}/lms/filter/faculty/subjectAttendance/${subjectid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    for(let i=0;i<response.data.length;i++){
      response.data[i]['abs_count'] = (response.data[i]['absent'].match(/IT/g) || response.data[i]['absent'].match(/CS/g) || response.data[i]['absent'].match(/EX/g) || response.data[i]['absent'].match(/IN/g)).length;
      response.data[i]['pres_count'] = (response.data[i]['present'].match(/IT/g) || response.data[i]['present'].match(/CS/g) || response.data[i]['present'].match(/EX/g) || response.data[i]['present'].match(/IN/g)).length;
    }
    setattend(response.data);
  };
  const [presents, setpresents]:any = useState(null);
  const [absents, setabsents]:any = useState(null);
  const [records, setrecords] = useState(false);
  const [dataDisplay, setdataDisplay] = useState(true);
   const [selectedText, setSelectedText] = useState("Presenties");
    const [showDataType, setShowDataType] = useState(false);
  const fetchAttendanceDetail=async(date: string)=>{
    const response = await axios({
      method: "post",
      url: `${server}/lms/filter/faculty/attendence`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
      data: {
        subject_id : subjectid,
        date: date
      },
    });
    setpresents(response.data['presenties']);
    setabsents(response.data['absenties']);
    setrecords(true);
  }
  const getExcel = async () => {
		axios
			.get(`${server}/lms/download/getattendance/${subjectid}`, {
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			})
			.then((response) => {
				console.log(response);
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "export.xlsx");
				document.body.appendChild(link);
				link.click();
			});
	};
   useEffect(() => {
    get_attendance_record();
  }, []);
  return (
     <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl mb-5 font-semibold text-gray-900">
          Attendance Track For {subject_name}
        </h3>
        <Link 
        href={{
							pathname:"faculty/take_attendance",
							query:
							{
								subject_id:subjectid,
								subject_name:subject_name
							}
						}}
            className='py-1 px-2 mr-2 rounded-md ml-auto my-2 hover:scale-105 bg-accent text-white transition-all'
        >Take Attendance</Link>
        {attend == null ? (
          <></>
        ) : attend.length == 0 ? (
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            No Students enrolled
          </h3>
        ) : (
 <div className="w-full px-2">
            <table className="w-full table-auto border-separate border-spacing-2 border-slate-500 bg-red">
              <thead>
                <tr>
                  <th className="border-2  border-slate-600">
                    Date
                  </th>
                  <th className="border-2  border-slate-600">
                    Stu. Present
                  </th>
                  <th className="border-2 border-b-2  border-slate-600">
                    Stu. Absent
                  </th>
                  <th className="border-2 border-b-2  border-slate-600">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {attend.map(({date,present,absent,attendance_id,pres_count,abs_count}: any)=>(
                  <tr>
                   <td className="border-2 border-slate-600">
                        {date.slice(0,10)}
                      </td>
                       <td className="border-2 border-slate-600">
                        {pres_count}
                      </td>
                       <td className="border-2 border-slate-600">
                        {abs_count}
                      </td>
                      <td className="border-2 border-slate-600">
                        <button onClick={()=>{fetchAttendanceDetail(date.slice(0,10))}} className='px-2 py-1 rounded-md cursor-pointer bg-blue-500 text-white hover:bg-blue-700 transition-all'>View</button>
                      </td>
                  </tr>
                ))}
              </tbody>
              </table>
<div className='w-full'>
  <button className='ml-[50%] my-2 bg-accent text-white px-2 py-1 rounded-md hover:scale-105 transition-all w-fit' onClick={()=>{getExcel()}}>Get Excel</button>
</div>
              </div>

        )}
      </div>

{records ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Record
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  setrecords(false);
                  setpresents(null);
                  setabsents(null);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>



            <div className="my-3 mb-5 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
              <div className="relative text-left inline-block mr-2">
                <div>
                  <button
                    onClick={() => {
                      setShowDataType(!showDataType);
                    }}
                    className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    {selectedText}
                    {showDataType ? (
                      ""
                    ) : (
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {showDataType ? (
                  <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setdataDisplay(true);
                          setSelectedText("Presenties");
                          setShowDataType(!showDataType);
                        }}
                        className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                      >
                        Presenties
                      </button>
                      <button
                        onClick={() => {
                          setdataDisplay(false);
                          setSelectedText("Absenties");
                          setShowDataType(!showDataType);
                        }}
                        className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                      >
                        Absenties
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>


<table className="w-full table-auto border-separate border-spacing-2 border-slate-500 bg-red">
              <thead>
                <tr>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Roll No
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Name
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Division
                  </th>
                </tr>
              </thead>
                {dataDisplay ? 
                
              <tbody>
                  {presents.map(({roll_no,first_name,last_name,division}: any)=>(
                  <tr>
                   <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {roll_no}
                      </td>
                       <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {first_name} {last_name}
                      </td>
                       <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {division}
                      </td>
                  </tr>
                ))}
              </tbody>
              : 
               <tbody>
                  {absents.map(({roll_no,first_name,last_name,division}: any)=>(
                  <tr>
                   <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {roll_no}
                      </td>
                       <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {first_name} {last_name}
                      </td>
                       <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {division}
                      </td>
                  </tr>
                ))}
              </tbody>
              }
              </table>
            </div>
            </div>
):''}


      </div>
  );
}

export default AttendanceRecord;
