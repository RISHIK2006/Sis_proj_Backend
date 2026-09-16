"use client";

import {
  MapPin,
  ArrowRight,
  Calendar,
  Clock,
  Car,
  Bike,
  Bus,
  Users,
  Star,
} from "lucide-react";

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function RideCard({
  rideId,
  driver,
  pickup,
  destination,
  date,
  time,
  departureTime,
  seats,
  vehicle,
  fare,
  rating,
  aiMatch,
  onBook,
  booking,
}) {
  const vehicleLabel = (vehicle || "Car").toString();
  const VehicleIcon =
    vehicleLabel.toLowerCase() === "car"
      ? Car
      : vehicleLabel.toLowerCase() === "bike"
        ? Bike
        : vehicleLabel.toLowerCase() === "scooter"
          ? Bike
          : vehicleLabel.toLowerCase() === "bus"
            ? Bus
            : Car;

  const displayDate = departureTime ? formatDate(departureTime) : date;
  const displayTime = departureTime ? formatTime(departureTime) : time;

  return (
    <div className="ride-card card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h4 className="fw-bold mb-1">{driver}</h4>
            <div className="d-flex align-items-center text-warning">
              <Star size={18} fill="currentColor" />
              <span className="ms-2 fw-semibold">{rating ?? 0} Rating</span>
            </div>
          </div>

          {aiMatch != null ? (
            <span className="badge bg-success px-3 py-2 fs-6 rounded-pill">
              {aiMatch}% Match
            </span>
          ) : null}
        </div>

        <hr className="my-4" />

        <div className="route-section d-flex align-items-center justify-content-center mb-4">
          <div className="text-center">
            <MapPin size={22} className="text-primary mb-2" />
            <h6 className="fw-bold mb-0">{pickup}</h6>
            <small className="text-muted">Pickup</small>
          </div>

          <ArrowRight size={34} className="mx-5 text-primary" />

          <div className="text-center">
            <MapPin size={22} className="text-danger mb-2" />
            <h6 className="fw-bold mb-0">{destination}</h6>
            <small className="text-muted">Destination</small>
          </div>
        </div>

        <div className="row text-center gy-3">
          <div className="col-md-3">
            <Calendar className="text-primary mb-2" size={22} />
            <div className="fw-semibold">{displayDate}</div>
          </div>

          <div className="col-md-3">
            <Clock className="text-warning mb-2" size={22} />
            <div className="fw-semibold">{displayTime}</div>
          </div>

          <div className="col-md-3">
            <VehicleIcon className="text-success mb-2" size={22} />
            <div className="fw-semibold">{vehicleLabel}</div>
          </div>

          <div className="col-md-3">
            <Users className="text-info mb-2" size={22} />
            <div className="fw-semibold">{seats} Seats</div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="text-success fw-bold mb-0">₹{fare}</h3>
            <small className="text-muted">per person</small>
          </div>

          <button
            className="btn btn-primary rounded-pill px-4 py-2"
            onClick={() => onBook?.(rideId)}
            disabled={booking}
          >
            {booking ? "Booking..." : "Book Ride →"}
          </button>
        </div>
      </div>
    </div>
  );
}
