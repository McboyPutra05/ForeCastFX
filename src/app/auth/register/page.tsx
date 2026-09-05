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

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Password strength calculator
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: C.textMuted };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    const levels = [
      { label: "Weak", color: C.red },
      { label: "Fair", color: "#F59E0B" },
      { label: "Good", color: "#3B82F6" },
      { label: "Strong", color: C.green },
    ];
    return { score, ...levels[Math.min(score - 1, 3)] };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Replace with actual auth API call
    window.location.href = "/auth/login";
    setIsLoading(false);
  };

  const inputStyle: React.CSSProperties = {
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
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = C.borderFocus;
    e.target.style.boxShadow = `0 0 0 3px ${C.accent}20`;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = C.border;
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      position: "relative",
      fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
    }}>
      {/* Animated background effects */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 800px 600px at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 70%),
          radial-gradient(ellipse 600px 400px at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 70%),
          radial-gradient(ellipse 400px 300px at 50% 50%, rgba(16, 185, 129, 0.02) 0%, transparent 70%)
        `,
        pointerEvents: "none",
      }} />

      {/* Floating grid pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Left Panel — Register Form */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 60px",
        position: "relative",
      }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>
          {/* Logo */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
          }}>
            <Image
              src="/logo-forecastFX.png"
              alt="ForeCastFX"
              width={32}
              height={32}
              style={{ borderRadius: "8px" }}
            />
            <span style={{ 
              fontSize: "16px", 
              fontWeight: 800, 
              color: C.text,
              letterSpacing: "-0.02em",
            }}>
              ForeCastFX
            </span>
          </div>

          {/* Form header */}
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{
              fontSize: "28px",
              fontWeight: 800,
              color: C.text,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}>
              Create your account
            </h2>
            <p style={{
              fontSize: "14px",
              color: C.textSecondary,
            }}>
              Start getting AI-powered trading predictions today
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

          {/* Register Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Full Name */}
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
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

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
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Password field */}
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
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  style={{ ...inputStyle, paddingRight: "48px" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
              {/* Password strength meter */}
              {password && (
                <div style={{ marginTop: "10px" }}>
                  <div style={{
                    display: "flex",
                    gap: "4px",
                    marginBottom: "6px",
                  }}>
                    {[1, 2, 3, 4].map(level => (
                      <div key={level} style={{
                        flex: 1,
                        height: "3px",
                        borderRadius: "2px",
                        backgroundColor: level <= strength.score ? strength.color : `${C.border}`,
                        transition: "all 0.3s ease",
                      }} />
                    ))}
                  </div>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: strength.color,
                  }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password field */}
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
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                required
                style={{
                  ...inputStyle,
                  borderColor: confirmPassword && confirmPassword !== password ? C.red : C.border,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {confirmPassword && confirmPassword !== password && (
                <span style={{ fontSize: "11px", color: C.red, marginTop: "4px", display: "block" }}>
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Terms checkbox */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  accentColor: C.accent,
                  cursor: "pointer",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <label htmlFor="terms" style={{
                fontSize: "12px",
                color: C.textSecondary,
                cursor: "pointer",
                lineHeight: 1.5,
              }}>
                I agree to the{" "}
                <span style={{ color: C.accent, fontWeight: 600 }}>Terms of Service</span>{" "}
                and{" "}
                <span style={{ color: C.accent, fontWeight: 600 }}>Privacy Policy</span>
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
                backgroundColor: isLoading ? C.textMuted : C.green,
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 700,
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) (e.target as HTMLElement).style.backgroundColor = "#059669";
              }}
              onMouseLeave={(e) => {
                if (!isLoading) (e.target as HTMLElement).style.backgroundColor = C.green;
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
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "24px 0",
          }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: C.border }} />
            <span style={{ fontSize: "12px", color: C.textMuted, fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: C.border }} />
          </div>

          {/* Social login buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
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

          {/* Login link */}
          <p style={{
            textAlign: "center",
            fontSize: "13px",
            color: C.textSecondary,
          }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{
              color: C.accent,
              fontWeight: 700,
              textDecoration: "none",
            }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel — Branding / Visual */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        position: "relative",
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, transparent 100%)",
      }}>
        <div style={{ maxWidth: "420px", textAlign: "center" }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: `linear-gradient(135deg, ${C.green}15, ${C.accent}10)`,
            border: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            fontSize: "36px",
          }}>
            🚀
          </div>

          <h1 style={{
            fontSize: "32px",
            fontWeight: 800,
            color: C.text,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}>
            Join <span style={{ color: C.green }}>2,500+</span> Traders
          </h1>
          
          <p style={{
            fontSize: "15px",
            color: C.textSecondary,
            lineHeight: 1.7,
            marginBottom: "40px",
          }}>
            Get ahead of the market with AI-powered economic news analysis 
            and real-time XAUUSD trading signals.
          </p>

          {/* Stats cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { value: "87%", label: "Prediction Accuracy", color: C.green },
              { value: "150+", label: "Events Tracked", color: C.accent },
              { value: "24/7", label: "Real-time Monitoring", color: "#F59E0B" },
              { value: "<3s", label: "Signal Delivery", color: "#8B5CF6" },
            ].map((stat, idx) => (
              <div key={idx} style={{
                padding: "20px 16px",
                borderRadius: "12px",
                backgroundColor: `${C.card}99`,
                border: `1px solid ${C.border}`,
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: stat.color,
                  letterSpacing: "-0.02em",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: "11px",
                  color: C.textMuted,
                  marginTop: "4px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
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
