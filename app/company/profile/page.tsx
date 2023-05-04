"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";
import Loading from "../../../components/Loaders/Loading";
import ClipLoader from "react-spinners/ClipLoader";
const Profile = () => {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [template, setTemplate] = useState(0);
  const [logo, setLogo] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [loading, setLoading] = useState(true);
  const loadState = "loading";
  const [updating, setupdating] = useState(false);
  const [locations, setLocations] = useState(
    "In which city company is situated"
  );
  const [moto, setMoto] = useState("Slogan or moto of company");
  const [company_desc, setDescription] = useState(
    "Describe what problems company solve"
  );
  const [link_one, setLinkOne] = useState("reference link one");
  const [link_two, setLinkTwo] = useState("reference link two");
  const [linkedIn, setLinkedIn] = useState("linkedin link");
  const [broucher, setbroucher] = useState(
    "https://tse2.mm.bing.net/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&pid=Api&P=0"
  );

  const fetchDrive = async () => {
    try {
      const response = await axios.get(
        `${server}/filter/onecompany/${AuthData.user.userData.user.company_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      );
      for (let key in response.data) {
        if (response.data[key] != null) {
          if (key == "template") {
            setTemplate(response.data[key]);
          } else if (key == "logo") {
            setLogo(response.data[key]);
            setPreviewSource(response.data[key]);
          } else if (key == "company_name") {
            setCompanyName(response.data[key]);
          } else if (key == "locations") {
            setLocations(response.data[key]);
          } else if (key == "moto") {
            setMoto(response.data[key]);
          } else if (key == "company_desc") {
            setDescription(response.data[key]);
          } else if (key == "link_one") {
            setLinkOne(response.data[key]);
          } else if (key == "link_two") {
            setLinkTwo(response.data[key]);
          } else if (key == "linkedIn") {
            setLinkedIn(response.data[key]);
          } else if (key == "broucher") {
            setbroucher(response.data[key]);
          } else if (key == "company_id") {
            setCompanyId(response.data[key]);
          }
        }
      }
      setLoading(false);
    } catch (eror) {
      console.log(eror);
    }
  };
  useEffect(() => {
    fetchDrive();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      company: {
        company_id,
        template,
        logo,
        company_name,
        locations,
        moto,
        company_desc,
        broucher,
        link_one,
        link_two,
        linkedIn,
      },
    };
    setupdating(true);
    const response = await axios.post(`${server}/add/company`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
    });
    console.log(response);
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setupdating(false);
    fetchDrive();
    setEdit(!edit);
  };
  const [previewsource, setPreviewSource] = useState(null);
  const [edit, setEdit] = useState(false);
  const handleLogo = (e: any) => {
    const file = e.target.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogo(reader.result);
      setPreviewSource(reader.result);
    };
  };
  const handleBroucherImage = (e: any) => {
    const file = e.target.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setbroucher(reader.result);
    };
  };
  return (
    <div className="w-full h-full flex justify-center items-center align-middle flex-col text-slate-500">
      {loading ? (
        <div className="my-10 flex flex-col items-center justify-center">
          <Loading loadState={loadState} />
          <h3>Gathering Data</h3>
        </div>
      ) : (
        <div className="bg-white w-10/12 mt-5 mx-auto p-8 rounded-2xl drop-shadow-lg">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              {edit ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              )}
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row relative h-full w-full justify-center rounded-lg">
                <div className="w-[100px] h-[100px] relative ml-2 text-black border-2 border-transparent">
                  <img
                    className="w-[100px] h-[100px]"
                    src={
                      previewsource
                        ? `${previewsource}`
                        : "https://static.vecteezy.com/system/resources/previews/000/392/153/original/modern-company-logo-design-vector.jpg"
                    }
                    alt="profilePic"
                  />

                  {edit ? (
                    <div className="text-slate-500 text-center absolute bg-white rounded-full bottom-[-10%] right-[32%] border-gray-300 border-solid border-2 w-8 h-8 overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 absolute top-[10%] left-1 cursor-pointer"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        className="absolute cursor-pointer top-0 scale-110 opacity-0"
                        type="file"
                        accept="image/*"
                        onChange={handleLogo}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col w-full gap-4 ml-2">
                  <div className="flex flex-col">
                    {edit ? (
                      <input
                        type="text"
                        id="name"
                        value={company_name}
                        placeholder="Company Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="border-gray-300 border-2 py-2 px-4 rounded-lg"
                      />
                    ) : (
                      <h3 className=" py-2 px-4 rounded-lg border-2  border-transparent font-medium text-xl">
                        {company_name}
                      </h3>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    {edit ? (
                      <input
                        type="text"
                        id="moto"
                        value={moto}
                        placeholder="Company's Moto or Slogan"
                        onChange={(e) => setMoto(e.target.value)}
                        className="border-gray-300 border-2 py-2 px-4 rounded-lg w-full"
                      />
                    ) : (
                      <h3 className=" py-2 px-4 rounded-lg border-2  border-transparent">
                        {moto}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <div
                  className={
                    edit
                      ? "w-full flex flex-row"
                      : "w-full flex flex-row items-center"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  <div className="w-full">
                    {edit ? (
                      <textarea
                        id="description"
                        rows={4}
                        placeholder="Description Of The Company"
                        value={company_desc}
                        onChange={(e) => setDescription(e.target.value)}
                        className="ml-2 w-full border-gray-300 border-2 py-2 px-4 rounded-lg w-full"
                      />
                    ) : (
                      <h3 className=" py-2 px-4 rounded-lg border-2 border-white text-lg">
                        {company_desc}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <div className="w-full flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <div>
                    {edit ? (
                      <input
                        type="text"
                        id="location"
                        placeholder="location"
                        value={locations}
                        onChange={(e) => setLocations(e.target.value)}
                        className="ml-2 border-gray-300 border-2 py-2 px-4 rounded-lg"
                      />
                    ) : (
                      <h3 className=" py-2 px-4 rounded-lg border-2 border-white font-bold text-lg">
                        {locations}
                      </h3>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col col-span-2">
                <div className="w-full flex flex-row text-blue-600 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>

                  <div className="w-full">
                    {edit ? (
                      <input
                        type="text"
                        id="link_1"
                        placeholder="company_page_links"
                        className="ml-2 border-gray-300 border-2 py-2 px-4 rounded-lg w-full"
                        value={link_one}
                        onChange={(e) => setLinkOne(e.target.value)}
                      />
                    ) : (
                      <a
                        href="#"
                        className=" py-2 px-4 rounded-lg border-2 border-white underline cursor-pointer text-sm"
                      >
                        {link_one}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <div className="w-full flex flex-row text-blue-600 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>

                  <div className="w-full">
                    {edit ? (
                      <input
                        type="text"
                        id="link_1"
                        placeholder="company_page_links"
                        className="ml-2 border-gray-300 border-2 py-2 px-4 rounded-lg w-full"
                        value={link_two}
                        onChange={(e) => setLinkTwo(e.target.value)}
                      />
                    ) : (
                      <a
                        href="#"
                        className=" py-2 px-4 rounded-lg border-2 border-white underline cursor-pointer text-sm"
                      >
                        {link_two}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <div className="w-full flex flex-row text-blue-600 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>

                  <div className="w-full">
                    {edit ? (
                      <input
                        type="text"
                        id="link_1"
                        placeholder="inkedIn_link"
                        className="ml-2 border-gray-300 border-2 py-2 px-4 rounded-lg w-full"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                      />
                    ) : (
                      <a
                        href="#"
                        className=" py-2 px-4 rounded-lg border-2 border-white underline cursor-pointer text-sm"
                      >
                        {linkedIn}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {template == 0 && edit == false ? (
                <div className="flex flex-col items-center">
                  <h3>You Haven't Created Any Template</h3>
                  <button
                    className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
                    onClick={() => setEdit(!edit)}
                  >
                    Create Template
                  </button>
                </div>
              ) : template == 1 && edit == false ? (
                <div className="w-5/12 h-[300px]">
                  <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
                    <div
                      className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${broucher})`,
                      }}
                    >
                      <div className="relative top-0 left-0 flex h-full w-full flex-col justify-between bg-black bg-opacity-75 p-8">
                        <div className="mb-4 flex items-center">
                          <img
                            className="mr-4 h-8  w-8 "
                            src={
                              previewsource
                                ? `${previewsource}`
                                : "https://static.vecteezy.com/system/resources/previews/000/392/153/original/modern-company-logo-design-vector.jpg"
                            }
                            alt="Company Logo"
                          />
                          <div className="text-white">
                            <div className="mb-1  text-2xl font-medium">
                              {company_name}
                            </div>
                            <div className="text-sm text-base text-gray-300 ">
                              {moto}
                            </div>
                          </div>
                        </div>
                        <p className="mb-2 text-xs text-base text-gray-300 text-center">
                          {company_desc}
                        </p>
                        <a
                          className="rounded bg-blue-500 py-1 px-2 text-sm text-white hover:bg-blue-600"
                          href={link_one}
                        >
                          Visit Our Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : template == 2 && edit == false ? (
                <div className="w-5/12 h-[300px]">
                  <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
                    <div
                      className="absolute top-0 left-0 h-full w-full bg-cover bg-center rounded-lg"
                      style={{
                        backgroundImage: `url(${broucher})`,
                      }}
                    ></div>
                    <div className="relative py-5 top-0 left-0 flex h-full w-full flex-col justify-center rounded-lg bg-white bg-opacity-60">
                      <div className="mb-4 text-center">
                        <img
                          className="mx-auto  h-8  w-8 "
                          src={
                            previewsource
                              ? `${previewsource}`
                              : "https://static.vecteezy.com/system/resources/previews/000/392/153/original/modern-company-logo-design-vector.jpg"
                          }
                          alt="Company Logo"
                        />
                        <h1 className="mb-1 text-2xl font-bold tracking-wider text-gray-800">
                          {company_name}
                        </h1>
                        <h2 className="mb-2 text-md  font-medium tracking-widest text-gray-700">
                          {moto}
                        </h2>
                        <p className="text-xs  mb-2 text-gray-700">
                          {company_desc}
                        </p>
                        <a
                          className="rounded bg-gray-800 py-1 px-2 text-xs text-white hover:bg-gray-900"
                          href={link_one}
                        >
                          Visit Our Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {edit && (
                <div className="flex flex-col col-span-2">
                  <label htmlFor="broucher" className="mb-2 font-medium">
                    Broucher's Background Image
                  </label>
                  <input
                    type="file"
                    id="broucher"
                    onChange={(e) => handleBroucherImage(e)}
                    className="border-gray-300 border-2 py-2 px-4 rounded-lg w-full"
                  />
                </div>
              )}
              {edit && (
                <div className="flex flex-col col-span-2 w-full items-start justify-around">
                  <label htmlFor="broucher" className="mb-2 font-medium">
                    Broucher Template's
                  </label>
                  <div className="flex flex-row justify-around col-span-2 w-full">
                    <label className="cursor-pointer w-5/12">
                      <input
                        type="radio"
                        className="peer sr-only"
                        name="pricing"
                        value={1}
                        onChange={(e) => setTemplate(parseInt(e.target.value))}
                        checked={template === 1}
                      />
                      <div className="w-full rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold uppercase text-gray-500">
                              Template 1
                            </p>
                            <div>
                              <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="w-full h-[300px]">
                            <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
                              <div
                                className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${broucher})`,
                                }}
                              >
                                <div className="relative top-0 left-0 flex h-full w-full flex-col justify-between bg-black bg-opacity-75 p-8">
                                  <div className="mb-4 flex items-center">
                                    <img
                                      className="mr-4 h-8  w-8 "
                                      src={
                                        previewsource
                                          ? `${previewsource}`
                                          : "https://static.vecteezy.com/system/resources/previews/000/392/153/original/modern-company-logo-design-vector.jpg"
                                      }
                                      alt="Company Logo"
                                    />
                                    <div className="text-white">
                                      <div className="mb-1  text-2xl font-medium">
                                        {company_name}
                                      </div>
                                      <div className="text-sm text-base text-gray-300 ">
                                        {moto}
                                      </div>
                                    </div>
                                  </div>
                                  <p className="mb-2 text-xs text-base text-gray-300 text-center">
                                    {company_desc}
                                  </p>
                                  <a
                                    className="rounded bg-blue-500 py-1 px-2 text-sm text-white hover:bg-blue-600"
                                    href={link_one}
                                  >
                                    Visit Our Website
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="cursor-pointer w-5/12">
                      <input
                        type="radio"
                        className="peer sr-only"
                        name="pricing"
                        value={2}
                        onChange={(e) => setTemplate(parseInt(e.target.value))}
                        checked={template === 2}
                      />
                      <div className="w-full max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold uppercase text-gray-500">
                              Template 2
                            </p>
                            <div>
                              <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="w-full h-[300px]">
                            <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
                              <div
                                className="absolute top-0 left-0 h-full w-full bg-cover bg-center rounded-lg"
                                style={{
                                  backgroundImage: `url(${broucher})`,
                                }}
                              ></div>
                              <div className="relative py-5 top-0 left-0 flex h-full w-full flex-col justify-center rounded-lg bg-white bg-opacity-60">
                                <div className="mb-4 text-center">
                                  <img
                                    className="mx-auto  h-8  w-8 "
                                    src={
                                      previewsource
                                        ? `${previewsource}`
                                        : "https://static.vecteezy.com/system/resources/previews/000/392/153/original/modern-company-logo-design-vector.jpg"
                                    }
                                    alt="Company Logo"
                                  />
                                  <h1 className="mb-1 text-2xl font-bold tracking-wider text-gray-800">
                                    {company_name}
                                  </h1>
                                  <h2 className="mb-2 text-md  font-medium tracking-widest text-gray-700">
                                    {moto}
                                  </h2>
                                  <p className="text-xs  mb-2 text-gray-700">
                                    {company_desc}
                                  </p>
                                  <a
                                    className="rounded bg-gray-800 py-1 px-2 text-xs text-white hover:bg-gray-900"
                                    href={link_one}
                                  >
                                    Visit Our Website
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}
              {edit && (
                <div className="w-full flex justify-center items-center">
                  {updating ? (
                    <button
                      disabled
                      className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
                    >
                      Updating
                      <ClipLoader className="ml-2" size={20} color="#d63636" />
                    </button>
                  ) : (
                    <div className="flex flex-col">
                      <button
                        className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Profile;
