'use-client'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
const OfferForm = ({ showForm,offer_id }: any) => {
    const fileType = ['image/png','image/jpeg','image/jpg','application/pdf'];
    const [offer_letter, setOffer_letter] = useState('');
    const uploadFile=(e:any)=>{
        const selectedFile = e.target.files[0];
        console.log(typeof(selectedFile.size));
        if (selectedFile && fileType.includes(selectedFile.type)) {
            if(selectedFile.size > 150000){
                Swal.fire({
                    icon: 'warning',
                    title: 'File Size Should Be Less Than 150kb',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else{
                const reader: any = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = () => {
                    setOffer_letter(reader.result);
                }
            }
        } 
        else{
            Swal.fire({
                icon: 'error',
                title: 'Invalid Format',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
    const create=(file: any)=>{
        console.log(offer_letter);
        console.log(offer_letter.slice(5,6));
        console.log(offer_letter.slice(11,12));
        console.log(offer_letter.slice(13,14));

    }
    return (
        <div>
            {showForm ?
                <div className='w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white border-solid border-2 border-neutral-200 rounded-lg mx-auto sm:mx-0 w-11/12 sm:w-10/12'>
                        <div className='border-b px-4 py-2'>
                            <h3>New Offer</h3>
                        </div>
                        <div className='p-3 flex flex-col'>
                                <input type="file" onChange={uploadFile} />
                                <p className='text-red-600 text-xs'>*File format .jpg, .jpeg, .png, .pdf</p>
                        </div>
                        <div className='flex justify-end items-center w-100 border-t text-white p-3'>
                                <button onClick={create} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-1">
                                Add
                            </button>
                            <form>
                            <button onClick={() => showForm = false} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                                Cancel
                            </button>
                            </form>
                                </div>
                    </div>
                </div>
                : <></>}
        </div>
    )
}

export default OfferForm
