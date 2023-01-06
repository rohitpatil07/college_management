'use-client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
const OfferDetails = () => {
  const [offers, setOffers]: any = useState();
  const download = async () => {
    const response = await axios.get(`http://localhost:5000/download/resume/${AuthData.user.userData.user.roll_no}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthData.user.token}`
      },
      responseType: 'blob'
    }).then((response) => {
      const blob = response.data
      // console.log(blob);
      const url = window.URL.createObjectURL(blob);
      // console.log(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${AuthData.user.userData.user.roll_no}.pdf`;
      a.click();
    });
  }
  const AuthData: any = useAuth();
  const getOfferLetter = async (offer_id: string) => {
    const response = await axios.get(
      `http://localhost:5000/image/offerdownload/${offer_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
        responseType: 'blob'
    }).then((response) => {
      const blob = response.data
      // console.log(blob);
      const url = window.URL.createObjectURL(blob);
      // console.log(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'offer_letter.jpeg';
      a.click();
    });    
  }
  const [offer_letter, setoffer_letter] = useState();
  const uploadOfferLetter = async (offer_id: string) => {
    if(offer_letter){
      const body ={ offer_letter: offer_letter}
      const response = await axios.post(
        `http://localhost:5000/image/offerupload/${offer_id}`,
        body,
        {
          headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      );
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          showConfirmButton: false,
          timer: 1500,
        });
    get_data();
    }
  }
  const fileDetect=(e: any)=>{
    const reader: any = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onloadend = () => {
			setoffer_letter(reader.result);
		};
  }
  const update_Change=(x:number)=>{
    let newInfo = [...offers];
    newInfo[x]['showForm']=!newInfo[x]['showForm'];
    setOffers(newInfo);
  }
  const get_data = async () => {
    const response = await axios.get(
      `http://localhost:5000/filter/student/offer/${AuthData.user.userData.user.roll_no}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    )
    if(response.data.offers.length!=0){
      for(let i=0;i<response.data.offers.length;i++){
        response.data.offers[i]['showForm'] = false;
        response.data.offers[i]['packages'] =  response.data.offers[i]['package']
      }
      setOffers(response.data.offers);
    }
  }
  useEffect(() => {
    get_data();
  }, [])
  return (
    <div className="w-full sm:w-11/12 p-3 mx-auto flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 my-3">
        Offer Details
      </h3>
      {offers ? <>
        {offers.map(({ company_name, offer_id, packages, offer_letter, showForm }: any, i: number) => (
        <div key={offer_id} className='flex flex-col bg-white border-solid border-2 border-neutral-200 rounded-lg drop-shadow-xl w-full sm:w-11/12 mb-3 p-4 overflow-auto'>
          <h3 className='text-lg font-semibold text-gray-900 border-b-2 border-b-gray-400 pb-1 mb-1'>{i == 0 ? 'First Offer' : i == 1 ? 'Second Offer' : 'Super Dream Offer'}</h3>
          <h4>Company : {company_name}</h4>
          <h4>Package : {packages}</h4>
          {offer_letter ?
            <div className='flex justify-end items-center w-100 text-white p-1 border-t-2 pt-2 mt-1'>
              <button onClick={()=>{getOfferLetter(offer_id)}} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-1">
                Download
              </button>
              <button className="px-3 py-1 rounded bg-accent text-white hover:bg-red-700" onClick={()=>{update_Change(i)}}>
                Change
              </button>
            </div>
            :
            <div className='flex justify-end items-center w-100 text-white p-1 border-t-2 pt-2 mt-1' onClick={()=>{update_Change(i)}}>
              <button className="px-3 w-fit ml-auto py-1 rounded bg-accent text-white hover:bg-red-700">
                Add Offer Letter
              </button>
            </div>
          }
          {
            showForm ? 
            <div>
            <div className="mb-3 w-96">
              <input onChange={(e)=>{fileDetect(e)}} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" /> 
              <p className='text-red-600 text-xs'>*File format .jpg</p>
            </div>
            <div>
            <button onClick={()=>{uploadOfferLetter(offer_id)}} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Add</button>
            <button onClick={()=>{update_Change(i)}} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Close</button>

            </div>
          </div> :<></>
          }
        </div>
      ))}
      </> :<></>}
    </div>
  )
}

export default OfferDetails