'use-client'
import React,{ useState,useEffect } from 'react';
import OfferForm from './OfferComp/OfferForm';
import data from './OfferComp/offers.json';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
const OfferDetails = () => {
  const AuthData: any = useAuth();
    let offer:any  = data.offers;
    // const getOfferLetter = async (offer_id: string) => {
    //   const response = await axios.get(
    //     `http://localhost:5000/image/offerdownload/${offer_id}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${AuthData.user.token}`,
    //       },
    //     }
    //   );
    //   console.log(response);
    // }
    const get_data=async()=>{
      const response = await axios.get(
        `http://localhost:5000/filter/student/offer/${AuthData.user.userData.user.roll_no}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      )
    }
    const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full sm:w-11/12 p-3 mx-auto flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 my-3">
				Offer Details
        </h3>
        {offer.map(({ company_name, offer_id, packages,offer_letter}: any,i:number) => (
          <div key={offer_id} className='flex flex-col bg-white border-solid border-2 border-neutral-200 rounded-lg drop-shadow-xl w-full sm:w-11/12 mb-3 p-4'>
            <h3 className='text-lg font-semibold text-gray-900 border-b-2 border-b-gray-400 pb-1 mb-1'>{i==0 ? 'First Offer': i==1 ? 'Second Offer' :  'Super Dream Offer'}</h3>
            <h4>Company : {company_name}</h4>
            <h4>Package : {packages}</h4>
            {offer_letter ? 
           <div className='flex justify-end items-center w-100 text-white p-1 border-t-2 pt-2 mt-1'>
           <button  className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-1">
           Download
       </button>
       <button onClick={()=>setShowForm(!showForm)} className="px-3 py-1 rounded bg-accent text-white hover:bg-red-700">
           Change
       </button>
           </div>
            : 
            <div className='flex justify-end items-center w-100 text-white p-1 border-t-2 pt-2 mt-1'>
            <button onClick={()=>setShowForm(!showForm)} className="px-3 w-fit ml-auto py-1 rounded bg-accent text-white hover:bg-red-700">
            Add Offer Letter
        </button>
        </div>
            }
            <OfferForm showForm={showForm} offer_id={offer_id}/> 
          </div>
        ))}      
    </div>
  )
}

export default OfferDetails