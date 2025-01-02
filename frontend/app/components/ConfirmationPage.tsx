"use client"

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ConfirmationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleHomeRedirect = () => {
    router.push('/');
  };

  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const guests = searchParams.get('guests');
  const name = searchParams.get('name');
  const contact = searchParams.get('contact');

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center py-12 px-6 sm:px-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Booking Confirmed!</h2>
          <p className="mt-2 text-lg text-gray-600">Thank you for booking with us! We’ve received your reservation details:</p>
        </div>

        {/* Booking & Customer Details */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 text-center">Your Booking Details</h3>
          
          {/* Booking Information */}
          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Booking Date:</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Booking Time:</span>
              <span>{time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Number of Guests:</span>
              <span>{guests}</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Your Name:</span>
              <span>{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Your Email:</span>
              <span>{contact}</span>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="text-center mt-8">
          <p className="text-lg text-gray-700">We are excited to host you! Your booking has been successfully confirmed. See you soon!</p>
        </div>

        {/* Button to Home */}
        <div className="text-center mt-6">
          <button
            onClick={handleHomeRedirect}
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
