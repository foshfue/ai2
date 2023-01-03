import { getProviders, signIn } from "next-auth/react"
import Link from "next/link"
import { Logo } from "../../components/Logo"
import { AuthLayout } from "../../components/AuthLayout"
import Head from 'next/head'
import Image from "next/image"

import discordLogo from './../../images/logos/discordLogo.png'
import googleLogo from './../../images/logos/googleLogo.png'
import backgroundImage from './../../images/background-auth.jpg'




export default function Signup({ providers }) {
    console.log(Object.values(providers)[0])

    return (
        // <>
        //   
        // </>

        <>
            <Head>
                <title>Sign In - TaxPal</title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col min-h-screen">
                    <Link href="/" aria-label="Home">
                        <Logo className="h-10 w-auto" />
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Don’t have an account?{' '}
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Sign up
                            </Link>{' '}
                            for a free trial.
                        </p>
                    </div>
                    <div>
                        {/* <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={backgroundImage}
                            alt=""

                        /> */}
                        <div className="my-6">
                            <button onClick={() => signUp(Object.values(providers)[0].google)} className="flex w-full justify-center rounded-3xl border-none items-center bg-white p-1 text-black hover:bg-gray-200 sm:p-2">
                                <Image src={googleLogo} width={24} height={24} alt="hello" className="mr-2 w-6 object-fill" />Sign in with Google</button>
                        </div>
                        <div className="my-6">
                            <button onClick={() => Signup(Object.values(providers)[1].discord)} className="flex w-full justify-center rounded-3xl border-none items-center bg-white p-1 text-black hover:bg-gray-200 sm:p-2">
                                <Image src={discordLogo} width={24} height={24} alt="hello" className="mr-2 w-6 object-fill" />Sign in with Discord</button>
                        </div>
                        {/* <div>{Object.values(providers).[0].name}</div> */}

                        {/* {Object.values(providers).map((provider) => {
                            console.log("provider", provider)
                            return (
                                <div key={provider.name}>
                                    <button onClick={() => signIn(provider.id)}>
                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            )
                        }
                        )} */}
                    </div>
                </div>

                {/* <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
                    <TextField
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <TextField
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <div>
                        <Button
                            type="submit"
                            variant="solid"
                            color="blue"
                            className="w-full"
                        >
                            <span>
                                Sign in <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form> */}
            </AuthLayout>
        </>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}