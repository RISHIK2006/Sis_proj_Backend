"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BookingCard from "../../components/BookingCard";
import { apiFetch, requireUser } from "../../lib/api";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function toDisplayStatus(status, departureTime) {
  if (status === "ACCEPTED" || status === "PENDING") {
    if (departureTime && new Date(departureTime) < new Date()) {
      return "Completed";
    }
    return "Upcoming";
  }
  if (status === "CANCELLED" || status === "REJECTED") {
    return "Completed";
  }
  return status || "Upcoming";
}

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = requireUser();
    if (!user) return;

    async function load() {
      try {
        const data = await apiFetch(`/users/${user.userId}/bookings`);
        setBookings(data);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <DashboardLayout
      title="Booking History"
      subtitle="View your current and previous ride bookings."
    >
      <div className="mb-4">
        <h3 className="fw-bold">My Bookings</h3>
      </div>

      {loading ? <p className="text-muted">Loading bookings...</p> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {!loading && !error && bookings.length === 0 ? (
        <p className="text-muted">No bookings yet.</p>
      ) : null}

      {bookings.map((booking) => (
        <BookingCard
          key={booking.bookingId}
          driver={booking.driverName}
          route={`${booking.source} → ${booking.destination}`}
          date={formatDate(booking.departureTime)}
          time={formatTime(booking.departureTime)}
          fare={booking.fare}
          status={toDisplayStatus(booking.status, booking.departureTime)}
        />
      ))}
    </DashboardLayout>
  );
}
