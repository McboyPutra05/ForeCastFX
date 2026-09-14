"use client";

import { useState, useEffect } from "react";
import { User, Mail, Calendar, ShieldCheck, Globe, Key, LogOut, Trash2, Edit3, Check, X, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface UserProfile {
  id?: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  created_at: string;
  is_active?: boolean;
}

function getUserFromStorage(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("forecastfx_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const u = getUserFromStorage();
    if (u) {
      setUser(u);
      setFullName(u.full_name || "");
      setEmail(u.email || "");
    } else {
      const demoUser: UserProfile = {
        full_name: "Trader Pro",
        email: "trader@forecastfx.com",
        avatar_url: null,
        created_at: new Date().toISOString(),
        is_active: true,
      };
      setUser(demoUser);
      setFullName(demoUser.full_name || "");
      setEmail(demoUser.email || "");
    }
  }, []);

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = () => {
    if (user) {
      const updated: UserProfile = { ...user, full_name: fullName, email };
      setUser(updated);
      localStorage.setItem("forecastfx_user", JSON.stringify(updated));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFullName(user.full_name || "");
      setEmail(user.email || "");
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Account Profile</h1>
            <Badge variant="secondary" className="gap-1 text-xs">
              <Sparkles className="size-3 text-primary" /> Pro Plan
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your personal information, active session, and preferences.
          </p>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400 animate-in fade-in slide-in-from-top-1">
            <Check className="size-4 shrink-0" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        {/* Main Profile Info Card */}
        <Card className="overflow-hidden border-border bg-card shadow-sm">
          {/* Decorative Gradient Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 relative border-b border-border">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          </div>

          <CardContent className="relative pt-0 pb-6 px-6 sm:px-8">
            {/* Header: Avatar, Name, and Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-6">
              <div className="flex items-end gap-4">
                <Avatar className="size-24 border-4 border-card shadow-xl ring-2 ring-border/50">
                  {user.avatar_url && (
                    <AvatarImage
                      src={user.avatar_url}
                      alt={user.full_name || "Profile picture"}
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>

                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold leading-none">{user.full_name || "Trader"}</h2>
                    <Badge variant={user.is_active !== false ? "default" : "destructive"} className="text-[10px] px-1.5 py-0">
                      {user.is_active !== false ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-end">
                {isEditing ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleCancel} className="gap-1.5">
                      <X className="size-4" /> Cancel
                    </Button>
                    <Button variant="default" size="sm" onClick={handleSave} className="gap-1.5">
                      <Check className="size-4" /> Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5">
                    <Edit3 className="size-4" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Editable Profile Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <User className="size-3.5" /> Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    className="h-10"
                  />
                ) : (
                  <div className="h-10 px-3 flex items-center rounded-lg border border-input/40 bg-muted/30 text-sm font-medium">
                    {user.full_name || "—"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Mail className="size-3.5" /> Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="h-10"
                  />
                ) : (
                  <div className="h-10 px-3 flex items-center rounded-lg border border-input/40 bg-muted/30 text-sm font-medium">
                    {user.email}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details & Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border bg-card">
            <CardHeader className="p-5 pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider">Member Since</CardDescription>
                <Calendar className="size-4 text-primary" />
              </div>
              <CardTitle className="text-base font-bold pt-1">{memberSince}</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <span className="text-xs text-muted-foreground">Standard Membership</span>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="p-5 pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider">Account Status</CardDescription>
                <ShieldCheck className="size-4 text-emerald-500" />
              </div>
              <CardTitle className="text-base font-bold pt-1 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                {user.is_active !== false ? "Verified & Active" : "Suspended"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <span className="text-xs text-muted-foreground">2FA Secured</span>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="p-5 pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider">Auth Method</CardDescription>
                {user.avatar_url ? <Globe className="size-4 text-blue-500" /> : <Key className="size-4 text-purple-500" />}
              </div>
              <CardTitle className="text-base font-bold pt-1">
                {user.avatar_url ? "Google Account" : "Password Auth"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <span className="text-xs text-muted-foreground">
                {user.avatar_url ? "OAuth Single Sign-On" : "Email & Encrypted Password"}
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Security & Danger Zone Card */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-base font-bold text-destructive flex items-center gap-2">
              <LogOut className="size-4" /> Account Actions & Danger Zone
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Sign out from this session or permanently delete your ForeCastFX account.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-4 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 hover:border-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="size-4" /> Sign Out
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <Trash2 className="size-4" /> Delete Account
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
