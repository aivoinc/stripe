"use server";

import { PaymentIntent } from "@/types/payment";
import { stripe } from "../const/stripe";
import { TEST_USER } from "../const/testUser";
import { readFileSync } from "fs";

export const getSetupIntent = async () => {
  try {
    const { data } = await stripe.customers.search({
      query: `metadata["userId"]:"${TEST_USER.id}"`,
    });

    let customerId;

    if (data.length === 0) {
      const customer = await stripe.customers.create({
        name: TEST_USER.name as string,
        email: TEST_USER.email as string,
        metadata: {
          userId: TEST_USER.id as string,
        },
      });
      customerId = customer.id;
    } else {
      customerId = data[0].id;
    }

    const setupIntents = await stripe.setupIntents.create({
      customer: customerId,
    });

    return {
      clientSecret: setupIntents.client_secret as string,
    };
  } catch (e) {
    console.log(e);
    console.log("\n\n\n\n");
  }
};

export const createPaymentIntent = async ({ amount }: PaymentIntent) => {
  try {
    const { data } = await stripe.customers.search({
      query: `metadata["userId"]:"${TEST_USER.id}"`,
    });
    await stripe.paymentIntents.create({
      amount,
      currency: "jpy",
      customer: data[0].id,
    });
  } catch (e) {
    console.log(e);
  }
};

export const createAccount = async (props: any) => {
  try {
    const phone = "+81" + props.phone.slice(1)
    const front = await stripe.files.create({
      file: {
        data: readFileSync("public/images/common/dummy.jpg"),
        name: "test.jpg",
        type: "image/*",
      },
      purpose: "identity_document",
    });
    const back = await stripe.files.create({
      file: {
        data: readFileSync("public/images/common/logo.png"),
        name: "test.jpg",
        type: "image/*",
      },
      purpose: "identity_document",
    });
    await stripe.accounts.create(
      {
        type: "custom",
        country: "JP",
        business_type: "individual",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        metadata: {
          userId: "account1",
        },
        individual: {
          first_name_kana: props.firstNameKana,
          last_name_kana: props.lastNameKana,
          first_name_kanji: props.firstNameKanji,
          last_name_kanji: props.lastNameKanji,
          dob: { year: 2000, month: 1, day: 1 },
          address_kana: {
            line2: props.addrKanaLine2,
            line1: props.addrKanaLine1,
            postal_code: props.addrKanaZip,
            city: props.addrKanaCity,
            town: props.addrKanaCity,
            state: props.addrKanaState,
          },
          address_kanji: {
            line2: props.addrKanjiLine2,
            line1: props.addrKanjiLine1,
            postal_code: props.addrKanjiZip,
            city: props.addrKanjiCity,
            town: props.addrKanjiCity,
            state: props.addrKanjiState,
          },
          email: "account1@test.com",
          phone: phone,
          verification: {
            document: {
              front: front.id,
              back: back.id,
            },
          },
        },
        tos_acceptance:{date:Math.floor(Date.now()/1000),ip:"8.8.8.8"}
      },      
      /* {
        idempotencyKey: TEST_USER.id as string,
      } */
    );
  } catch (e) {
    console.log(e);
    console.log("\n\n\n\n");
  }
};

export const test = async () => {
  console.log("ok");
};
