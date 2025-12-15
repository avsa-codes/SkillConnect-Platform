"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.replace("/auth");
        return;
      }

      const user = data.session.user;

      // OPTIONAL (recommended): check onboarding status
      const { data: profile } = await supabase
        .from("students")
        .select("onboarded")
        .eq("id", user.id)
        .single();

      if (!profile || !profile.onboarded) {
        router.replace("/student/onboarding");
      } else {
        router.replace("/student/dashboard");
      }
    };

    handleAuth();
  }, [router, supabase]);

  return null; // no UI needed
}
