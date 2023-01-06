import { useSession } from 'next-auth/react';

import React from 'react'
import { Button } from './Button';

export default function Hero() {
    const { data: sessionData } = useSession();
    return (
        <div className='
        
        '
        >

            <div className='py-12 lg:pt-32 px-auto px-10 relative '>
                <div className='w-full justify-center text-center'>
                    <h1 className='mx-auto max-w-5xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl'>Get the most out of <span className=' text-rose-600'> YOUTUBE</span>,
                        10x faster and productive </h1>
                </div>
                <div className='flex justify-center items-center flex-row w-full   mt-16 mb-10'>

                    <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 text-center'>
                        Sumari is an AI summarization assistant that empowers you to learn from YouTube videos 10x faster, so you can stay up-to-date and save time.<br></br>
                        No more Watch Later lists, no more wasted time.
                    </p>
                    {/* <div className='flex  gap-x-10'>
                        <a className=' '>
                            <button className='text-xl truncate  font-medium py-4 px-5 bg-gradient-to-t from-pink-500 via-red-500 to-yellow-500 text-white'>

                                Start For Free
                            </button>
                        </a>
                        <a className=' text-xl  truncate font-medium py-4 px-5  bg-black text-white' >
                            Get a demo
                        </a>
                    </div> */}
                </div>
                <div className='flex items-center flex-col justify-center absolute -z-10  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40'>
                    <div className='flex flex-row mt-52'>
                        <div className='rounded-full h-96 w-96  -mx-16 blur-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 ' />
                        <div className='rounded-full h-96 w-96  -mx-16   blur-3xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600' />
                    </div>
                    <div className='rounded-full h-96 w-96 -mt-20  blur-3xl bg-gradient-to-r from-yellow-200 via-green-200 to-green-500' />
                </div>
                <div className='flex items-center w-full  justify-center'>

                    <Button
                        className=""

                        href={sessionData ? "/app" : "/api/auth/signin?callbackUrl=http://localhost:3000/app"}
                    >
                        Try Your Favorite Video

                    </Button>

                </div>
            </div>
        </div >
    )
}
