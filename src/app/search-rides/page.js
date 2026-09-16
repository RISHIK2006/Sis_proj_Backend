"use client";

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import SearchForm from "../../components/SearchForm";
import RideCard from "../../components/RideCard";
import { apiFetch, requireUser } from "../../lib/api";

export default function SearchRidePage() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(form) {
    setError("");
    setInfo("");
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (form.pickup) params.set("source", form.pickup);
      if (form.destination) params.set("destination", form.destination);
      if (form.date) params.set("date", form.date);

      let results = await apiFetch(`/rides/search?${params.toString()}`);

      if (form.vehicleType && form.vehicleType !== "All") {
        results = results.filter(
          (r) =>
            (r.vehicleType || "").toUpperCase() ===
            form.vehicleType.toUpperCase()
        );
      }
      if (form.seats) {
        const seatsNeeded = Number(form.seats);
        results = results.filter((r) => r.seatsAvailable >= seatsNeeded);
      }

      setRides(results);
      if (!results.length) {
        setInfo("No rides found for that search.");
      }
    } catch (err) {
      setRides([]);
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleBook(rideId) {
    const user = requireUser();
    if (!user) return;

    setError("");
    setInfo("");
    setBookingId(rideId);
    try {
      const result = await apiFetch(`/rides/${rideId}/book`, {
        method: "POST",
        body: JSON.stringify({
          passengerId: user.userId,
          seatsRequested: 1,
          pickupPoint: "Main Gate",
        }),
      });
      setInfo(result.message || "Ride booked successfully");
      setRides((prev) =>
        prev
          .map((ride) =>
            ride.rideId === rideId
              ? { ...ride, seatsAvailable: ride.seatsAvailable - 1 }
              : ride
          )
          .filter((ride) => ride.seatsAvailable > 0)
      );
    } catch (err) {
      setError(err.message || "Booking failed");
    } finally {
      setBookingId(null);
    }
  }

  return (
    <DashboardLayout
      title="Search Ride"
      subtitle="Find rides that match your destination."
    >
      <SearchForm onSearch={handleSearch} loading={loading} />

      {error ? <div className="alert alert-danger">{error}</div> : null}
      {info ? <div className="alert alert-success">{info}</div> : null}

      <h3 className="fw-bold mb-4">Available Rides</h3>

      {!searched ? (
        <p className="text-muted">Search to see available rides.</p>
      ) : null}

      {rides.map((ride) => (
        <RideCard
          key={ride.rideId}
          rideId={ride.rideId}
          driver={ride.driverName}
          pickup={ride.source}
          destination={ride.destination}
          departureTime={ride.departureTime}
          seats={ride.seatsAvailable}
          vehicle={ride.vehicleType}
          fare={ride.farePerSeat}
          rating={ride.driverRating}
          onBook={handleBook}
          booking={bookingId === ride.rideId}
        />
      ))}
    </DashboardLayout>
  );
}
