"use client";

import { useState } from "react";

export default function SearchForm({ onSearch, loading }) {
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    vehicleType: "All",
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.(form);
  }

  return (
    <div className="card shadow border-0 rounded-4 mb-4">
      <div className="card-body p-4">
        <h3 className="fw-bold mb-4">🔍 Search Ride</h3>

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
            <label className="form-label fw-semibold">Date</label>
            <input
              type="date"
              className="form-control"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Time</label>
            <input
              type="time"
              className="form-control"
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Seats Required</label>
            <input
              type="number"
              className="form-control"
              min="1"
              placeholder="Seats"
              value={form.seats}
              onChange={(e) => updateField("seats", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Vehicle Type</label>
            <select
              className="form-select"
              value={form.vehicleType}
              onChange={(e) => updateField("vehicleType", e.target.value)}
            >
              <option>All</option>
              <option>Car</option>
              <option>Bike</option>
              <option>Scooter</option>
            </select>
          </div>

          <div className="col-12 text-end mt-3">
            <button className="btn btn-primary px-4" type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search Ride"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
