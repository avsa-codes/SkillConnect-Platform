"use client";

import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/**
 * This component ensures that Google OAuth
 * sessions are completed when the user returns
 * to the site with `?code=xxxx`.
 */
export default function OAuthHandler() {
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    // This finalizes the Supabase OAuth login when returning from Google
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        console.log("🔐 OAuth session restored");
      }
    });
  }, []);

  return null;
}
