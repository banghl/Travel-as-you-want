import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState,useEffect  } from 'react';

function CheckoutForm({ amount, tripDetails }) {
  const elements = useElements();
  const stripe = useStripe();
  const [showTripCompletionModal, setShowTripCompletionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showTripCompletionModal) {
    }
  }, [showTripCompletionModal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!elements) {
      return;
    }
    setIsLoading(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsLoading(false);
      return;
    }
    const res = await fetch('/api/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount: amount }),
    });
    const secretKey = await res.json();
    const { error, paymentIntent } = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/',
      },
    });
    setIsLoading(false);
    if (error) {
      console.error(error);
    } else {
      setShowTripCompletionModal(paymentIntent.status === 'succeeded');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full mt-6'>
      <h2 className='m-5 font-bold text-lg'>Amount to Pay: ${amount}</h2>
      <form onSubmit={handleSubmit} className='max-w-xl w-full p-10 bg-white rounded-xl shadow-xl'>
        <PaymentElement className='mt-6' />
        <button className='w-full bg-indigo-600 text-white p-3 rounded-lg mt-6 text-lg' disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {showTripCompletionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Trip Completed!</h2>
            <p>Thank you for your payment. Here are your trip details:</p>
            <ul>
              <li>Destination: {tripDetails.destination}</li>
              <li>Date: {tripDetails.date}</li>
              <li>Time: {tripDetails.time}</li>
              <li>Total Amount: ${tripDetails.totalAmount}</li>
            </ul>
            <button onClick={() => window.location.href = '/'} className="mt-6 bg-indigo-600 text-white p-3 rounded-lg">
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
