import React from 'react'
import { trpc } from '../../utils/trpc'
import { useRouter } from 'next/router'

export const SummaryCostButton = ({ handleClick }: { handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
    const router = useRouter()
    const youtubeVideoId = router.query.v + ""
    const { isLoading, error, data } = trpc.summary.getCost.useQuery({ videoId: youtubeVideoId })

    // if (isLoading) return (<span>Loading...</span>)
    if ((!data || error) && !isLoading) return (<span>Error... please try to refresh the page</span>)
    if (data === 0) return (<span>Summary not available for this video</span>)


    return (
        <>
            <button disabled={isLoading} onClick={(e) => handleClick(e)}
                className={`${isLoading ? "bg-b60_primary  text-white/20" : "bg-black  text-white"} p-4 font-semibold text-lg rounded-lg ${data === 0 ? "cursor-not-allowed text-danger" : ""}}`}
            >
                {isLoading && <span className="animate-pulse">Loading...</span>}
                {data && data !== 0 && `Generate AI Summary (${data} coin)`}
                {data === 0 && "Summary not available for this video"}

            </button>
        </>

    )
}
