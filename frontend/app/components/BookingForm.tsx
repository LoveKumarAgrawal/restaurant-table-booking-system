"use client"
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const bookingSchema = z.object({
  date: z.string().nonempty('Date is required'),
  time: z.string().nonempty('Time is required'),
  guests: z.number().min(1, 'At least one guest is required'),
  name: z.string().nonempty('Name is required'),
  contact: z.string().nonempty('Contact is required').email('Invalid email format'),
});

type BookingFormInputs = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormInputs>({
    resolver: zodResolver(bookingSchema),
  });

  const handleDateSubmit = async () => {
    const date = watch('date');
    if (date) {
      const response = await fetch(`http://localhost:5000/api/availability?date=${date}`);
      const data = await response.json();
      setAvailableSlots(data);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowBookingDetails(true);
  };

  const onSubmit = async (data: BookingFormInputs) => {
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, time: selectedTime }),
    });

    if (response.ok) {
      alert('Booking created successfully');
      setAvailableSlots([]);
      setSelectedTime(null);
      setShowBookingDetails(false);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-8">
      <h2 className="text-4xl font-semibold text-center text-gray-800">Book a Table</h2>
      
      {/* Date and Time Selection Form */}
      <form className="space-y-8">
        <div className="space-y-3">
          <label className="block text-xl font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date')}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <button 
          type="button" 
          onClick={handleDateSubmit} 
          className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Get Available Slots
        </button>

        {/* Available Slots */}
        {availableSlots.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-8">Available Time Slots:</h3>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              {availableSlots.map((slot) => (
                <button 
                  key={slot}
                  type="button" 
                  onClick={() => handleTimeSelect(slot)} 
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 border-2 
                    ${selectedTime === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 border-gray-300 hover:bg-blue-100' } 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800">Enter Your Details</h3>

          <input type="hidden" {...register('time')} value={selectedTime || ''} />
          
          <div className="space-y-3">
            <label className="block text-xl font-medium text-gray-700">Number of Guests</label>
            <input
              type="number"
              {...register('guests', { valueAsNumber: true })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.guests && <p className="text-red-500 text-sm">{errors.guests.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-xl font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-xl font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              {...register('contact')}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
