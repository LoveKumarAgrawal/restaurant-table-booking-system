"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Bookings {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  contact: string;
}

const UserBookings = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "https://restaurant-table-booking-system-pi.vercel.app/api/bookings"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://restaurant-table-booking-system-pi.vercel.app/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      // Remove the deleted booking from the state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id)
      );
    } catch (err) {
      setError("Failed to delete booking");
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg space-y-8">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        Your Bookings
      </h2>

      {loading && <p className="text-gray-600 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {bookings.length === 0 && !loading && (
        <p className="text-gray-600 text-center">You have no bookings yet.</p>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
            <p className="text-gray-700">Date: {booking.date}</p>
            <p className="text-gray-700">Time: {booking.time}</p>
            <p className="text-gray-700">Guests: {booking.guests}</p>
            <p className="text-gray-700">Name: {booking.name}</p>
            <p className="text-gray-700">Contact: {booking.contact}</p>
            <button
              onClick={() => handleDelete(booking.id)}
              className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            >
              Delete Booking
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => router.push("/bookingform")}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Book a Table
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-full ml-4 bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default UserBookings;
