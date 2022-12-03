"use client";
import React ,{useState} from "react";
const AcademicDetails = () => {
  const [baseInfo, setBaseInfo] = React.useState<any>({
    tenth_percent: "",
    tenth_start: "",
    tenth_end: "",
    twelveth_percent: "",
    twlveth_start: "",
    twelveth_end: "",
    diploma_percent: "",
    diploma_start: "",
    diploma_end: "",
    sem1_pointer: "",
    sem2_pointer: "",
    sem3_pointer: "",
    sem4_pointer: "",
    sem5_pointer: "",
    sem6_pointer: "",
    sem7_pointer: "",
    sem8_pointer: "",
    masters_sem1_pointer: "",
    masters_sem2_pointer: "",
    masters_sem3_pointer: "",
    masters_sem4_pointer: "",
  });

  const SscHsc = () => {
    const [higherSecondary, setHigherSecondary] = React.useState("twelveth");
    const [basicInfo, setBasicInfo] = React.useState([
      {
        value: "",
        label: "10th Percentage",
        id: "tenth_percent",
        type: "number",
      },
      { value: "", label: "Start Date", id: "tenth_start", type: "date" },
      { value: "", label: "End Date", id: "tenth_end", type: "date" },
      {
        value: "",
        label: "12th Percentage",
        id: "twelveth_percent",
        type: "number",
      },
      { value: "", label: "Start Date", id: "twlveth_start", type: "date" },
      { value: "", label: "End Date", id: "twelveth_end", type: "date" },
      {
        value: "",
        label: "Diploma Percentage",
        id: "diploma_percent",
        type: "number",
      },
      { value: "", label: "Start Date", id: "diploma_start", type: "date" },
      { value: "", label: "End Date", id: "diploma_end", type: "date" },
    ]);

    for (let z = 0; z < basicInfo.length; z++) {
      basicInfo[z].value = baseInfo[basicInfo[z].id];
    }
    const UpdateSscHsctData = (val: string, i: string) => {
      var newInfo = [...basicInfo];
      for (let z = 0; z < newInfo.length; z++) {
        if (newInfo[z].id == i) {
          newInfo[z].value = val;
          baseInfo[newInfo[z].id] = val;
        }
      }
      setBasicInfo(newInfo);
    };

    return (
      <>
        <div className="w-11/12 mb-5 mt-5">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 ">
            Academic Details
          </h3>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-slate-500 mb-5 border-b">
            10th Details
          </h2>
          <div className="flex flex-row items-center w-11/12 sm:w-5/12 mb-3">
            <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
              {basicInfo[0].label}
            </legend>
            <input
              value={basicInfo[0].value}
              type={basicInfo[0].type}
              onChange={(e) => {
                UpdateSscHsctData(e.target.value, basicInfo[0].id);
              }}
              className="w-32 bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
            ></input>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-row  items-center mb-2 mr-4">
              <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                {basicInfo[1].label}
              </legend>
              <input
                value={basicInfo[1].value}
                type={basicInfo[1].type}
                onChange={(e) => {
                  UpdateSscHsctData(e.target.value, basicInfo[1].id);
                }}
                className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                id="10th_start_date"
                name="10th_start_date"
              />
            </div>
            &nbsp;
            <div className="flex flex-row items-center mb-2">
              <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                {basicInfo[2].label}
              </legend>
              <input
                value={basicInfo[2].value}
                type={basicInfo[2].type}
                onChange={(e) => {
                  UpdateSscHsctData(e.target.value, basicInfo[2].id);
                }}
                className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                id="10th_end_date"
                name="10th_end_date"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around w-11/12  my-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-slate-500 mb-5">
            {" "}
            Higher Secondary :
          </h2>
          <div className='flex flex-col md:flex-row'>
          <div className="flex flex-row">
            <input
              className="bg-white"
              type="radio"
              name="selection"
              onClick={() => {
                setHigherSecondary("twelveth");
              }}
            />
            &nbsp;
            <legend>12th Details</legend>
          </div>
          &nbsp;&nbsp;
          <div className="flex flex-row">
            <input
              type="radio"
              name="selection"
              onClick={() => {
                setHigherSecondary("diploma");
              }}
            />
            &nbsp;
            <legend>Diploma</legend>
          </div>
          </div>
        </div>
        {higherSecondary == "twelveth" ? (
          <div className="w-11/12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-slate-500 mb-5 border-b">
              12th Details
            </h2>
            <div className="flex flex-row w-11/12 sm:w-5/12 mb-3">
              <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                {basicInfo[3].label}
              </legend>
              <input
                value={basicInfo[3].value}
                type={basicInfo[3].type}
                onChange={(e) => {
                  UpdateSscHsctData(e.target.value, basicInfo[3].id);
                }}
                className="w-32 bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-row items-center mb-2 mr-4">
                <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                  {basicInfo[1].label}
                </legend>
                <input
                  value={basicInfo[4].value}
                  type={basicInfo[4].type}
                  onChange={(e) => {
                    UpdateSscHsctData(e.target.value, basicInfo[4].id);
                  }}
                  className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                  id="10th_start_date"
                  name="10th_start_date"
                />
              </div>
              &nbsp;
              <div className="flex flex-row items-center mb-2">
                <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                  {basicInfo[2].label}
                </legend>
                <input
                  value={basicInfo[5].value}
                  type={basicInfo[5].type}
                  onChange={(e) => {
                    UpdateSscHsctData(e.target.value, basicInfo[5].id);
                  }}
                  className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                  id="10th_end_date"
                  name="10th_end_date"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-11/12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-slate-500 mb-5 border-b">
              Diploma Details
            </h2>
            <div className="flex flex-row w-11/12 sm:w-5/12 mb-3">
              <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                {basicInfo[6].label}
              </legend>
              <input
                value={basicInfo[6].value}
                type={basicInfo[6].type}
                onChange={(e) => {
                  UpdateSscHsctData(e.target.value, basicInfo[6].id);
                }}
                className="w-32 bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-row items-center mb-2 mr-4">
                <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                  {basicInfo[1].label}
                </legend>
                <input
                  value={basicInfo[7].value}
                  type={basicInfo[7].type}
                  onChange={(e) => {
                    UpdateSscHsctData(e.target.value, basicInfo[7].id);
                  }}
                  className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                  id="10th_start_date"
                  name="10th_start_date"
                />
              </div>
              &nbsp;
              <div className="flex flex-row items-center mb-2">
                <legend className="mr-2 text-sm sm:text-base text-slate-700 font-medium">
                  {basicInfo[2].label}
                </legend>
                <input
                  value={basicInfo[8].value}
                  type={basicInfo[8].type}
                  onChange={(e) => {
                    UpdateSscHsctData(e.target.value, basicInfo[8].id);
                  }}
                  className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                  id="10th_end_date"
                  name="10th_end_date"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  const UnderGrad = () => {
    const [underGradInfo, setUnderGradInfo] = React.useState([
      { value: "", label: "Sem 1 Pointer", id: "sem1_pointer", type: "number" },
      { value: "", label: "Sem 2 Pointer", id: "sem2_pointer", type: "number" },
      { value: "", label: "Sem 3 Pointer", id: "sem3_pointer", type: "number" },
      { value: "", label: "Sem 4 Pointer", id: "sem4_pointer", type: "number" },
      { value: "", label: "Sem 5 Pointer", id: "sem5_pointer", type: "number" },
      { value: "", label: "Sem 6 Pointer", id: "sem6_pointer", type: "number" },
      { value: "", label: "Sem 7 Pointer", id: "sem7_pointer", type: "number" },
      { value: "", label: "Sem 8 Pointer", id: "sem8_pointer", type: "number" },
    ]);
    for (let z = 0; z < underGradInfo.length; z++) {
      underGradInfo[z].value = baseInfo[underGradInfo[z].id];
    }
    const UpdateUnderData = (val: string, i: string) => {
      var newInfo = [...underGradInfo];
      for (let z = 0; z < newInfo.length; z++) {
        if (newInfo[z].id == i) {
          newInfo[z].value = val;
          baseInfo[newInfo[z].id] = val;
        }
      }
      setUnderGradInfo(newInfo);
    };
    return (
      <div className="w-full flex flex-col items-center mt-5 mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
          UnderGraduation Details
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minMax(14rem,18rem))",
            gridGap: "17px 35px",
            justifyContent: "center",
          }}
          className="w-full px-4"
        >
          {underGradInfo.map(({ value, label, id, type }: any) => (
            <div className="flex flex-row justify-between items-center  text-slate-700">
              <legend>{label}</legend>
              <input
                placeholder="00.0000"
                className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                id={id}
                name={id}
                value={value}
                onChange={(e) => {
                  UpdateUnderData(e.target.value, id);
                }}
              ></input>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const PostGrad = () => {
    const [postGradInfo, setpostGradInfo] = React.useState([
      {
        value: "",
        label: "Sem 1 Pointer",
        id: "masters_sem1_pointer",
        type: "number",
      },
      {
        value: "",
        label: "Sem 2 Pointer",
        id: "masters_sem2_pointer",
        type: "number",
      },
      {
        value: "",
        label: "Sem 3 Pointer",
        id: "masters_sem3_pointer",
        type: "number",
      },
      {
        value: "",
        label: "Sem 4 Pointer",
        id: "masters_sem4_pointer",
        type: "number",
      },
    ]);
    for (let z = 0; z < postGradInfo.length; z++) {
      postGradInfo[z].value = baseInfo[postGradInfo[z].id];
    }
    const UpdatePostData = (val: string, i: string) => {
      var newInfo = [...postGradInfo];
      for (let z = 0; z < newInfo.length; z++) {
        if (newInfo[z].id == i) {
          newInfo[z].value = val;
          baseInfo[newInfo[z].id] = val;
        }
      }
      setpostGradInfo(newInfo);
    };
    return (
      <div className="w-full flex flex-col items-center mt-5 mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
          PostGraduation Details
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minMax(14rem,20rem))",
            gridGap: "17px 35px",
            justifyContent: "center",
          }}
          className="w-full px-4"
        >
          {postGradInfo.map(({ value, label, id, type }: any) => (
            <div className="flex flex-row justify-between items-center text-slate-700">
              <legend>{label}</legend>
              <input
                placeholder="00.0000"
                className="bg-white border-gray-300 border-solid border-2 rounded-mg text-slate-700 py-1 px-1"
                id={id}
                name={id}
                value={value}
                onChange={(e) => {
                  UpdatePostData(e.target.value, id);
                }}
              ></input>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const save = () => {
    var tenth_percent: number =+baseInfo.tenth_percent;
    var tenth_start:number=+baseInfo.tenth_start;
    var tenth_end:number=+baseInfo.tenth_end;
    var twelveth_percent: number =+baseInfo.twelveth_percent;
    var twelveth_start:number=+baseInfo.twelveth_start;
    var twelveth_end:number=+baseInfo.twelveth_end;
    var sem1_pointer:number=+baseInfo.sem1_pointer;
    var sem2_pointer:number=+baseInfo.sem2_pointer;
    var sem3_pointer:number=+baseInfo.sem3_pointer;
    var sem4_pointer:number=+baseInfo.sem4_pointer;
    var sem5_pointer:number=+baseInfo.sem5_pointer;
    var sem6_pointer:number=+baseInfo.sem6_pointer;
    var sem7_pointer:number=+baseInfo.sem7_pointer;
    var sem8_pointer:number=+baseInfo.sem8_pointer;
    var masters_sem1_pointer:number=+baseInfo.masters_sem1_pointer;
    var masters_sem2_pointer:number=+baseInfo.masters_sem2_pointer;
    var masters_sem3_pointer:number=+baseInfo.masters_sem3_pointer;
    var masters_sem4_pointer:number=+baseInfo.masters_sem4_pointer;
    
    const data = {tenth_percent,tenth_start,tenth_end,twelveth_percent,twelveth_start,twelveth_end,
    sem1_pointer,sem2_pointer,sem3_pointer,sem4_pointer,sem5_pointer,sem6_pointer,sem7_pointer,sem8_pointer,
    masters_sem1_pointer,masters_sem2_pointer,masters_sem3_pointer,masters_sem4_pointer
    }
    console.log(data);
  };
  const [step, setStep] = React.useState(0);
  const Navigation = () => (
    <section className="w-full flex items-center justify-around gap-1 py-4">
      {step > 0 && (
        <button
          className="bg-gray-300 p-2 w-fit mx-auto px-5 rounded-mg text-blue-600"
          type="button"
          onClick={() => {
            setStep(step - 1);
          }}
        >
          BACK
        </button>
      )}
      {step == fieldGroups.length - 1 && (
        <button
          onClick={save}
          className="p-2 w-fit mx-auto px-5 rounded-mg"
          style={{ backgroundColor: "#c9243f", color: "white" }}
          type="submit"
        >
          SAVE
        </button>
      )}
      {step < fieldGroups.length - 1 && (
        <button
          className="bg-blue-600 p-2 w-fit mx-auto px-5 rounded-mg text-white"
          type="button"
          onClick={() => {
            setStep(step + 1);
          }}
        >
          NEXT
        </button>
      )}
    </section>
  );
  function renderMarkers() {
    let markers = [];
    for (let i = 0; i < fieldGroups.length; i++) {
      markers.push(
        <span
          className={
            step >= i
              ? "rounded-full w-2 h-2 bg-blue-600"
              : "rounded-full w-2 h-2 bg-gray-300"
          }
        />
      );
    }
    return markers;
  }
  const Reference = () => (
    <footer className="w-full flex items-center justify-center gap-1 py-4">
      {renderMarkers()}
    </footer>
  );
  const fieldGroups = [<SscHsc />, <UnderGrad />, <PostGrad />];
  return (
    <>
      <div className="w-full sm:w-11/12 mx-auto  flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
        <br />
        {fieldGroups[step]}
        <Navigation />
        <Reference />
      </div>
    </>
  );
};

export default AcademicDetails;
