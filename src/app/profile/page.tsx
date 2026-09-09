"use client";

import { useState, useEffect } from "react";
import { COLORS as C } from "@/lib/constants";

// Mock user data — will be replaced with real auth context
function getUserFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("forecastfx_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const u = getUserFromStorage();
    if (u) {
      setUser(u);
      setFullName(u.full_name || "");
      setEmail(u.email || "");
    } else {
      // Default demo user when no auth
      setUser({
        full_name: "Trader",
        email: "trader@forecastfx.com",
        avatar_url: null,
        created_at: new Date().toISOString(),
        is_active: true,
      });
      setFullName("Trader");
      setEmail("trader@forecastfx.com");
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = () => {
    if (user) {
      const updated = { ...user, full_name: fullName, email };
      setUser(updated);
      localStorage.setItem("forecastfx_user", JSON.stringify(updated));
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("forecastfx_token");
    localStorage.removeItem("forecastfx_user");
    window.location.href = "/auth/login";
  };

  if (!user) return null;

  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: `1px solid ${C.border}`,
    backgroundColor: "#0D1117",
    color: C.textPrimary,
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box" as const,
  };

  return (
    <main
      className="flex-1 w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8"
      style={{ backgroundColor: C.backgroundPrimary }}
    >
      {/* Page Header */}
      <div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: C.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          Profile
        </h1>
        <p style={{ fontSize: "13px", color: C.textSecondary, marginTop: "4px" }}>
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div
        style={{
          backgroundColor: C.cardSurface,
          border: `1px solid ${C.border}`,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* Banner */}
        <div
          style={{
            height: "120px",
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(139, 92, 246, 0.08) 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Avatar & Info */}
        <div style={{ padding: "0 32px 32px", marginTop: "-48px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", marginBottom: "28px" }}>
            {/* Avatar */}
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                border: `4px solid ${C.cardSurface}`,
                overflow: "hidden",
                backgroundColor: "#1E293B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#3B82F6",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {getInitials(user.full_name || "U")}
                </span>
              )}
            </div>

            {/* Name & Status */}
            <div style={{ flex: 1, paddingBottom: "4px" }}>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: C.textPrimary,
                  letterSpacing: "-0.02em",
                }}
              >
                {user.full_name || "User"}
              </h2>
              <p style={{ fontSize: "13px", color: C.textSecondary, marginTop: "2px" }}>
                {user.email}
              </p>
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                border: isEditing ? "none" : `1px solid ${C.border}`,
                backgroundColor: isEditing ? "#3B82F6" : "transparent",
                color: isEditing ? "#FFF" : C.textSecondary,
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {/* Info Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Full Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: C.textSecondary,
                  marginBottom: "8px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3B82F6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = C.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
              ) : (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    backgroundColor: "#0D1117",
                    border: `1px solid ${C.border}`,
                    color: C.textPrimary,
                    fontSize: "14px",
                  }}
                >
                  {user.full_name || "—"}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: C.textSecondary,
                  marginBottom: "8px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3B82F6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = C.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
              ) : (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    backgroundColor: "#0D1117",
                    border: `1px solid ${C.border}`,
                    color: C.textPrimary,
                    fontSize: "14px",
                  }}
                >
                  {user.email}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Info Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
        {[
          {
            label: "Member Since",
            value: memberSince,
            icon: "📅",
            color: "#3B82F6",
          },
          {
            label: "Account Status",
            value: user.is_active ? "Active" : "Inactive",
            icon: user.is_active ? "✅" : "⛔",
            color: user.is_active ? "#10B981" : "#EF4444",
          },
          {
            label: "Auth Method",
            value: user.avatar_url ? "Google OAuth" : "Email & Password",
            icon: user.avatar_url ? "🌐" : "🔑",
            color: "#8B5CF6",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            style={{
              padding: "24px",
              borderRadius: "12px",
              backgroundColor: C.cardSurface,
              border: `1px solid ${C.border}`,
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>{card.icon}</div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: C.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "6px",
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: card.color,
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div
        style={{
          backgroundColor: C.cardSurface,
          border: `1px solid rgba(239, 68, 68, 0.2)`,
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#EF4444",
            marginBottom: "8px",
          }}
        >
          Danger Zone
        </h3>
        <p style={{ fontSize: "12px", color: C.textSecondary, marginBottom: "16px" }}>
          Irreversible actions for your account
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              border: `1px solid ${C.border}`,
              backgroundColor: "transparent",
              color: C.textSecondary,
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#EF4444";
              (e.target as HTMLElement).style.color = "#EF4444";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = C.border;
              (e.target as HTMLElement).style.color = C.textSecondary;
            }}
          >
            Sign Out
          </button>
          <button
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
}
