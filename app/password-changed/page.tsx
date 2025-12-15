"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PasswordChangedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full rounded-2xl border bg-white p-6 shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Password changed</h1>
        <p className="text-muted-foreground mb-6">
          Your password was updated successfully. Please log in again.
        </p>

        <Button asChild className="w-full rounded-xl">
          <Link href="/auth">Go to Login</Link>
        </Button>
      </div>
    </div>
  );
}
