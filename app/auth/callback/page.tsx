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

      // 2️⃣ FETCH USER
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 3️⃣ 🔥 SET REQUIRED METADATA (THIS IS THE FIX)
      if (user) {
        await supabase.auth.updateUser({
          data: {
            role,                     // student
            profile_complete: false,  // force onboarding
            is_first_login: true,
          },
        });
      }

      // 4️⃣ Redirect to auth (let auth-context decide)
      window.location.replace("/auth");
    };

    handleOAuth();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
