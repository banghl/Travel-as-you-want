import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

function CheckoutForm({ amount }) {
  const elements = useElements();
  const stripe = useStripe();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!elements) {
      return;
    }

    setIsLoading(true); // Show loading indicator

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsLoading(false); // Hide loading indicator
      return;
    }

    const res = await fetch('/api/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount: amount }),
    });
    const secretKey = await res.json();

    const { error } = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/',
      },
    });

    setIsLoading(false); // Hide loading indicator

    if (error) {
      console.error(error);
    } else {
      // Ensure modal is shown upon successful payment
      setShowConfirmationModal(true);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full mt-6'>
      <h2 className='m-5 font-bold text-lg'>Amount to Pay: ${amount}</h2>
      <form onSubmit={handleSubmit} className='max-w-xl w-full p-10 bg-white rounded-xl shadow-xl'>
        <PaymentElement className='mt-6' />
        <button className='w-full bg-indigo-600 text-white p-3 rounded-lg mt-6 text-lg'>Pay</button>
      </form>
      {/* Loading indicator */}
      {isLoading && <div className="mt-4">Processing payment...</div>}
      {/* Confirmation modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Payment Successful!</h2>
            <p>Thank you for your payment.</p>
            <button onClick={() => setShowConfirmationModal(false)} className="mt-6 bg-indigo-600 text-white p-3 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;