import "./AcademicTableStyle.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../public/avatar.png";
import axios from "axios";

function AcademicTable() {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [pointer, setPointer] = useState("0");
  const [tenend, setTenend] = useState("0");
  const [twelvethend, setTwelvethend] = useState("0");
  const [ten, setTen] = useState("0");
  const [twelve, setTwelve] = useState("0");
  const [sem1, setSem1] = useState("0");
  const [sem2, setSem2] = useState("0");
  const [sem3, setSem3] = useState("0");
  const [sem4, setSem4] = useState("0");
  const [sem5, setSem5] = useState("0");
  const [sem6, setSem6] = useState("0");
  const [sem7, setSem7] = useState("0");
  const [sem8, setSem8] = useState("0");
  const fetchDrive = async () => {
    const response = await axios.get(
      `${server}/filter/student/${AuthData.user.userData.user.roll_no}`,
      {
       		headers: {
					"Content-Type": "application/json",
					
				},
				withCredentials: true,
      }
    );
    if (
      response.data.academic_info != null ||
      response.data.academic_info != undefined
    ) {
      setTenend(response.data.academic_info.tenth_end);
      setTwelvethend(response.data.academic_info.twelveth_end);
      setTen(response.data.academic_info.tenth_percent);
      setTwelve(response.data.academic_info.twelveth_percent);
      setPointer(response.data.academic_info.cgpa);
      setSem1(response.data.academic_info.sem1_pointer);
      setSem2(response.data.academic_info.sem2_pointer);
      setSem3(response.data.academic_info.sem3_pointer);
      setSem4(response.data.academic_info.sem4_pointer);
      setSem5(response.data.academic_info.sem5_pointer);
      setSem6(response.data.academic_info.sem6_pointer);
      setSem7(response.data.academic_info.sem7_pointer);
      setSem8(response.data.academic_info.sem8_pointer);
    }
  };

	useEffect(() => {
		fetchDrive();
	}, []);
	return (
		<>
			<table>
				<tr>
					<td className="font-semibold">BE</td>
					<td></td>
					<td>
						Sem 7 <br /> {sem7}
						<br />
					</td>
					<td>
						Sem 8 <br /> {sem8}
						<br />
					</td>
					<td rowSpan={4}> {pointer} </td>
				</tr>
				<tr>
					<td className="font-semibold">TE</td>
					<td></td>
					<td>
						Sem 5 <br /> {sem5}
						<br />
					</td>
					<td>
						Sem 6 <br /> {sem6}
						<br />
					</td>
				</tr>
				<tr>
					<td className="font-semibold">SE</td>
					<td></td>
					<td>
						Sem 3 <br /> {sem3}
						<br />
					</td>
					<td>
						Sem 4 <br /> {sem4}
						<br />
					</td>
				</tr>
				<tr>
					<td className="font-semibold">FE</td>
					<td></td>
					<td>
						Sem 1 <br /> {sem1}
						<br />
					</td>
					<td>
						Sem 2 <br /> {sem2}
						<br />
					</td>
				</tr>
				<tr>
					<td className="font-semibold">Class XII</td>
					<td>{twelvethend}</td>
					<td colSpan={2}>HSC</td>
					<td>{twelve}</td>
				</tr>
				<tr>
					<td className="font-semibold">Class X</td>
					<td>{tenend}</td>
					<td colSpan={2}>SSC</td>
					<td>{ten}</td>
				</tr>
			</table>
		</>
	);
}

export default AcademicTable;
