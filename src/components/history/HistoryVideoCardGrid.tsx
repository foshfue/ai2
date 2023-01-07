import React from 'react'
import VideoCard from '../VideoCard'
import { trpc } from '../../utils/trpc';

export const HistoryVideoCardGrid = () => {
    const { data, isLoading, error } =
        trpc.video.getVideoHistory.useQuery();


    if (error) return (<div>Error...</div>)
    return (
        <>
            <div className='grid  gap-4 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full'>
                {/* {isLoading && } */}
                {isLoading && (
                    <>
                        <div>
                            <div className=' w-full  cursor-pointer sm:max-w-sm'>
                                <div>


                                </div>
                                <div className='aspect-video relative w-full'>


                                    <div className='w-full h-full bg-gray-200 rounded-lg animate-pulse flex justify-center items-center'>
                                        <span className='animate-bounce'>Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-col pt-2 gap-1 '>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-8/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>

                                </div>
                            </div >
                        </div>
                        <div>
                            <div className=' w-full  cursor-pointer sm:max-w-sm'>
                                <div>


                                </div>
                                <div className='aspect-video relative w-full'>


                                    <div className='w-full h-full bg-gray-200 rounded-lg animate-pulse flex justify-center items-center'>
                                        <span className='animate-bounce'>Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-col pt-2 gap-1 '>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-8/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>

                                </div>
                            </div >
                        </div>
                        <div>
                            <div className=' w-full  cursor-pointer sm:max-w-sm'>
                                <div>


                                </div>
                                <div className='aspect-video relative w-full'>


                                    <div className='w-full h-full bg-gray-200 rounded-lg animate-pulse flex justify-center items-center'>
                                        <span className='animate-bounce'>Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-col pt-2 gap-1 '>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-8/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>

                                </div>
                            </div >
                        </div>
                        <div>
                            <div className=' w-full  cursor-pointer sm:max-w-sm'>
                                <div>


                                </div>
                                <div className='aspect-video relative w-full'>


                                    <div className='w-full h-full bg-gray-200 rounded-lg animate-pulse flex justify-center items-center'>
                                        <span className='animate-bounce'>Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-col pt-2 gap-1 '>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-8/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>

                                </div>
                            </div >
                        </div>
                        <div>
                            <div className=' w-full  cursor-pointer sm:max-w-sm'>
                                <div>


                                </div>
                                <div className='aspect-video relative w-full'>


                                    <div className='w-full h-full bg-gray-200 rounded-lg animate-pulse flex justify-center items-center'>
                                        <span className='animate-bounce'>Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-col pt-2 gap-1 '>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-8/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>

                                </div>
                            </div >
                        </div>
                        <div>
                            <div className=' w-full  cursor-pointer sm:max-w-sm'>
                                <div>


                                </div>
                                <div className='aspect-video relative w-full'>


                                    <div className='w-full h-full bg-gray-200 rounded-lg animate-pulse flex justify-center items-center'>
                                        <span className='animate-bounce'>Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-col pt-2 gap-1 '>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-8/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>
                                    <span className='text-md font-bold line-clamp-2 text-black/80 bg-gray-200 animate-pulse w-7/12 h-4 rounded-lg'></span>

                                </div>
                            </div >
                        </div>
                    </>
                )
                }
                {data && data.map((video) => {

                    return (<VideoCard key={video.id} video={video} />)

                })}
                {/* <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard /> */}


            </div>
        </>
    )
}
