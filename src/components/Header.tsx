import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react'
import clsx from 'clsx';
import { Popover, Transition } from '@headlessui/react'
import { Container } from './Container';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { Button } from './Button';
import { trpc } from '../utils/trpc';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { BoltIcon } from '@heroicons/react/24/solid'


function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Popover.Button as={Link} href={href} className="block w-full p-2">
            {children}
        </Popover.Button>
    )
}


function MobileNavIcon({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
        >
            <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx(
                    'origin-center transition',
                    open && 'scale-90 opacity-0'
                )}
            />
            <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx(
                    'origin-center transition',
                    !open && 'scale-90 opacity-0'
                )}
            />
        </svg>
    )
}

function MobileNavigation() {
    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
            >
                {({ open }) => <MobileNavIcon open={open} />}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
                    >
                        <MobileNavLink href="#features">Features</MobileNavLink>
                        <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
                        <MobileNavLink href="#pricing">Pricing</MobileNavLink>
                        <hr className="m-2 border-slate-300/40" />
                        <MobileNavLink href="/login">Sign in</MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}
function AuthMobileNavigation() {
    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
            >
                {({ open }) => <MobileNavIcon open={open} />}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
                    >
                        <MobileNavLink href="#features">Features</MobileNavLink>
                        <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
                        <MobileNavLink href="#pricing">Pricing</MobileNavLink>
                        <hr className="m-2 border-slate-300/40" />
                        <MobileNavLink href="/login">Sign in</MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}


export const Coins = ({ userId }: { userId: string }) => {
    const { data: user, isLoading } = trpc.user.getUser.useQuery({ id: userId });
    const coins = user?.coins || 0;

    return (

        <span className="text-slate-700 group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-normal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">Coins: {coins} </span>

    )
}

const AuthlessHeader = () => {

    return (
        <>
            <nav className="relative z-50 flex justify-between">
                <div className="flex items-center md:gap-x-12">
                    <Link href="/" aria-label="Home">
                        <Logo className="h-10 w-auto" />
                    </Link>
                    <div className="hidden md:flex md:gap-x-6">
                        <NavLink href="/#features">Features</NavLink>
                        <NavLink href="/#pricing">Pricing</NavLink>
                        <NavLink href="/#testimonials">Testimonials</NavLink>
                        <NavLink href="/blogs">Blogs</NavLink>
                    </div>
                </div>
                <div className="flex items-center gap-x-5 md:gap-x-8">
                    <div className="hidden md:block">
                        <NavLink href={"/api/auth/signin"}> Sign in</NavLink>
                    </div>
                    {/* <Link href="/watch">
                            <Button color="blue">
                                <span>
                                    Get started <span className="hidden lg:inline">today</span>
                                </span>
                            </Button>
                        </Link> */}


                    <Button href={"/api/auth/signin?callbackUrl=http://localhost:3000/watch"} color="blue" className="">
                        <span>
                            Try for free <span className="hidden lg:inline">today</span>
                        </span>
                    </Button>



                    <div className="-mr-1 md:hidden">
                        <MobileNavigation />
                    </div>



                </div>
            </nav>

        </>

    )
}
const AuthHeader = ({ isSessionData, userId, userImage }: { isSessionData: boolean, userId: string | undefined, userImage: string | null | undefined }) => {

    return (
        <>
            <nav className="relative z-50 flex justify-between ">
                <div className="flex items-center md:gap-x-12">
                    <Link href="/app/dashboard" aria-label="Home">
                        <Logo className="h-10 w-auto" />
                    </Link>
                    <div className="hidden md:flex md:gap-x-6">
                        <NavLink href="/app/history">History</NavLink>
                        <NavLink href="/app">Summarizer</NavLink>

                    </div>
                </div>

                <div className="flex items-center gap-x-5 md:gap-x-8">
                    {
                        isSessionData && userId &&
                        <Coins userId={userId}></Coins>
                    }
                    <div>
                        <NavLink href={"/app/upgrade"}>


                            <span className='text-emerald-600 hover:text-emerald-700 flex items-center'>

                                <BoltIcon className='fill-emerald-600 w-4 h-4' />  Upgrade

                            </span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <Link href={"/app/account"}>
                            {!userImage ? <span>Account</span> :
                                <Image
                                    src={userImage}
                                    alt="User Image"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />}

                        </Link>
                    </div>
                    {/* <Link href="/watch">
                            <Button color="blue">
                                <span>
                                    Get started <span className="hidden lg:inline">today</span>
                                </span>
                            </Button>
                        </Link> */}

                    <div></div>
                    {/* {!isWatchPage &&
                        <Button href={isSessionData ? "/watch" : "/api/auth/signin?callbackUrl=http://localhost:3000/watch"} color="blue" className="">
                            <span>
                                Try for free <span className="hidden lg:inline">today</span>
                            </span>
                        </Button>
                    } */}


                    <div className="-mr-1 md:hidden">
                        <MobileNavigation />
                    </div>


                </div>
            </nav>

        </>

    )
}

export default function Header() {
    const { data: sessionData, status } = useSession();

    const isSessionData = (status === 'authenticated' && sessionData) ? true : false;

    const userId = sessionData?.user?.id;

    const userImage = sessionData?.user?.image




    const rounter = useRouter();
    const { pathname } = rounter;
    const isWatchPage = pathname === '/watch';

    return (
        <header className={`${isSessionData ? "py-2 bg-background_primary border-b border-b-black/5" : "py-10"}`}>
            <Container className='  '>
                {!isSessionData ? <AuthlessHeader /> :
                    <AuthHeader isSessionData={isSessionData} userId={userId} userImage={userImage} />}
            </Container>
        </header>
    )
}
