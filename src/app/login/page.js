"use client";

import "../style.css";
import "../login.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, storeUser } from "../../lib/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiFetch("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      storeUser(data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container main-container">
      <div className="image-section">
        <img src="/images/car.png" alt="RideSync" />
      </div>

      <div className="login-box">
        <h1>RideSync</h1>
        <h5>Smart Rides, Shared Journeys</h5>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error ? <div className="alert alert-danger py-2">{error}</div> : null}

          <button
            type="submit"
            className="btn btn-primary w-100"
            id="loginBtn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <br />

        <div className="text-center">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
