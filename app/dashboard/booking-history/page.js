"use client";
import { useEffect, useState } from "react";
import TableData from "../_components/TableData";
import bookingColumns from "./_components/BookingColumn";

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:5000/booking/all");
        const bookings = await response.json();
        setBookings(bookings);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchBookings();
  }, []);

  if (!bookings.length) {
    <p>bookings not found</p>;
  }
  const column = bookingColumns();
  return <TableData data={bookings} columns={column} />;
}
