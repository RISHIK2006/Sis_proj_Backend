"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getStoredUser } from "../lib/api";

export default function RecommendationCard() {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (!user?.userId) {
      setError("Login to see personalized recommendations.");
      return;
    }

    async function load() {
      try {
        const data = await apiFetch(`/rides/recommend?userId=${user.userId}`);
        setItem(data?.[0] || null);
      } catch (err) {
        setError(err.message || "Could not load recommendations");
      }
    }

    load();
  }, []);

  async function handleBook() {
    const user = getStoredUser();
    if (!user?.userId || !item) {
      router.push("/login");
      return;
    }
    setBooking(true);
    setError("");
    try {
      await apiFetch(`/rides/${item.rideId}/book`, {
        method: "POST",
        body: JSON.stringify({
          passengerId: user.userId,
          seatsRequested: 1,
          pickupPoint: "Main Gate",
        }),
      });
      router.push("/booking-history");
    } catch (err) {
      setError(err.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  }

  if (error && !item) {
    return (
      <div className="recommendation-card">
        <p className="mb-0 text-muted">{error}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="recommendation-card">
        <p className="mb-0 text-muted">No recommendations yet. Post or search rides to get started.</p>
      </div>
    );
  }

  return (
    <div className="recommendation-card">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="badge bg-success mb-2">⭐ AI Recommended</span>
          <h4>
            {item.source} → {item.destination}
          </h4>
          <p className="mb-1">
            <strong>Driver:</strong> {item.driverName}
          </p>
          <p className="mb-1">
            <strong>Vehicle:</strong> {item.vehicleType}
          </p>
          <p className="mb-1">
            <strong>Seats:</strong> {item.availableSeats} Available
          </p>
          <p className="mb-0">
            <strong>Fare:</strong> ₹{item.fare}
          </p>
          <small className="text-muted">{item.reason}</small>
        </div>

        <div className="text-end">
          <h2 className="text-primary">{item.score}%</h2>
          <small className="text-muted">Route Match</small>
          <br />
          <button
            className="btn btn-primary mt-3"
            onClick={handleBook}
            disabled={booking}
          >
            {booking ? "Booking..." : "Book Ride"}
          </button>
        </div>
      </div>
      {error ? <div className="alert alert-danger mt-3 py-2 mb-0">{error}</div> : null}
    </div>
  );
}
