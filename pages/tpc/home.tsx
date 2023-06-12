"use client";
import React, { useState } from "react";

const SLIDES = [
  {
    id: 1,
    companyName: "Company Name 1",
    motto: "Motto 1",
    description: "Description 1",
    image: "image1.jpg",
  },
  {
    id: 2,
    companyName: "Company Name 2",
    motto: "Motto 2",
    description: "Description 2",
    image: "image2.jpg",
  },
  {
    id: 3,
    companyName: "Company Name 3",
    motto: "Motto 3",
    description: "Description 3",
    image: "image3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [companyData, setCompanyData] = useState(SLIDES[currentSlide]);

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % SLIDES.length;
    setCurrentSlide(nextSlide);
    setCompanyData(SLIDES[nextSlide]);
  };

  const handlePrev = () => {
    const prevSlide = currentSlide === 0 ? SLIDES.length - 1 : currentSlide - 1;
    setCurrentSlide(prevSlide);
    setCompanyData(SLIDES[prevSlide]);
  };

  return (
    <div className="w-full h-[300px]">
      <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
        <div
          className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${companyData.image})` }}
        >
          <div className="relative top-0 left-0 flex h-full w-full flex-col justify-between bg-black bg-opacity-75 p-8">
            <div className="mb-4 flex items-center">
              <img
                className="mr-4 h-8 w-8 "
                src="https://static.vecteezy.com/system/resources/previews/000/664/513/original/landing-page-template-design-vector.jpg"
                alt="Company Logo"
              />
              <div className="text-white">
                <div className="mb-1 text-2xl font-medium">
                  {companyData.companyName}
                </div>
                <div className="text-sm text-base text-gray-300 ">
                  Motto: {companyData.motto}
                </div>
              </div>
            </div>
            <p className="mb-2 text-xs text-base text-gray-300 text-center">
              {companyData.description}
            </p>
            <a
              className="rounded bg-blue-500 py-1 px-2 text-sm text-white hover:bg-blue-600"
              href="#"
            >
              Visit Our Website
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
