import React, { useState } from 'react'

import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from './Container'
import backgroundImage from './../images/background-features.jpg'
import screenshotExpenses from './../images/screenshots/expenses.png'
import screenshotPayroll from './../images/screenshots/payroll.png'
import screenshotReporting from './../images/screenshots/reporting.png'
import screenshotVatReturns from './../images/screenshots/vat-returns.png'

export default function HourCalculator() {

    const [value, setValue] = useState("5")


    const averageVideoLength = 14
    const month = 30
    const year = 365
    const hoursPerDay = 24
    const costPerAverageVideoLenght = 0.25



    const hoursSaved = (Number(value) * averageVideoLength * month) / 60



    return (

        <section
            id="hourcalculator"
            aria-label="Features for running your books"
            className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32 w-full"
        >
            <Image
                className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
                src={backgroundImage}
                alt=""
                width={2245}
                height={1636}
                unoptimized
            />
            <Container className="relative">
                <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none  font-display">
                    <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                        Get Your {hoursSaved} Hours Back
                    </h2>
                    <p className="mt-6 text-lg tracking-tight text-blue-100">
                        If you watch {Number(value) % 10 === 0 ? "+10" : value} videos daily
                    </p>

                    <input className='slider-thumb w-full md:w-2/3 h-4 appearance-none bg-blue-100 cursor-pointer shadow-xl rounded-lg mt-3' type="range" min="1" max="10" step="1" defaultValue="4" value={value} onChange={(e) => setValue(e.target.value)}></input>
                    <p className="mt-6 text-lg tracking-tight text-blue-100">
                        You can get back <br></br>
                        <span className='font-semibold'>{hoursSaved} hours </span>  atleast this month
                        <br></br>
                        <span className='font-semibold'>{hoursSaved * 12 / 24} days</span> this year
                        less than   <span className='font-semibold'>1.1 cents</span> per hour

                    </p>
                    {/* text-sm */}

                </div>

            </Container>
        </section>

        //     <div>HourCalculator
        //         <form>
        //             <div className='flex flex-col'>

        //                 <span>I watch {Number(value) % 10 === 0 ? "+10" : value} videos daily</span>
        //                 <input type="range" min="1" max="10" step="1" defaultValue="4" value={value} onChange={(e) => setValue(e.target.value)}></input>
        //                 <span>You can save {hoursSaved} hours atleast  this month</span>
        //             </div>
        //         </form>
        //     </div>
    )
}
