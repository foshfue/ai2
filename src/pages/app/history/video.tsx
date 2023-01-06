import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../components/Layout'
import { trpc } from '../../../utils/trpc';
import { Typewriter } from '../../../components/Typewriter';
import VideoCard from '../../../components/VideoCard';
import Image from 'next/image';
import { videoRouter } from '../../../server/trpc/router/video';


const SummaryDisplay = ({ vID }: { vID: string }) => {

    const { data, isLoading, error } = trpc.summary.getSummaryById.useQuery({ summaryId: vID });

    if (isLoading) return (<div>Loading...</div>
    )
    if (error) return (<div>Error...</div>)

    console.log("data", data)

    return (

        <>
            {
                data && data.map((summary) => {
                    return (
                        <div key={summary.id} className="terminal relative bg-b60_primary/20 rounded-md text-black font-normal text-base py-10 pb-20 px-10 mb-8">



                            {/* <code>{JSON.stringify(summary, null, 2)}</code> */}
                            <div className=''>
                                <div className="">
                                    <div className='relative aspect-video mb-2'>
                                        {summary.video.thumbnail ?
                                            <Image src={summary.video.thumbnail} alt="hey" fill className='rounded-lg' />
                                            : <div className='bg-background_primary w-full h-full rounded-lg flex justify-center items-center'>
                                                <span className='text-lg text-danger'>Opps. An error happend while loading the image</span>
                                            </div>} </div>
                                    <div>
                                        <div className='mb-4'>
                                            <h3 className='text-xl text-text_secondary font-bold'>{summary.video.title}</h3>
                                            <span className='text-text_secondary/90'>{summary.video.channel}</span>
                                        </div>
                                        <div className='max-w-2xl'>
                                            <p>{summary.text}</p>
                                        </div>

                                    </div>

                                </div>
                                <span className='absolute right-0 mr-12 mt-8 text-sm text-text_secondary'>
                                    Created at {new Date(summary.createdAt).toLocaleString()}
                                </span>
                            </div >
                        </div>
                    )
                })
            }
        </>
    )
}


export default function Video() {

    const router = useRouter()
    const { vID } = router.query
    const videoId = vID as string


    return (
        <div className='bg-b20_primary w-full flex  justify-center pt-20'>
            <div className='max-w-2xl'>
                {/* Video{vID} */}
                {vID && <SummaryDisplay vID={videoId} />}
            </div>
        </div>
    )
}


Video.Layout = Layout