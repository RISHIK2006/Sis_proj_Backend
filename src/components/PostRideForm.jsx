"use client";

export default function PostRideForm() {
  return (
    <div className="card shadow border-0 rounded-4 mb-4">
      <div className="card-body p-4">

        <h3 className="fw-bold mb-4">
          ➕ Post a Ride
        </h3>

        <div className="row g-3">

          {/* Pickup */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Pickup Location
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter pickup location"
            />
          </div>

          {/* Destination */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Destination
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter destination"
            />
          </div>

          {/* Date */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Travel Date
            </label>
            <input
              type="date"
              className="form-control"
            />
          </div>

          {/* Time */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Departure Time
            </label>
            <input
              type="time"
              className="form-control"
            />
          </div>

          {/* Seats */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Available Seats
            </label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="6"
              placeholder="Seats"
            />
          </div>

          {/* Vehicle */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Vehicle Type
            </label>

            <select className="form-select">
              <option>Select Vehicle</option>
              <option>Car</option>
              <option>Bike</option>
              <option>Scooter</option>
            </select>
          </div>

          {/* AC */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              AC Available
            </label>

            <select className="form-select">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          {/* Fare */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Fare per Seat (₹)
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter fare"
            />
          </div>

          {/* Notes */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              Additional Notes
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Any special instructions..."
            ></textarea>
          </div>

          {/* Button */}
          <div className="col-12 text-end mt-3">
            <button className="btn btn-success px-4">
              🚀 Post Ride
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}