"use client";

import React from "react";
import { PaymentIntent } from "@/types/payment";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { usePaymentIntent } from "@/hooks/usePayment";

function ChargeButton() {
  const stripe = useStripe();
  const elements = useElements();

  const dummy: PaymentIntent = {
    amount: 500,
  };
  const { paymentIntent } = usePaymentIntent(dummy);

  const handleClick = () => {
    (async () => {
      console.log("stripe", stripe);
      console.log("elements", elements);
      if (!stripe || !elements) return null;
    })();
  };

  return (
    <div>
      <button onClick={handleClick}>button</button>
    </div>
  );
}
export default ChargeButton;
