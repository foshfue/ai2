import { useEffect, useState } from "react";

export const CopyCodeButton = ({ code, summaryAvbl }: { code: string, summaryAvbl: boolean }) => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        navigator.clipboard.writeText(code);
        setClicked(true)
    };
    useEffect(() => {
        if (clicked) {
            setTimeout(() => {
                setClicked(false)
            }, 2500)
        }
    }, [clicked])

    return (
        <div>
            {clicked ?
                <button className='rounded-2xl py-2 px-4 text-xs text-gray-200'>✓ Copied!</button>
                :
                <button disabled={summaryAvbl} className={` ${summaryAvbl ? " bg-gray-600" : "bg-gray-700"} rounded-2xl py-2 px-4 text-xs text-gray-300 shadow-md`} onClick={handleClick}>Copy</button>
            }

        </div>
    );
};
