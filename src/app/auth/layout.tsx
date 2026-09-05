import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | ForeCastFX",
  description: "Sign in to your ForeCastFX account to access AI-powered trading predictions.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      position: "fixed", 
      inset: 0, 
      overflowY: "auto",
      backgroundColor: "#090D16",
      zIndex: 9999,
    }}>
      {children}
    </div>
  );
}
