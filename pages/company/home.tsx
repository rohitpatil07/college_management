import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Loading from "../../components/Loaders/Loading";

const Home = () => {
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
  const link =
    "https://www.jobstreet.com.sg/career-resources/wp-content/uploads/sites/3/2017/02/pexels-photo-93019.jpeg";
  return (
    <div className="w-full h-full flex justify-center items-center align-middle flex-col">
      {loading ? (
        <div className="my-10 flex flex-col items-center justify-center">
          <Loading loadState="loading" />
          <h3>Gathering Data</h3>
        </div>
      ) : (
        <>
          {template == 2 ? (
            <div className="flex bg-white w-10/12 h-[300px] sm:h-[300px] md:h-[600px] mt-5 flex-col items-center rounded-2xl drop-shadow-lg">
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
                      className="mx-auto md:mb-2 h-8 md:h-16 w-8 md:w-16"
                      src={`${logo}`}
                      alt="Company Logo"
                    />
                    <h1 className="mb-1 md:mb-2 text-2xl md:text-4xl font-bold tracking-wider text-gray-800">
                      {company_name}
                    </h1>
                    <h2 className="mb-2 md:mb-4 text-md md:text-xl font-medium tracking-widest text-gray-700">
                      {moto}
                    </h2>
                    <p className="text-xs md:text-sm mb-2 md:mb-4 text-gray-700">
                      {company_desc}
                    </p>
                    <a
                      className="rounded bg-gray-800 py-2 px-4 font-bold text-white hover:bg-gray-900"
                      href={`${link_one}`}
                    >
                      Visit Our Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : template == 1 ? (
            <div className="flex bg-white w-10/12 sm:h-[300px] md:h-[600px] mt-5 flex-col items-center rounded-2xl drop-shadow-lg">
              <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
                <div
                  className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${link})`,
                  }}
                >
                  <div className="relative top-0 left-0 flex h-full w-full flex-col justify-between bg-black bg-opacity-75 p-8">
                    <div className="mb-4 flex items-center">
                      <img
                        className="mr-4 h-8 md:h-16 w-8 md:w-16"
                        src={`${logo}`}
                        alt="Company Logo"
                      />
                      <div className="text-white">
                        <div className="mb-1 md:mb-2 text-2xl md:text-4xl font-bold">
                          {company_name}
                        </div>
                        <div className="text-sm md:text-lg text-base text-gray-300 ">
                          {moto}
                        </div>
                      </div>
                    </div>
                    <p className="mb-2 md:mb-4 text-xs md:text-sm text-base text-gray-300 text-center">
                      {company_desc}
                    </p>
                    <a
                      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600"
                      href={`${link_one}`}
                    >
                      Visit Our Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-10 flex flex-col items-center justify-center">
              You have not selected any template you can get a new one in
              Profile Section
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
