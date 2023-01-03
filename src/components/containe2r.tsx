import React from 'react'

export default function Containter({ children, classNames = "", }: { children: React.ReactNode, classNames?: string }) {
    return (
        <div className={`max-w-7xl m-auto  w-full h-full${classNames}`}>


            {children}</div>
    )
}
