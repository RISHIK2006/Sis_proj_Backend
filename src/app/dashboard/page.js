"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import StatCard from "../../components/StatCard";
import QuickActionCard from "../../components/QuickActionCard";
import RecommendationCard from "../../components/RecommendationCard";
import RecentRides from "../../components/RecentRides";
import NoticeCard from "../../components/NoticeCard";
import { apiFetch, getStoredUser, requireUser } from "../../lib/api";

import "../../styles/cards.css";
import "../../styles/table.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ ridesPosted: 0, totalBookings: 0 });

  useEffect(() => {
    const stored = requireUser();
    if (!stored) return;
    setUser(stored);

    async function loadStats() {
      try {
        const data = await apiFetch(`/users/${stored.userId}/stats`);
        setStats(data);
      } catch {
        // Keep zeros if stats fail — dashboard still usable.
      }
    }

    loadStats();
  }, []);

  const welcomeName = user?.name || getStoredUser()?.name || "there";

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`Welcome back, ${welcomeName} 👋`}
    >
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <StatCard
            title="Rides Posted"
            value={String(stats.ridesPosted ?? 0)}
            icon="bi-car-front-fill"
            color="#4f46e5"
          />
        </div>

        <div className="col-md-4">
          <StatCard
            title="Total Bookings"
            value={String(stats.totalBookings ?? 0)}
            icon="bi-calendar-check-fill"
            color="#0ea5e9"
          />
        </div>

        <div className="col-md-4">
          <StatCard
            title="Account"
            value="Active"
            icon="bi-person-check-fill"
            color="#22c55e"
          />
        </div>
      </div>

      <h4 className="mb-3">Quick Actions</h4>

      <div className="row g-4 mb-5">
        <QuickActionCard
          title="Search Ride"
          href="/search-rides"
          icon="bi-search"
          color="#2563eb"
        />

        <QuickActionCard
          title="Post Ride"
          href="/post-ride"
          icon="bi-plus-circle-fill"
          color="#8b5cf6"
        />

        <QuickActionCard
          title="AI Assistant"
          href="/ai-assistant"
          icon="bi-robot"
          color="#10b981"
        />

        <QuickActionCard
          title="Ride Chat"
          href="/ride-chat"
          icon="bi-chat-dots-fill"
          color="#f59e0b"
        />
      </div>

      <RecommendationCard />

      <RecentRides />

      <div className="mt-4">
        <h4 className="mb-3">Campus Notices</h4>
        <NoticeCard
          title="Placement Drive"
          description="TCS placement drive starts tomorrow at 9:00 AM."
          date="Today"
        />
        <NoticeCard
          title="Hackathon"
          description="Registrations are now open for the college hackathon."
          date="Yesterday"
        />
      </div>
    </DashboardLayout>
  );
}
