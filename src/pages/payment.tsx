import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51I2jEIJm3OnU4JsVSVV37DAc85VDNjvVRtaUlScDB3pTF0rPvIKi3uz48GFQejxSlLO8miZnMiTLxaoX4kX4yIJ200sEnOlMF9');

export default function Payment() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{sk_test_51I2jEIJm3OnU4JsVDggSZxzvCOalfvLioDr9mbvm5RQAVEYtZh4ojLogxX6SPb1hkOfg3NRbov3NnVMR3XVRXKVF000WahGEY6}}',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <h1>payment page</h1>
            <CheckoutForm />
        </Elements>
    );
};

Payment.Layout = Payment;


const CheckoutForm = () => {
    return (
        <form>
            <PaymentElement />
            <button>Submit</button>
        </form>
    );
};
