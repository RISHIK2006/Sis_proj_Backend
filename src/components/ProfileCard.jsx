"use client";

import { useEffect, useState } from "react";
import { apiFetch, requireUser } from "../lib/api";

export default function ProfileCard() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = requireUser();
    if (!user) return;

    async function load() {
      try {
        const data = await apiFetch(`/users/${user.userId}`);
        setProfile(data);
        setForm({ name: data.name || "", phone: data.phone || "" });
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSave() {
    const user = requireUser();
    if (!user) return;
    setError("");
    setMessage("");
    try {
      const updated = await apiFetch(`/users/${user.userId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
        }),
      });
      setProfile(updated);
      localStorage.setItem("ridesync_user", JSON.stringify(updated));
      setEditing(false);
      setMessage("Profile updated");
    } catch (err) {
      setError(err.message || "Update failed");
    }
  }

  if (loading) {
    return <p className="text-muted">Loading profile...</p>;
  }

  if (!profile) {
    return error ? <div className="alert alert-danger">{error}</div> : null;
  }

  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body p-4">
        <div className="text-center mb-4">
          <img
            src={profile.profilePicUrl || "https://i.pravatar.cc/150"}
            alt="Profile"
            className="rounded-circle mb-3"
            width="120"
            height="120"
          />
          <h3 className="fw-bold mb-1">{profile.name}</h3>
          <p className="text-muted">{profile.role || "Student"}</p>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              className="form-control"
              value={editing ? form.name : profile.name || ""}
              readOnly={!editing}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">College ID</label>
            <input className="form-control" value={profile.collegeId || ""} readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input className="form-control" value={profile.email || ""} readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              className="form-control"
              value={editing ? form.phone : profile.phone || ""}
              readOnly={!editing}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Gender</label>
            <input className="form-control" value={profile.gender || ""} readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Average Rating</label>
            <input
              className="form-control"
              value={profile.averageRating ?? 0}
              readOnly
            />
          </div>

          {/* Frontend-only placeholders — not in MySQL schema */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Department</label>
            <input
              className="form-control"
              value="Not stored in database"
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Year</label>
            <input className="form-control" value="Not stored in database" readOnly />
          </div>
        </div>

        {error ? <div className="alert alert-danger mt-3 py-2">{error}</div> : null}
        {message ? <div className="alert alert-success mt-3 py-2">{message}</div> : null}

        <div className="text-end mt-4">
          {editing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setEditing(false);
                  setForm({ name: profile.name || "", phone: profile.phone || "" });
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
