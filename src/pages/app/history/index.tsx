import React from 'react'
import Layout from '../../../components/Layout'

import { HistoryVideoCardGrid } from '../../../components/history/HistoryVideoCardGrid';

export default function History() {




    return (
        <div className='px-10 sm:px-28 py-5 flex bg-background_primary w-full flex-col  '>

            <div>
                <h3 className='text-3xl font-bold mt-12 mb-6'>History</h3>
            </div>
            <HistoryVideoCardGrid />


        </div>
    )
}


History.Layout = Layout