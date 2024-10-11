import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const ManageCards: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded yet.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('[error]', error);
                setError(error.message || 'An error occurred while processing your card.');
            } else {
                console.log('[PaymentMethod]', paymentMethod);
                setError(null); // Clear any previous error
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mt-16 p-6 bg-white rounded-3xl shadow-md max-w-xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Add Credit Card</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 border rounded-md bg-gray-50">
                        <CardElement className="p-2" />
                    </div>
                    
                    {/* Error Display */}
                    {error && (
                        <div className="text-red-600 text-sm mt-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white rounded bg-indigo-600 hover:bg-indigo-700 transition duration-300`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageCards;
