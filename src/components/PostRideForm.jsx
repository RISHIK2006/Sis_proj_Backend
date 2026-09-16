"use client";

import { useEffect, useState } from "react";
import { apiFetch, requireUser } from "../lib/api";

export default function PostRideForm() {
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    travelDate: "",
    departureTime: "",
    availableSeats: "",
    vehicleType: "Car",
    acAvailable: "Yes",
    farePerSeat: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requireUser();
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const user = requireUser();
    if (!user) return;

    if (!form.vehicleType || form.vehicleType === "Select Vehicle") {
      setError("Please select a vehicle type");
      return;
    }

    setLoading(true);
    try {
      const departureTime = `${form.travelDate}T${form.departureTime}:00`;
      await apiFetch("/rides", {
        method: "POST",
        body: JSON.stringify({
          driverId: user.userId,
          source: form.pickup,
          destination: form.destination,
          departureTime,
          totalSeats: Number(form.availableSeats),
          farePerSeat: Number(form.farePerSeat),
          vehicleType: form.vehicleType.toUpperCase(),
          acAvailable: form.acAvailable === "Yes",
          additionalNotes: form.notes,
        }),
      });
      setMessage("Ride posted successfully!");
      setForm({
        pickup: "",
        destination: "",
        travelDate: "",
        departureTime: "",
        availableSeats: "",
        vehicleType: "Car",
        acAvailable: "Yes",
        farePerSeat: "",
        notes: "",
      });
    } catch (err) {
      setError(err.message || "Failed to post ride");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card shadow border-0 rounded-4 mb-4">
      <div className="card-body p-4">
        <h3 className="fw-bold mb-4">➕ Post a Ride</h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Pickup Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter pickup location"
              value={form.pickup}
              onChange={(e) => updateField("pickup", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Destination</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter destination"
              value={form.destination}
              onChange={(e) => updateField("destination", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Travel Date</label>
            <input
              type="date"
              className="form-control"
              value={form.travelDate}
              onChange={(e) => updateField("travelDate", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Departure Time</label>
            <input
              type="time"
              className="form-control"
              value={form.departureTime}
              onChange={(e) => updateField("departureTime", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Available Seats</label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="6"
              placeholder="Seats"
              value={form.availableSeats}
              onChange={(e) => updateField("availableSeats", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Vehicle Type</label>
            <select
              className="form-select"
              value={form.vehicleType}
              onChange={(e) => updateField("vehicleType", e.target.value)}
              required
            >
              <option>Car</option>
              <option>Bike</option>
              <option>Scooter</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">AC Available</label>
            <select
              className="form-select"
              value={form.acAvailable}
              onChange={(e) => updateField("acAvailable", e.target.value)}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Fare per Seat (₹)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter fare"
              value={form.farePerSeat}
              onChange={(e) => updateField("farePerSeat", e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Additional Notes</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Any special instructions..."
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            ></textarea>
          </div>

          {error ? <div className="col-12 alert alert-danger py-2 mb-0">{error}</div> : null}
          {message ? <div className="col-12 alert alert-success py-2 mb-0">{message}</div> : null}

          <div className="col-12 text-end mt-3">
            <button className="btn btn-success px-4" type="submit" disabled={loading}>
              {loading ? "Posting..." : "🚀 Post Ride"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
