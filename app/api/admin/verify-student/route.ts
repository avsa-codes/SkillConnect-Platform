import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 🔐 Server-side service role client (same as onboarding API)
function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // SERVICE ROLE
    { auth: { persistSession: false } }
  );
}

export async function POST(req: Request) {
  try {
    const supabase = getServerClient();

    const body = await req.json();
    const { studentId, is_verified } = body;

    if (!studentId || typeof is_verified !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { error } = await supabase
      .from("student_profiles")
      .update({ is_verified })
      .eq("user_id", studentId)   


    if (error) {
      console.error("VERIFY ERROR:", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
