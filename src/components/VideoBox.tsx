import { useRouter } from "next/router"
import { trpc } from "../utils/trpc"
import Image from "next/image"
import { object } from "zod"

export const VideoBox = () => {
    const router = useRouter()
    const youtubeVideoId = router.query.v


    const { data, isLoading, error } = trpc.video.getVideo.useQuery({ videoId: youtubeVideoId + "" })

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
        <div className='m-6 flex object-cover'>
            <div className="aspect-video bg-red-200 w-full h-full max-w-sm flex items-center rounded-xl" style={{ overflowY: 'clip', width: '240px' }}>


                <Image
                    src={data?.thumbnail || ""}
                    alt="Picture of the author"
                    width={data?.width / 2}
                    height={data?.height / 2}
                // style={{ objectFit: "cover" }}


                />
            </div>
            <div className='flex flex-col px-4'>

                <h1 className="text-lg font-semibold" > {data?.title}</h1>
                <h2 className='font-semibold'>{data?.channel}</h2>
                {/* <p>{video.description}</p> */}
                <span>Video Link: www.youtube.com/watch?v={youtubeVideoId}</span>
            </div >
        </div >
    )
}