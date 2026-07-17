"use client";

export default function SearchForm() {
  return (
    <div className="card shadow border-0 rounded-4 mb-4">
      <div className="card-body p-4">

        <h3 className="fw-bold mb-4">
          🔍 Search Ride
        </h3>

        <div className="row g-3">

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

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Date
            </label>

            <input
              type="date"
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Time
            </label>

            <input
              type="time"
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Seats Required
            </label>

            <input
              type="number"
              className="form-control"
              min="1"
              placeholder="Seats"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Vehicle Type
            </label>

            <select className="form-select">
              <option>All</option>
              <option>Car</option>
              <option>Bike</option>
              <option>Scooter</option>
            </select>
          </div>

          <div className="col-12 text-end mt-3">
            <button className="btn btn-primary px-4">
              Search Ride
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}