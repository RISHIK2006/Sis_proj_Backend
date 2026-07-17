import "../style.css";
import "./register.css";
import Link from "next/link";

export default function Register() {
  return (
    <div className="container main-container">

      {/* Left Image */}
      <div className="image-section">
        <img
          src="/images/car.png"
          alt="RideSync"
        />
      </div>

      {/* Register Form */}
      <div className="login-box">

        <h1>RideSync</h1>

        <h5>Create Your Account</h5>

        <form>

          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-2">
            <label>College Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gcet.edu.in"
            />
          </div>

          <div className="mb-2">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-2">
            <label>Gender</label>
            <select className="form-control">
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-2">
            <label>College ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="23R11AXXXX"
            />
          </div>

          <div className="mb-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-100"
          >
            Register
          </button>

        </form>

        <br />

        <div className="text-center">
          Already have an account?{" "}
          <Link href="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}