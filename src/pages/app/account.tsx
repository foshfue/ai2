import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "../../components/Layout";
import { UpgradeButton } from "../../components/account/UpgradeButton";

const SignoutButton = () => {
    return (
        <button
            className="w-fit cursor-pointer rounded-md bg-red-500 px-5 py-2 text-lg font-semibold text-white shadow-sm duration-150 hover:bg-red-600"
            onClick={() => {
                signOut({ callbackUrl: "/" });
            }}
        >
            Sign out
        </button>
    );
};

// const UpgradeButton = ({ userPackage }: { userPackage: string }) => {
//     const { mutateAsync: createCheckoutSession } =
//         trpc.stripe.createCheckoutSession.useMutation();
//     const { push } = useRouter();
//     return (
//         <button
//             className="w-fit cursor-pointer rounded-md bg-blue-500 px-5 py-2 text-lg font-semibold text-white shadow-sm duration-150 hover:bg-blue-600"
//             onClick={async () => {
//                 const { checkoutUrl } = await createCheckoutSession({ userPackage: userPackage });
//                 if (checkoutUrl) {
//                     push(checkoutUrl);
//                 }
//             }}
//         >
//             Upgrade account
//         </button>
//     );
// };

const ManageBillingButton = () => {
    const { mutateAsync: createBillingPortalSession } =
        trpc.stripe.createBillingPortalSession.useMutation();
    const { push } = useRouter();
    return (
        <button
            className="w-fit cursor-pointer rounded-md bg-blue-500 px-5 py-2 text-lg font-semibold text-white shadow-sm duration-150 hover:bg-blue-600"
            onClick={async () => {
                const { billingPortalUrl } = await createBillingPortalSession();
                if (billingPortalUrl) {
                    push(billingPortalUrl);
                }
            }}
        >
            Manage subscription and billing
        </button>
    );
};

const Account: NextPage = () => {

    // stripeSubscriptionStatus: data.stripeSubscriptionStatus,
    // StripeSubscriptionPlan:
    const { data, isLoading } =
        trpc.user.subscriptionStatus.useQuery();

    const subscriptionStatus = data?.stripeSubscriptionStatus
    const subscriptionPlan = data?.stripeSubscriptionPlan


    console.log("subscriptionStatus", subscriptionStatus)

    return (
        <>

            {/* <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
                <h1 className="text-5xl font-extrabold leading-normal text-gray-700">
                    T3 <span className="text-[#5433FF]">Stripe</span> Dashboard
                </h1>
                <p className="text-2xl text-gray-700">Actions:</p>
                <div className="mt-3 flex flex-col items-center justify-center gap-4">
                    <SignoutButton />
                    {!isLoading && subscriptionStatus !== null && (
                        <>
                            <p className="text-xl text-gray-700">
                                Your subscription is {subscriptionStatus}.
                            </p>
                            <ManageBillingButton />
                        </>
                    )}
                    <div className="flex flex-col">


                        {!isLoading && (subscriptionStatus === null || subscriptionPlan === "basic") && (
                            <>
                                <p className="text-xl text-gray-700">Basic</p>
                                <UpgradeButton userPackage="basic" />
                            </>
                        )}
                        {!isLoading && (subscriptionStatus === null || subscriptionPlan !== "premium") && (
                            <>
                                <p className="text-xl text-gray-700">Premium</p>
                                <UpgradeButton userPackage="premium" />
                            </>
                        )}
                        {!isLoading && (subscriptionStatus === null || subscriptionPlan !== "pro") && (
                            <>
                                <p className="text-xl text-gray-700">Pro</p>
                                <UpgradeButton userPackage="pro" />
                            </>
                        )}
                    </div>
                </div>
            </main> */}
            <div className='px-10 sm:px-28 py-5 flex bg-background_primary w-full flex-col gap-4 '>

                <div>
                    <h3 className='text-3xl font-bold mt-12 mb-6'>Account</h3>
                </div>


                <div className=' w-full'>
                    <div className='flex flex-col items-start justify-center gap-4'>
                        {!isLoading && subscriptionStatus !== null && (
                            <>
                                <p className="text-xl text-gray-700">
                                    Your subscription is {subscriptionPlan}.
                                </p>
                                <ManageBillingButton />
                            </>
                        )}

                    </div>
                </div>
                <SignoutButton />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

// @ts-expect-error:next-line
Account.Layout = Layout
export default Account;