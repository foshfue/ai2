import React, { ReactNode } from 'react'

export const LoggedInLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>

            <div>{children}</div>
        </>
    )
}
