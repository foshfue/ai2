import React from 'react'
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';

export const UpgradeButton = ({ userPackage, condition }: { userPackage: string, condition: boolean }) => {
    const { mutateAsync: createCheckoutSession } =
        trpc.stripe.createCheckoutSession.useMutation();
    const { push } = useRouter();
    return (
        <button
            className={`
          ${condition
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}
            mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium`
            }  // className="w-fit cursor-pointer rounded-md bg-blue-500 px-5 py-2 text-lg font-semibold text-white shadow-sm duration-150 hover:bg-blue-600"

            onClick={async () => {
                const { checkoutUrl } = await createCheckoutSession({ userPackage: userPackage });
                if (checkoutUrl) {
                    push(checkoutUrl);
                }
            }}
        >
            Upgrade account
        </button>
    );
};