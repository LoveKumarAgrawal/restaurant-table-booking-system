const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Sample data for available time slots
const allSlots = ["12:00", "14:00", "16:00", "18:00", "20:00"]; // Example slots

// In-memory bookings storage
let bookings = [];

app.get('/', (req, res) => {
    res.json("hello")
})

/**
 * Endpoint: Get available time slots for a specific date
 * Method: GET
 * Query Params: date
 */
app.get("/api/availability", (req, res) => {
  const { date } = req.query;

  if (!date || typeof date !== "string") {
    res.status(400).json({ message: "Date is required" });
    return;
  }

  // Find booked slots for the given date
  const bookedSlots = bookings
    .filter((booking) => booking.date === date)
    .map((booking) => booking.time);

  // Calculate available slots
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  res.json(availableSlots);
});

/**
 * Endpoint: Create a new booking
 * Method: POST
 * Body: { date, time, guests, name, contact }
 */
app.post("/api/bookings", (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  // Validate fields
  if (!date || !time || !guests || !name || !contact) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Prevent double booking for the same slot
  const isAlreadyBooked = bookings.some(
    (booking) => booking.date === date && booking.time === time
  );
  if (isAlreadyBooked) {
    res.status(400).json({ message: "Time slot already booked" });
    return;
  }

  // Create a new booking
  const newBooking = {
    id: `${bookings.length + 1}`,
    date,
    time,
    guests,
    name,
    contact,
  };
  bookings.push(newBooking);

  res.status(201).json({ message: "Booking created successfully", booking: newBooking });
});


/**
 * Endpoint: Return all the bookings made by the user
 * Method: GET
 */
app.get('/api/bookings', (req, res) => {
  res.json({bookings})
})


/**
 * Endpoint: Delete a booking
 * Method: DELETE
 * Params: id (booking id to be deleted)
 */
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;

  // Find the index of the booking with the given id
  const bookingIndex = bookings.findIndex((booking) => booking.id === id);

  if (bookingIndex === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Remove the booking from the array
  bookings.splice(bookingIndex, 1);

  res.status(200).json({ message: "Booking deleted successfully" });
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
