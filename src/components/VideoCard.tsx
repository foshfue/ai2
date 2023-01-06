import { SearchHistory, Video } from '@prisma/client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function VideoCard({ video }: {
    video: SearchHistory & {
        video: Video;
    }
}) {




    return (
        <>
            <Link href={`/app/history/video?vID=${video.videoId}`}>
                <div className=' w-full  cursor-pointer sm:max-w-sm'>
                    <div>


                    </div>
                    <div className='aspect-video relative w-full'>
                        <div className='absolute top-0 right-0 bg-green-100 text-green-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs mt-1 mr-1 font-medium capitalize z-10'


                        >Summarized</div>
                        {
                            video.video.imageUrl ?

                                <Image
                                    src={video.video.imageUrl + ""}
                                    alt={video.video.title + ""}
                                    fill
                                    className='rounded-lg'
                                ></Image> :
                                <div className='w-full h-full bg-gray-200'>Error on loading image</div>}
                    </div>
                    <div className='flex flex-col pt-1'>
                        <span className='text-md font-bold line-clamp-2 text-black/80'>{video.video.title}</span>
                        <span className='line-clamp-1 text-text_secondary'>{video.video.channel}</span>
                        <span className='line-clamp-1 text-text_secondary'>youtube.com/watch?v={video.video.youtubeId}</span>

                    </div>
                </div >
            </Link>
        </>
    )
}
