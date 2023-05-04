import React from "react";

const beautifulLabels: any = {
  roll_no: "Roll No",
  first_name: "First Name",
  middle_name: "Middle Name",
  last_name: "Last Name",
  email: "Email",
  semester: "Semester",
  batch: "batch",
  phone_number: "Phone Number",
  gender: "Gender",
  github: "Github",
  linkedin: "Linkedin",
  leetcode: "Leetcode",
  hackerrank: "Hackerrank",
};

function Tables({ data }: any) {
  return (
    <>
      <div className="table w-full text-sm text-center">
        <div className="table-header-group">
          <div className="table-row">
            {Object.keys(data[0]).map((item, index: number) => (
              <div
                key={index}
                className="table-cell border-2 px-4 py-2 font-medium"
              >
                {beautifulLabels[item]}
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group">
          {data.map((row: any, index: number) => (
            <div key={index} className="table-row">
              {Object.keys(row).map((item, i) => (
                <div key={i} className="table-cell border-2 px-4 py-2">
                  {row[item]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tables;
