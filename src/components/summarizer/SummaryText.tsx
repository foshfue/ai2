import React, { useState } from 'react'
import { CopyCodeButton } from '../CodeCodeButton'
import { Typewriter } from '../Typewriter'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'

export const SummaryText = ({ textCost, boxRevaled, setBoxRevaled }: { textCost: string, boxRevaled: boolean, setBoxRevaled: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const router = useRouter()
    const youtubeVideoId = router.query.v

    const [textSummary, setTextSummary] = useState("")
    const summaryAvbl = textSummary.length < 10 ? true : false



    const summaryMutation = trpc.summary.getSummary.useMutation().mutateAsync


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        console.log("button clicked")
        setBoxRevaled(true)

        if (typeof youtubeVideoId === 'string') {
            summaryMutation({ videoId: youtubeVideoId }, {
                onSuccess: (data) => {
                    setTextSummary(String(data))
                },

            })
        }
    }

    return (
        <>

            {!boxRevaled && youtubeVideoId && <div className='my-6 flex flex-col gap-4'>
                <button className='bg-black text-white p-4 font-semibold text-lg rounded-lg' onClick={(e) => handleClick(e)}>
                    Generate AI Summary ({textCost} coins)
                </button>
                <span className='text-sm'>AI Summary cost depends of the lenght of the video.</span>
            </div>
            }
            <div className='py-8'>
                {boxRevaled && <div className="terminal bg-b60_primary rounded-md text-white py-10 px-10">
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

        </>
    )
}
