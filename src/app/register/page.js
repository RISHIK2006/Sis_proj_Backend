"use client";

import "../style.css";
import "./register.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    collegeId: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!form.gender || form.gender === "Select Gender") {
      setError("Please select a gender");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/users/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          gender: form.gender.toUpperCase(),
          collegeId: form.collegeId,
          password: form.password,
        }),
      });
      setSuccess("Registration successful. Please login.");
      setTimeout(() => router.push("/login"), 800);
    } catch (err) {
      setError(err.message || "Registration failed");
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
        <h5>Create Your Account</h5>

        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label>College Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gcet.edu.in"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label>Gender</label>
            <select
              className="form-control"
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
              required
            >
              <option value="">Select Gender</option>
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
              value={form.collegeId}
              onChange={(e) => updateField("collegeId", e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              required
            />
          </div>

          {error ? <div className="alert alert-danger py-2">{error}</div> : null}
          {success ? <div className="alert alert-success py-2">{success}</div> : null}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <br />

        <div className="text-center">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
