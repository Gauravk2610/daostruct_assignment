import React from 'react'

const Header = () => {
  return (
    <div className='h-28 shadow-sm px-6 py-2 backdrop-blur-sm flex items-center justify-between border-b border-gray-700'>
        {/* Nasa Log with Name */}
        <div className='flex flex-col my-1 items-center select-none'>
            <img 
            className='w-16 h-16 object-contain'
            draggable="false"
            src="/assets/nasaLogo.png" 
            alt="Nasa" />
            <div className='text-sm text-center'>
                Gaurav Konde
            </div>
        </div>
        <div className='text-center text-lg md:text-2xl font-semibold'>
            Astronomy Picture of the Day
        </div>
        {/* <img 
        className='w-24 h-24 object-contain'
        src="https://apod.nasa.gov/apod/image/2212/J7A6402-Edit-copy-sharpened1024.jpg" 
        alt="" /> */}
    </div>
  )
}

export default Header