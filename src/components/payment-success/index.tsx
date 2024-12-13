import { CheckCircleIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
  
    useEffect(() => {
      const webhookData = Object.fromEntries(searchParams.entries());
      if (webhookData) {
        // Handle webhook data here
        console.log(webhookData);
      }
    }, [searchParams]);
    
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
    <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg">
      <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Success!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your purchase has been completed successfully.
      </p>
      <p className="text-sm text-gray-500">
        We’ve sent a confirmation email to your inbox.
      </p>
      <Button
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out"
        onClick={() => {
       router.push("/"); 
        }}
      >
        Return to Home
      </Button>
    </div>
  </div>  )
}

export default PaymentSuccess