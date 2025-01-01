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
      console.log(response)
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
      // Reset states
      setAvailableSlots([]);
      setSelectedTime(null);
      setShowBookingDetails(false);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
      
      {/* Date and Time Selection Form */}
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            {...register('date')}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        <button 
          type="button" 
          onClick={handleDateSubmit} 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Available Slots
        </button>

        {availableSlots.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-4">Available Time Slots:</h3>
            <ul className="space-y-2">
              {availableSlots.map((slot) => (
                <li key={slot} className="flex items-center">
                  <button 
                    type="button" 
                    onClick={() => handleTimeSelect(slot)} 
                    className="w-full text-left p-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    {slot}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* Guest Details Form */}
      {showBookingDetails && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold">Enter Your Details</h3>

          <input type="hidden" {...register('time')} value={selectedTime || ''} />
          
          <div>
            <label className="block mb-1">Number of Guests</label>
            <input
              type="number"
              {...register('guests', { valueAsNumber: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.guests && <p className="text-red-500">{errors.guests.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Contact Email</label>
            <input
              type="email"
              {...register('contact')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
