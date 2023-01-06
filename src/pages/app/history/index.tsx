import React from 'react'
import Layout from '../../../components/Layout'
import VideoCard from '../../../components/VideoCard'
import Link from 'next/link'
import { trpc } from '../../../utils/trpc';

export default function History() {
    const { data, isLoading, error } =
        trpc.video.getVideoHistory.useQuery();

    if (isLoading) return (<div>Loading...</div>
    )
    if (error) return (<div>Error...</div>)



    return (
        <div className='px-10 sm:px-28 py-5 flex bg-background_primary w-full flex-col  '>

            <div>
                <h3 className='text-3xl font-bold mt-12 mb-6'>History</h3>
            </div>


            <div className='grid  gap-4 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full'>
                {data && data.map((video) => {

                    return (<VideoCard key={video.id} video={video} />)

                })}
                {/* <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard /> */}


            </div>
        </div>
    )
}


History.Layout = Layout