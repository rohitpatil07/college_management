'use client';
import React from 'react';
import Link from 'next/link';
const StuHomePage = () => {
  return (
    <div className="w-screen md:w-10/12 sm:shadow-2xl sm:rounded-xl sm:p-5 flex flex-col justify-around items-center sm:container sm:mt-20 sm:mx-auto border-solid w=48rem bg-slate-200 sm:bg-white">
      <div className='w-64 sm:w-11/12 border-b border-slate-300  py-3'>
        <button className="flex flex-row text-base text-slate-500 font-medium items-center">
          <svg className='mr-2 w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
          </svg>
          Home
        </button>
      </div>
      <br />
      <div className=" flex flex-col sm:flex-row justify-evenly items-center w-full mb-5">
        <div className="w-64 sm:w-72 shadow-xl rounded-xl overflow-hidden bg-white border-slate-300 border-solid border-2">
          <img className='w-full min-h-[10rem] object-cover' src="https://thumbs.dreamstime.com/b/football-field-american-night-64951738.jpg" alt='TPC' />
          <div className='p-5 flex flex-col gap-3 items=center text-center'>
            <span className='text-xl font-bold text-gray-900'>Learning Management<br/>System</span>
            <span className='text-slate-500 text-sm'>Lorem ipsum 15 ranfrom doernb fjdj jjdusj jdjdunhh hhd jjdddjd djdjud ddj ffid ff rirn jdjd eu hdd</span>
            <Link href="/" className='p-2 w-fit mx-auto px-5 rounded-3xl' style={{ backgroundColor: '#c9243f', color: 'white' }}>Go To LMS</Link>
          </div>
        </div>
        <br />
        <div className="w-64 sm:w-72 shadow-xl rounded-xl overflow-hidden bg-white border-slate-300 border-solid border-2">
          <img className='w-full min-h-[10rem] object-cover' src="https://thumbs.dreamstime.com/b/football-field-american-night-64951738.jpg" alt='TPC' />
          <div className='p-5 flex flex-col gap-3 items=center text-center'>
            <span className='text-xl font-bold text-gray-900'>Training And Placement<br/>Cell</span>
            <span className='text-slate-500 text-sm'>Lorem ipsum 15 ranfrom doernb fjdj jjdusj jdjdunhh hhd jjdddjd djdjud ddj ffid ff rirn jdjd eu hdd</span>
            <Link href="/" className='p-2 w-fit mx-auto px-5 rounded-3xl' style={{ backgroundColor: '#c9243f', color: 'white' }}>Go To TPC</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default StuHomePage