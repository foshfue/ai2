import React from 'react'
import Layout from '../../components/Layout'
import { CheckIcon } from '@heroicons/react/24/solid'
import { UpgradeButton } from '../../components/account/UpgradeButton'
import { trpc } from '../../utils/trpc'

const pricing = {
    tiers: [
        {
            title: 'Basic',
            price: 4.90,
            frequency: '/month',
            description: 'The essentials to provide your best work for clients.',
            features: ['16 Coin', 'Save up to 3 hours every month', '1.89$/hour', 'Summary history'],
            cta: 'Monthly billing',
            mostPopular: false,
            package: 'basic',
        },
        {
            title: 'Entrepreneur',
            price: 14.90,
            frequency: '/month',
            description: 'A plan that scales with your rapidly growing business.',
            features: [
                '60 Coin',
                'Save up to 10 hours every month',
                '1.5$/hour',
                'Summary history',
            ],
            cta: 'Monthly billing',
            mostPopular: true,
            package: 'premium'

        },
        {
            title: 'Time Machine',
            price: 44.90,
            frequency: '/month',
            description: 'Dedicated support and infrastructure for your company.',
            features: [
                '260 coin',
                'Save up to 44 hours every month',
                '1.2$/hour',
                '1-hour, dedicated support response time',
                'Summary history',
                'Feature request priority',
            ],
            cta: 'Monthly billing',
            mostPopular: false,
            package: 'pro'
        },

    ],
}




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Upgrade() {

    const { data, isLoading } =
        trpc.user.subscriptionStatus.useQuery();

    const subscriptionStatus = data?.stripeSubscriptionStatus
    const subscriptionPlan = data?.stripeSubscriptionPlan
    return (
        <div className='px-10 sm:px-28 py-5 flex bg-background_primary w-full flex-col  '>

            <div>
                <h3 className='text-3xl font-bold mt-12 '>Upgrade</h3>
                <p className="mt-6 max-w-2xl text-md text-gray-500">
                    Choose best plan for you.
                </p>
            </div>




            {/* Tiers */}
            <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                {pricing.tiers.map((tier) => (
                    <div
                        className='relative   bg-white  rounded-2xl shadow-sm flex flex-col'
                        key={tier.title}
                    >
                        {!isLoading && (subscriptionStatus === null || subscriptionPlan === tier.package) && <div className="absolute s opacity-100  text-xl font-bold z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-success">Your current package</div>}
                        <div
                            className={`${!isLoading && (subscriptionStatus === null || subscriptionPlan === tier.package) && "pacity-80 blur-sm "} relative p-8 h-full  bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col`}
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
                                {tier.mostPopular ? (
                                    <p className="absolute top-0 py-1.5 px-4 bg-blue-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                                        Most popular
                                    </p>
                                ) : null}
                                <p className="mt-4 flex items-baseline text-gray-900">
                                    <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                                    <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
                                </p>
                                <p className="mt-6 text-gray-500">{tier.description}</p>

                                {/* Feature list */}
                                <ul role="list" className="mt-6 space-y-6">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex">
                                            <CheckIcon className="flex-shrink-0 w-6 h-6 text-blue-500" aria-hidden="true" />
                                            <span className="ml-3 text-gray-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <UpgradeButton userPackage={tier.package} condition={tier.mostPopular} />
                        </div>
                    </div>
                ))}

            </div>
        </div >
    )
}


Upgrade.Layout = Layout
