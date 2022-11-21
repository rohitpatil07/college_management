import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex flex-row w-full h-1/5 bg-black text-white justify-center text-3xl'>
        <Link href="placement" className='mx-4'>Placement Cell</Link>
        <Link href="lms">LMS</Link>
    </div>
  )
}

export default Header