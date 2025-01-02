"use client"
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const bookingSchema = z.object({
  date: z.string().nonempty('Date is required'),
  time: z.string().nonempty('Time is required'),
  guests: z.number().min(1, 'At least one guest is required'),
  name: z.string().nonempty('Name is required'),
  contact: z.string().nonempty('Contact is required').email('Invalid email format'),
});

type BookingFormInputs = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const router = useRouter();

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormInputs>({
    resolver: zodResolver(bookingSchema),
  });

  const handleDateSubmit = async () => {
    const date = watch('date');
    if (date) {
      const response = await fetch(`https://restaurant-table-booking-system-backend-14j1.vercel.app/api/availability?date=${date}`);
      const data = await response.json();
      setAvailableSlots(data);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowBookingDetails(true);
  };

  const onSubmit = async (data: BookingFormInputs) => {
    const response = await fetch('https://restaurant-table-booking-system-backend-14j1.vercel.app/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, time: selectedTime }),
    });
  
    if (response.ok) {
      const bookingData = await response.json();

      const confirmationUrl = `/confirmation?date=${encodeURIComponent(bookingData.booking.date)}&time=${encodeURIComponent(bookingData.booking.time)}&guests=${encodeURIComponent(bookingData.booking.guests)}&name=${encodeURIComponent(bookingData.booking.name)}&contact=${encodeURIComponent(bookingData.booking.contact)}`;

      router.push(confirmationUrl);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg space-y-8">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Book a Table</h2>
      
      {/* Date and Time Selection Form */}
      <form className="space-y-6">
        <div className="space-y-3">
          <label className="block text-lg font-medium text-gray-700">Select Date</label>
          <input
            type="date"
            {...register('date')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <button 
          type="button" 
          onClick={handleDateSubmit} 
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Get Available Slots
        </button>

        {/* Available Slots */}
        {availableSlots.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Available Time Slots:</h3>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {availableSlots.map((slot) => (
                <button 
                  key={slot}
                  type="button" 
                  onClick={() => handleTimeSelect(slot)} 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 border-2 
                    ${selectedTime === slot ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300 hover:bg-blue-100' } 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Guest Details Form */}
      {showBookingDetails && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Enter Your Details</h3>

          <input type="hidden" {...register('time')} value={selectedTime || ''} />
          
          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">Number of Guests</label>
            <input
              type="number"
              {...register('guests', { valueAsNumber: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.guests && <p className="text-red-500 text-sm">{errors.guests.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              {...register('contact')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
