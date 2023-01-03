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

    const [textSummary, setTextSummary] = useState("")
    const [errorSummary, setErrorSummary] = useState("")
    const [textCost, setTextCost] = useState("")


    const getCostMutation = trpc.summary.getCost.useMutation().mutateAsync

    useEffect(() => {
        if (typeof youtubeVideoId === 'string' && youtubeVideoId.length > 4) {
            getCostMutation({ videoId: youtubeVideoId }, {
                onSuccess: (data) => {
                    setTextCost(String(data))
                },
            })
        }
    }, [getCostMutation, youtubeVideoId])

    console.log("textCost ", textCost)





    const summaryMutation = trpc.summary.getSummary.useMutation().mutateAsync
    const handleClick = () => {
        console.log("button clicked")
        setBoxRevaled(true)
        if (typeof youtubeVideoId === 'string') {
            summaryMutation({ videoId: youtubeVideoId }, {
                onSuccess: (data) => {
                    console.log("data ", { data })

                    if (data === "The text is too long to summarize. Please try another video.") {
                        setErrorSummary(data)
                        return
                    }
                    setTextSummary(String(data))
                },
                onError: (error) => {
                    console.log("error ", error)
                    setErrorSummary(error.message)
                }
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const videoId = search.split('v=')[1]
        router.replace({ query: { v: videoId } })
    }

    console.log("search", search)
    const summaryAvbl = textSummary.length < 10 ? true : false

    console.log("test", (youtubeVideoId))
    return (
        <div className='bg-slate-500 py-20 sm:py-32 w-full flex  justify-center -mt-20'>


            <div className=" max-w-4xl w-full min-h-screen  ">
                {/* <h2 className="text-4xl font-bold py-8 m-6 text-white" </h2> */}
                <div className="md:text-center ">
                    <h2 className="font-display text-3xl  tracking-tight text-white sm:text-4xl">
                        <span className="relative whitespace-nowrap">
                            <SwirlyDoodle className="absolute top-1/2 left-0 h-[1em] w-full fill-blue-400" />
                            <span className="relative">AI Summarizer</span>
                        </span>{' '}
                        for everyone.
                    </h2>
                    <p className="mt-4 text-lg text-slate-400">
                        It doesn’t matter what size your business is, our software won’t
                        work well for you.
                    </p>
                </div>

                <div className='mx-6 pt-6'>
                    <form onSubmit={handleSubmit} className="flex flex-col">


                        {/* <label htmlFor='videoLink' className='text-lg font-semibold w-full'>Enter the video link to find video:</label> */}
                        <div className='flex flex-row gap-x-4 relative'>
                            <label className='absolute' htmlFor='videoLink'>
                                <MagnifyingGlassIcon className=' h-8 w-8 my-2 ml-2 fill-slate-400 ' />
                            </label>
                            <input id='videoLink' className='bg-gray-200 py-3 px-5 w-full rounded-3xl pl-12 '
                                placeholder='Enter the video link: www.youtube.com/watch?v=j23SO29LNWE' onChange={(e) => { setSearch(e.target.value) }}
                            ></input>

                            {/* <button type='submit' className='bg-black text-white font-semibold text-xl  py-4 px-5 rounded-3xl '>
                                Find the video
                            </button> */}

                            <Button type="submit" className=" flex-none px-6">
                                Find the video
                            </Button>
                        </div>
                    </form>
                </div>

                {youtubeVideoId &&

                    <VideoBox />

                }
                {!boxRevaled && youtubeVideoId && <div className='m-6 flex flex-col gap-4'>
                    <button className='bg-black text-white p-4 font-semibold text-lg rounded-lg' onClick={() => handleClick()}>
                        Generate AI Summary ({textCost} coins)
                    </button>
                    <span className='text-sm'>AI Summary cost depends of the lenght of the video.</span>
                </div>
                }
                <div>
                    {boxRevaled && <div className="terminal bg-gray-600 text-white p-6">
                        <div>
                            <div className="terminal-header flex justify-between items-start  pb-3">
                                <div className="font-semibold text-lg">AI Generated Summary</div>
                                <CopyCodeButton code={textSummary} summaryAvbl={summaryAvbl} />
                            </div>
                            {summaryAvbl &&

                                <span>Analyzing the video... This might take upto 30 seconds... <span></span><span className='cursor'>|</span></span>}
                        </div>
                        <div>
                            {!summaryAvbl &&
                                <div >
                                    <Typewriter messages={[textSummary]} interval={50} cursor='▪' />
                                </div>
                            }
                        </div>

                    </div>}
                </div >
            </div >
        </div>



    )
}

Watch.Layout = Layout;
