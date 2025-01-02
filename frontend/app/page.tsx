"use client"

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleBookTable = () => {
    router.push('/bookingform');
  };

  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Restaurant Table Booking System
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
            A seamless and modern way to book your next table. Manage bookings effortlessly and provide your guests with an outstanding dining experience.
          </p>
          <div className="mt-8 flex justify-center">
            {/* Book Table Button */}
            <button
              onClick={handleBookTable}  // Trigger router.push when clicked
              className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Book Table
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and intuitive booking process for your customers. No hassle, just seamless table reservations.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Real-Time Availability</h3>
              <p className="text-gray-600">
                Show available time slots in real-time to avoid overbooking and ensure smooth operations.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Customer Management</h3>
              <p className="text-gray-600">
                Keep track of all your bookings and customer details in one centralized dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-gray-800">How It Works</h2>
          <div className="flex flex-col sm:flex-row justify-around items-center space-y-8 sm:space-y-0 sm:space-x-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">1. Select Date & Time</h3>
              <p className="text-gray-600">
                Choose a convenient date and time to book your table. Our system shows available slots.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">2. Fill Your Details</h3>
              <p className="text-gray-600">
                Enter your name, contact, and number of guests to complete your booking.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">3. Confirmation</h3>
              <p className="text-gray-600">
                Receive instant confirmation and booking details directly on your email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-gray-800">What Our Customers Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Testimonial 1 */}
            <div className="w-full sm:w-1/3 p-6 bg-gray-50 shadow-lg rounded-lg">
              <p className="text-lg text-gray-600">
              &quot;Booking a table has never been easier! I loved the real-time availability, and the process was so fast.&quot;
              </p>
              <p className="mt-4 font-semibold text-gray-800">John Doe</p>
            </div>
            {/* Testimonial 2 */}
            <div className="w-full sm:w-1/3 p-6 bg-gray-50 shadow-lg rounded-lg">
              <p className="text-lg text-gray-600">
              &quot;As a restaurant owner, this system made managing reservations so much simpler. Highly recommended!&quot;
              </p>
              <p className="mt-4 font-semibold text-gray-800">Jane Smith</p>
            </div>
            {/* Testimonial 3 */}
            <div className="w-full sm:w-1/3 p-6 bg-gray-50 shadow-lg rounded-lg">
              <p className="text-lg text-gray-600">
              &quot;I was able to book a table for my family within seconds. So user-friendly and efficient!&quot;
              </p>
              <p className="mt-4 font-semibold text-gray-800">Mark Lee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">
            &copy; 2025 Restaurant Table Booking System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
