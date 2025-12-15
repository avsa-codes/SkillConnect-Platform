"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Loader2 } from "lucide-react";

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleOAuth = async () => {
      const code = searchParams.get("code");
      const role = searchParams.get("role") || "student";

      if (!code) {
        window.location.replace("/auth");
        return;
      }

      const supabase = createSupabaseBrowserClient();

      // 1️⃣ Exchange OAuth code for session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("OAuth exchange failed:", error);
        window.location.replace("/auth");
        return;
      }

      // 2️⃣ HARD redirect (cannot be blocked by React / AuthContext)
      if (role === "student") {
        window.location.replace("/student/onboarding");
      } else {
        window.location.replace("/org/profile");
      }
    };

    handleOAuth();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
