"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { clearStoredUser, getStoredUser } from "../lib/api";
import { useRouter } from "next/navigation";

export default function Topbar({ title, subtitle }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  function handleLogout() {
    clearStoredUser();
    router.push("/login");
  }

  return (
    <div className="topbar">
      <div>
        <h3 className="mb-0 fw-bold">{title}</h3>
        <small className="text-muted">{subtitle}</small>
      </div>

      <div className="topbar-right">
        <button className="notification-btn" type="button">
          <Bell size={20} />
        </button>

        <div className="profile-box">
          <img
            src={user?.profilePicUrl || "https://i.pravatar.cc/100"}
            alt="Profile"
          />
          <div>
            <h6 className="mb-0">{user?.name || "Guest"}</h6>
            <small>{user?.role || "Student"}</small>
          </div>
        </div>

        {user ? (
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
}
