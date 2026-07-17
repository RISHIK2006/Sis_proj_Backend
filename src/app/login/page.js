import "../style.css";
import "../login.css";
import Link from "next/link";

export default function Login() {
  return (
    <div className="container main-container">

      {/* Image Section */}
      <div className="image-section">
        <img
          src="/images/car.png"
          alt="RideSync"
        />
      </div>

      {/* Login Form */}
      <div className="login-box">

        <h1>RideSync</h1>

        <h5>Smart Rides, Shared Journeys</h5>

        <form>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              id="email"
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              id="password"
            />

          </div>

          <button
            type="button"
            className="btn btn-primary w-100"
            id="loginBtn"
          >
            Login
          </button>

        </form>

        <br />

        <div className="text-center">

          Don't have an account?{" "}

          <Link href="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}