import React from "react";
import "./AcademicTableStyle.css";

function AcademicTable() {
	return (
		<>
			<table>
				<tr>
					<td className="font-semibold">BE</td>
					<td></td>
					<td>
						Sem 7<br />
					</td>
					<td>
						Sem 8<br />
					</td>
					<td rowSpan={4}></td>
				</tr>
				<tr>
					<td className="font-semibold">TE</td>
					<td></td>
					<td>
						Sem 5<br />
					</td>
					<td>
						Sem 6<br />
					</td>
				</tr>
				<tr>
					<td className="font-semibold">SE</td>
					<td></td>
					<td>
						Sem 3<br />
					</td>
					<td>
						Sem 4<br />
					</td>
				</tr>
				<tr>
					<td className="font-semibold">FE</td>
					<td></td>
					<td>
						Sem 1<br />
					</td>
					<td>
						Sem 2<br />
					</td>
				</tr>
				<tr>
					<td className="font-semibold">Class XII</td>
					<td>May 2018</td>
					<td colSpan={2}>HSC</td>
					<td>93</td>
				</tr>
				<tr>
					<td className="font-semibold">Class X</td>
					<td>May 2016</td>
					<td colSpan={2}>SSC</td>
					<td>93</td>
				</tr>
			</table>
		</>
	);
}

export default AcademicTable;
