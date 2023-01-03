import React from 'react'

export default function Metrics() {
    return (
        <div className='flex flex-col max-w-5xl mt-20 sm:flex-row gap-y-8 mb-20'>
            <div className='text-center flex flex-col items-center w-full'>
                <h3 className=' mt-2 font-display text-xl text-slate-900'>1,000,000+ hours</h3>
                <p className='mt-4 text-sm text-slate-600 w-2/3'>of video summarized and saved in Youtube</p>
            </div>

            <div className='text-center flex flex-col items-center w-full'>
                <h3 className=' mt-2 font-display text-xl text-slate-900 '>4.9/5</h3>
                <p className='mt-4 text-sm text-slate-600 w-2/3'>happy customers better business</p>
            </div>

            <div className='text-center flex flex-col items-center w-full'>
                <h3 className=' mt-2 font-display text-xl text-slate-900'>60000+</h3>
                <p className='mt-4 text-sm text-slate-600 w-2/3'>video summarized by our customers and 96% of them loved it!</p>
            </div>


        </div>
    )
}
