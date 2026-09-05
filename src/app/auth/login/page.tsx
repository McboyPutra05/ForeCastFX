"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const C = {
  bg: "#090D16",
  card: "#121826",
  cardHover: "#182232",
  border: "#1F293D",
  borderFocus: "#3B82F6",
  text: "#F8FAFC",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  accent: "#3B82F6",
  accentHover: "#2563EB",
  green: "#10B981",
  red: "#EF4444",
  inputBg: "#0D1117",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Replace with actual auth API call
    if (email && password) {
      window.location.href = "/";
    } else {
      setError("Please fill in all fields");
    }
    setIsLoading(false);
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
    }}>
      {/* Animated background effects */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 800px 600px at 20% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 70%),
          radial-gradient(ellipse 600px 400px at 80% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 70%),
          radial-gradient(ellipse 400px 300px at 50% 50%, rgba(59, 130, 246, 0.02) 0%, transparent 70%)
        `,
        pointerEvents: "none",
      }} />

      {/* Floating grid pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Left Panel — Branding */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        position: "relative",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, transparent 100%)",
      }}>
        <div style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <Image
            src="/logo-forecastFX.png"
            alt="ForeCastFX"
            width={36}
            height={36}
            style={{ borderRadius: "8px" }}
          />
          <span style={{ 
            fontSize: "18px", 
            fontWeight: 800, 
            color: C.text,
            letterSpacing: "-0.02em",
          }}>
            ForeCastFX
          </span>
        </div>

        <div style={{ maxWidth: "440px", textAlign: "center" }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: `linear-gradient(135deg, ${C.accent}15, ${C.green}10)`,
            border: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            fontSize: "36px",
          }}>
            📊
          </div>
          
          <h1 style={{
            fontSize: "36px",
            fontWeight: 800,
            color: C.text,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}>
            AI-Powered Trading<br />
            <span style={{ color: C.accent }}>Predictions</span>
          </h1>
          
          <p style={{
            fontSize: "15px",
            color: C.textSecondary,
            lineHeight: 1.7,
            marginBottom: "40px",
          }}>
            Get real-time BUY/SELL signals for XAUUSD based on 
            leading economic indicators and macroeconomic news analysis.
          </p>

          {/* Feature cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "⚡", title: "Real-time Signals", desc: "Instant BUY/SELL predictions before news releases" },
              { icon: "🎯", title: "Leading Indicators", desc: "AI analyzes CPI, NFP, PPI, and 12+ indicators" },
              { icon: "📈", title: "Track Record", desc: "Historical accuracy tracking for every prediction" },
            ].map((feat, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 20px",
                borderRadius: "12px",
                backgroundColor: `${C.card}99`,
                border: `1px solid ${C.border}`,
                textAlign: "left",
                transition: "all 0.2s ease",
              }}>
                <span style={{ fontSize: "24px", flexShrink: 0 }}>{feat.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: C.text }}>{feat.title}</div>
                  <div style={{ fontSize: "12px", color: C.textMuted, marginTop: "2px" }}>{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        position: "relative",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "420px",
        }}>
          {/* Form header */}
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{
              fontSize: "28px",
              fontWeight: 800,
              color: C.text,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}>
              Welcome back
            </h2>
            <p style={{
              fontSize: "14px",
              color: C.textSecondary,
            }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              padding: "12px 16px",
              borderRadius: "10px",
              backgroundColor: `${C.red}15`,
              border: `1px solid ${C.red}30`,
              color: C.red,
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Email field */}
            <div>
              <label style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: C.textSecondary,
                marginBottom: "8px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.inputBg,
                  color: C.text,
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = C.borderFocus;
                  e.target.style.boxShadow = `0 0 0 3px ${C.accent}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = C.border;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password field */}
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}>
                <label style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: C.textSecondary,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  Password
                </label>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "12px",
                    color: C.accent,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 16px",
                    borderRadius: "10px",
                    border: `1px solid ${C.border}`,
                    backgroundColor: C.inputBg,
                    color: C.text,
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = C.borderFocus;
                    e.target.style.boxShadow = `0 0 0 3px ${C.accent}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = C.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: C.textMuted,
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "4px",
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <input
                type="checkbox"
                id="remember"
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  accentColor: C.accent,
                  cursor: "pointer",
                }}
              />
              <label htmlFor="remember" style={{
                fontSize: "13px",
                color: C.textSecondary,
                cursor: "pointer",
              }}>
                Remember me for 30 days
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: isLoading ? C.textMuted : C.accent,
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 700,
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) (e.target as HTMLElement).style.backgroundColor = C.accentHover;
              }}
              onMouseLeave={(e) => {
                if (!isLoading) (e.target as HTMLElement).style.backgroundColor = C.accent;
              }}
            >
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "28px 0",
          }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: C.border }} />
            <span style={{ fontSize: "12px", color: C.textMuted, fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: C.border }} />
          </div>

          {/* Social login buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
            {[
              { icon: "🌐", label: "Google" },
              { icon: "🐙", label: "GitHub" },
            ].map((provider, idx) => (
              <button
                key={idx}
                type="button"
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.card,
                  color: C.text,
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = C.cardHover;
                  (e.currentTarget as HTMLElement).style.borderColor = C.textMuted;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = C.card;
                  (e.currentTarget as HTMLElement).style.borderColor = C.border;
                }}
              >
                <span>{provider.icon}</span> {provider.label}
              </button>
            ))}
          </div>

          {/* Register link */}
          <p style={{
            textAlign: "center",
            fontSize: "13px",
            color: C.textSecondary,
          }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" style={{
              color: C.accent,
              fontWeight: 700,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}>
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: ${C.textMuted};
        }
      `}</style>
    </div>
  );
}
