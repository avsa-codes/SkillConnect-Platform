"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useAuth } from "@/context/auth-context";

export default function WorkLedgerPage() {
  const supabase = createSupabaseBrowserClient();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<any[]>([]);



  useEffect(() => {
    if (!user) return;

    const loadLedger = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("task_feedback")
        .select(`
          id,
          created_at,
          outcome,
          comment,
          overall_rating,
          timeliness,
          late_minutes,
          would_rehire,

          tasks:task_id (
            id,
            title
          ),

          organizations:org_id (
            user_id,
            company_name
          )
        `)
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      console.log("📒 LEDGER DATA:", data, "ERROR:", error);

      if (!error) {
        setEntries(data || []);
      }

      setLoading(false);
    };

    loadLedger();
  }, [user]);

  return (
    <DashboardLayout allowedRoles={["student"]}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Work Ledger</h1>

        {loading && <p>Loading ledger...</p>}

        {!loading && entries.length === 0 && (
          <p className="text-muted-foreground">No ledger entries yet.</p>
        )}

       <div className="relative pl-6 space-y-10">
  {/* Timeline vertical line */}
  <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-200" />

  {entries.map((e) => (
    <div key={e.id} className="relative flex gap-6">
      
      {/* Timeline dot */}
      <div className="relative z-10">
        <div className="h-4 w-4 rounded-full bg-green-500 mt-2" />
      </div>

      {/* Ledger Card */}
      <div className="flex-1 bg-white border rounded-2xl shadow-sm p-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {e.tasks?.title || "Task"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {e.organizations?.company_name || "Organization"}
            </p>
          </div>

          {/* Outcome Badge */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
              e.outcome === "on_time"
                ? "bg-green-100 text-green-700"
                : e.outcome === "late"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {e.outcome === "on_time" ? "On Time" : e.outcome}
            {e.timeliness === "late" && e.late_minutes
              ? ` · ${e.late_minutes} min late`
              : ""}
          </div>
        </div>

        {/* Skills row (future-proof, static for now) */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
            Task Skill
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700">
            Professional Work
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-orange-50 text-orange-700">
            On-field Execution
          </span>
        </div>

        {/* Feedback */}
        {e.comment && (
          <div className="mt-5 border-l-4 border-green-300 pl-4 text-sm text-gray-700 italic leading-relaxed">
            “{e.comment}”
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-6 pt-4 border-t text-xs text-gray-500">
          <span>
            Completed on{" "}
            {new Date(e.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          <span className="flex items-center gap-1 text-green-600 font-medium">
            ✓ Verified work record
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </DashboardLayout>
  );
}
