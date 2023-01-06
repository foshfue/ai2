import { useRouter } from "next/router"
import { trpc } from "../utils/trpc"
import Image from "next/image"
import { object } from "zod"

export const VideoBox = () => {
    const router = useRouter()
    const youtubeVideoId = router.query.v


    const { data, isLoading, error } = trpc.video.getVideo.useQuery({ videoId: youtubeVideoId + "" }, { refetchOnMount: true, refetchOnWindowFocus: false, refetchOnReconnect: true })

    if (isLoading) return (
        < div className='m-6 flex ' >
            <div className='w-[213px] h-[168px] bg-gray-300 text-center'>
                Loading...
            </div>

            <div className='flex flex-col px-4'>
                <div className='w-full h-[20px] rounded-full bg-gray-200'></div>
                <div className='w-1/4 h-[18px] rounded-full bg-gray-200'></div>
                <div className='w-1/8 h-[14px] rounded-full bg-gray-200'></div>

            </div>
        </div >
    )
    if (error) return (
        < div className='m-6 flex ' >
            <h3>Opss there is an error, try other video</h3>
            <div className='w-[213px] h-[168px] bg-gray-300 text-center'>
                Loading...
            </div>

            <div className='flex flex-col px-4'>
                <div className='w-full h-[20px] rounded-full bg-gray-200'></div>
                <div className='w-1/4 h-[18px] rounded-full bg-gray-200'></div>
                <div className='w-1/8 h-[14px] rounded-full bg-gray-200'></div>

            </div>
        </div >
    )

    return (
        <div className='my-6 flex object-cover '>
            <div className="aspect-video bg-gray-200 w-full h-full max-w-sm flex items-center rounded-xl" style={{ overflowY: 'clip', width: '240px' }}>
                {(!data?.width || !data?.height) ?
                    <div className="bg-gray-200 w-[240px] h-[135px] rounded-xl ">
                        <span>Error loading image</span>

                    </div> :

                    <Image
                        src={data?.thumbnail || ""}
                        alt="Picture of the author"
                        width={data?.width / 2}
                        height={data?.height / 2}
                    // style={{ objectFit: "cover" }}


                    />
                }
            </div>
            <div className='flex flex-col px-4 max-w-sm'>

                <h1 className="text-base font-medium text-primary pb-1 " > {data?.title}</h1>
                <h2 className=' text-sm text-b60_primary'>{data?.channel}</h2>
                {/* <p>{video.description}</p> */}
                <span className="text-sm text-b60_primary">Video Link: www.youtube.com/watch?v={youtubeVideoId}</span>
            </div >
        </div >
    )
}