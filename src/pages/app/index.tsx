import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { trpc } from '../../utils/trpc';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { CopyCodeButton } from '../../components/CodeCodeButton';
import { VideoBox } from '../../components/VideoBox';
import { Typewriter } from '../../components/Typewriter';
import { Button } from '../../components/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { SummaryText } from '../../components/summarizer/SummaryText';



//     const response = await fetch(`https://www.googleapis.com/youtube/v3/videos`, {
//         method: 'GET',
//         params: {
//             key: 'YOUR_API_KEY',
//             part: 'snippet',
//             id: videoId
//         }
//     });
//     const data = await response.json();
//     const thumbnailUrl = data.items[0].snippet.thumbnails.medium.url;
//     return thumbnailUrl;
// }





function SwirlyDoodle({ className }: { className: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 281 40"
            className={className}
            preserveAspectRatio="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
            />
        </svg>
    )
}





export default function Watch() {
    const router = useRouter()
    const youtubeVideoId = router.query.v

    const [boxRevaled, setBoxRevaled] = useState(false)


    const [search, setSearch] = useState("")


    const refSearch = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (refSearch.current) {

            refSearch.current.value = ""
        }

        const videoId = search.split('v=')[1]
        router.push({ query: { v: videoId } })
    }


    return (
        <div className={`${boxRevaled ? " sm:py-4" : " sm:py-32"}  "bg-background_primary  w-full flex  justify-center -mt-20"`}>
            <div className=" max-w-3xl w-full min-h-screen mx-6 ">
                {/* <h2 className="text-4xl font-bold py-8 m-6 text-white" </h2> */}
                <div className="md:text-start ">

                    <p className="mt-4 text-md text-text_secondary">
                        Search for the Youtube video and generate AI summary of the video.
                    </p>
                </div>

                <div className=' pt-4'>
                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">

                        {/* <label htmlFor='videoLink' className='text-lg font-semibold w-full'>Enter the video link to find video:</label> */}
                        <div className='flex flex-row  relative  ' >
                            <div className='flex items-center w-full'>


                                <label className='absolute' htmlFor='videoLink'>
                                    <MagnifyingGlassIcon className=' h-6 w-6  ml-2 fill-slate-400 ' />
                                </label>
                                <input id='videoLink'
                                    ref={refSearch}
                                    className='
                            outline-none bg-b0 shadow-md py-3 px-5 w-full rounded-md border h-full
                             border-[#ececf1] pl-12 focus:shadow-lg
                             
                             placeholder-searchinput
                             '
                                    autoComplete='off'
                                    placeholder='Enter the video link: www.youtube.com/watch?v=j23SO29LNWE' onChange={(e) => { setSearch(e.target.value) }}
                                ></input>
                            </div>
                            <button type="submit" className=" text-text_secondary px-6 h-full  py-3 text-base font-bold  ml-4 shadow-md rounded-md border-[#ececf1] bg-b0 border">
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {youtubeVideoId && <VideoBox />}
                <SummaryText boxRevaled={boxRevaled} setBoxRevaled={setBoxRevaled} />
            </div >
        </div>



    )
}

Watch.Layout = Layout;
