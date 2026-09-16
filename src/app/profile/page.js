"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ProfileCard from "../../components/ProfileCard";
import { apiFetch, requireUser } from "../../lib/api";

export default function ProfilePage() {
  const [stats, setStats] = useState({ ridesPosted: 0, totalBookings: 0 });
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const user = requireUser();
    if (!user) return;

    async function load() {
      try {
        const [profile, accountStats] = await Promise.all([
          apiFetch(`/users/${user.userId}`),
          apiFetch(`/users/${user.userId}/stats`),
        ]);
        setStats(accountStats);
        if (profile.createdAt) {
          setCreatedAt(
            new Date(profile.createdAt).toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })
          );
        }
      } catch {
        // Keep defaults
      }
    }

    load();
  }, []);

  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your personal information."
    >
      <ProfileCard />

      <div className="card shadow-sm border-0 rounded-4 mt-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">Account Information</h4>

          <div className="row">
            <div className="col-md-4">
              <h6>Registered Since</h6>
              <p>{createdAt || "—"}</p>
            </div>

            <div className="col-md-4">
              <h6>Total Rides Posted</h6>
              <p>{stats.ridesPosted ?? 0}</p>
            </div>

            <div className="col-md-4">
              <h6>Total Bookings</h6>
              <p>{stats.totalBookings ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
