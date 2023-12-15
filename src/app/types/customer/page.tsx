"use client"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSetupIntent } from "@/hooks/usePayment";
import CustomerCard from "./components/CustomerCard";

function page() {
  const { setupIntent } = useSetupIntent();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  if (!setupIntent || !setupIntent.clientSecret) return <p>loading</p>;
  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: {
          theme: "stripe",
        },
        clientSecret: setupIntent.clientSecret,
      }}
    >
      <CustomerCard />
    </Elements>
  );
}

export default page;
