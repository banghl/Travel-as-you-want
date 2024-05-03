"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './../../components/Home/CheckoutForm'

function Payment() {
  const searchParam = useSearchParams();
  const amount = searchParam.get('amount');
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY)
  
  const options = {
    mode: 'payment',
    amount: Math.round(amount * 100),
    currency: 'aud'
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  )
}

export default Payment;
