"use client"


import { useEffect, useState } from 'react';
import type { StripeError } from "@stripe/stripe-js";
import { useCart } from '../app/context/CartContext';
import * as React from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
    Elements,
} from "@stripe/react-stripe-js";

import getStripe from "@/utils/get-stripejs";
import { createPaymentIntent } from "@/actions/stripe";  

interface PersonalInfo {
    address: string;
    email: string;
    fname: string;
    lname: string;
    phone: string; 
}

// Define the interface for the CheckoutForm props
interface CheckoutFormProps {
    personal: PersonalInfo;
}




function CheckoutForm({ personal, cart, finalTotal, finalTotalUSD, code, rate, cur }: { personal: PersonalInfo; cart: any[]; finalTotal: any; finalTotalUSD: any; code: any; rate: any; cur: any }): JSX.Element {  

    const [paymentType, setPaymentType] = React.useState<string>("");
    const [payment, setPayment] = React.useState<{
        status: "initial" | "processing" | "error";
    }>({ status: "initial" });
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const stripe = useStripe();
    const elements = useElements(); 



    const PaymentStatus = ({ status }: { status: string }) => {
        switch (status) {
            case "processing":
            case "requires_payment_method":
            case "requires_confirmation":
                return <h2>Processing...</h2>;

            case "requires_action":
                return <h2>Authenticating...</h2>;

            case "succeeded":
                return <h6 className='myGray1'>Payment Succeeded! </h6>;

            case "error":
                return (
                    <> 
                        <p style={{color:"red"}} className="error-message">{errorMessage}</p>
                    </>
                );

            default:
                return null;
        }
    };





    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        try {
            e.preventDefault();
            // Abort if form isn't valid
            if (!e.currentTarget.reportValidity()) return;
            if (!elements || !stripe) return;

            const requiredFields: (keyof PersonalInfo)[] = ['fname', 'lname', 'phone', 'address'];
            const missingFields = requiredFields.filter(field => !personal[field] || (personal[field] as string).trim() === '');

            if (missingFields.length > 0) { 
                setPayment({ status: "error" });
                setErrorMessage('Please complete all required fields.');
                return;
            }


            setPayment({ status: "processing" });

            const { error: submitError } = await elements.submit();

            if (submitError) {
                setPayment({ status: "error" });
                setErrorMessage(submitError.message ?? "An unknown error occurred");

                return;
            }

            // const couponResponse = await fetch('api/sendOrder', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },

            //     body: JSON.stringify({
            //         cart,
            //         personal, 

            //     })
            // })























    const createOrder = async () => {
        try {
             
            for (const item of cart) {
                if (item.pre) continue;
                const quantityToDecrease = parseInt(item.quantity, 10); // Convert quantity to integer
    
                const response = await fetch(`/api/stock/${item._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ qty: quantityToDecrease }),
                });
    
                const result = await response.json();
    
                if (!response.ok) {
                    throw new Error(result.error || "Failed to update stock");
                }
            }
    
            // Step 2: If stock update is successful, create the order
            const orderResponse = await fetch("/api/sendOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cart,
                    inputs: personal,
                    total: finalTotal,
                    delivery: 4+"",
                    code,
                    rate,
                    cur,

                }),
            });
    
            if (!orderResponse.ok) {
                throw new Error("Failed to create order");
            }
    
            console.log("Order created successfully!");
            alert("Order placed successfully!");
    
        } catch (error:any) {
            console.error("Error processing order:", error);
            alert(error.message || "Something went wrong");
        }
    };

createOrder();
























            // Create a PaymentIntent with the specified amount.
            const { client_secret: clientSecret } = await createPaymentIntent(
                // new FormData(e.target as HTMLFormElement),
                finalTotalUSD
            );

            // Use your card Element with other Stripe.js APIs
            const { error: confirmError } = await stripe!.confirmPayment({
                elements,
                clientSecret,
                confirmParams: { 
                    return_url: "http://localhost:3000/done",
                    payment_method_data: {
                        billing_details: {
                            name: "Customer",
                        },
                    },
                },
            });

            if (confirmError) {
                setPayment({ status: "error" });
                setErrorMessage(confirmError.message ?? "An unknown error occurred");
            }
        } catch (err) {
            const { message } = err as StripeError;

            setPayment({ status: "error" });
            setErrorMessage(message ?? "An unknown error occurred");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>

                <fieldset className="elements-style">
                    <legend>Your payment details:</legend>

                    <div className="FormRow elements-style">
                        <PaymentElement
                            onChange={(e) => {
                                setPaymentType(e.value.type);
                            }}
                        />
                    </div>
                </fieldset>
                <button
                    className='w-full p-3 mt-4 text-white rounded-md'
                    style={{ background: "#ef0f87" }}
                    type="submit"
                    disabled={
                        !["initial", "succeeded", "error"].includes(payment.status) ||
                        !stripe
                    }
                >
                    PAY NOW!
                </button>
            </form> 
            <PaymentStatus status={payment.status} />
        </>
    );
}

export default function ElementsForm({ personal, finalTotal, finalTotalUSD, code, rate, cur }: {personal: any; finalTotal: any; finalTotalUSD: any; code: any; rate: any; cur: any}): JSX.Element {
    // function CheckoutForm({ personal, cart, finalTotal }: { personal: PersonalInfo; cart: any[]; finalTotal: any }): JSX.Element {

    const { cart } = useCart(); 



    useEffect(() => {
        console.log("personal:", personal);
        console.log("item:", cart);
    }, [personal, cart]);

    return (
        <Elements
            stripe={getStripe()}
            options={{
                appearance: {
                    variables: {
                        colorIcon: "#6772e5",
                        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                    },
                },
                currency: "usd",
                mode: "payment",
                amount: finalTotalUSD * 100
            }}
        >
            <CheckoutForm personal={personal} cart={cart} finalTotal={finalTotal} finalTotalUSD={finalTotalUSD} code={code} rate={rate} cur={cur} />
        </Elements>
        
    );
}