// "use client";

// import { useEffect, useState } from "react";
// import { DashboardLayout } from "@/components/layout/dashboard-layout";
// import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
// import { useAuth } from "@/context/auth-context";

// export default function WorkLedgerPage() {
//   const supabase = createSupabaseBrowserClient();
//   const { user } = useAuth();

//   const [loading, setLoading] = useState(true);
//   const [entries, setEntries] = useState<any[]>([]);



//   useEffect(() => {
//     if (!user) return;

//     const loadLedger = async () => {
//       setLoading(true);

//       const { data, error } = await supabase
//         .from("task_feedback")
//         .select(`
//           id,
//           created_at,
//           outcome,
//           comment,
//           overall_rating,
//           timeliness,
//           late_minutes,
//           would_rehire,

//           tasks:task_id (
//             id,
//             title
//           ),

//           organizations:org_id (
//             user_id,
//             company_name
//           )
//         `)
//         .eq("student_id", user.id)
//         .order("created_at", { ascending: false });

//       console.log("📒 LEDGER DATA:", data, "ERROR:", error);

//       if (!error) {
//         setEntries(data || []);
//       }

//       setLoading(false);
//     };

//     loadLedger();
//   }, [user]);

//   return (
//     <DashboardLayout allowedRoles={["student"]}>
//       <div className="p-6 max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Work Ledger</h1>

//         {loading && <p>Loading ledger...</p>}

//         {!loading && entries.length === 0 && (
//           <p className="text-muted-foreground">No ledger entries yet.</p>
//         )}

//        <div className="relative pl-6 space-y-10">
//   {/* Timeline vertical line */}
//   <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-200" />

//   {entries.map((e) => (
//     <div key={e.id} className="relative flex gap-6">
      
//       {/* Timeline dot */}
//       <div className="relative z-10">
//         <div className="h-4 w-4 rounded-full bg-green-500 mt-2" />
//       </div>

//       {/* Ledger Card */}
//       <div className="flex-1 bg-white border rounded-2xl shadow-sm p-6">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               {e.tasks?.title || "Task"}
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               {e.organizations?.company_name || "Organization"}
//             </p>
//           </div>

//           {/* Outcome Badge */}
//           <div
//             className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
//               e.outcome === "on_time"
//                 ? "bg-green-100 text-green-700"
//                 : e.outcome === "late"
//                 ? "bg-red-100 text-red-700"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {e.outcome === "on_time" ? "On Time" : e.outcome}
//             {e.timeliness === "late" && e.late_minutes
//               ? ` · ${e.late_minutes} min late`
//               : ""}
//           </div>
//         </div>

//         {/* Skills row (future-proof, static for now) */}
//         <div className="flex flex-wrap gap-2 mt-4">
//           <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
//             Task Skill
//           </span>
//           <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700">
//             Professional Work
//           </span>
//           <span className="px-3 py-1 text-xs rounded-full bg-orange-50 text-orange-700">
//             On-field Execution
//           </span>
//         </div>

//         {/* Feedback */}
//         {e.comment && (
//           <div className="mt-5 border-l-4 border-green-300 pl-4 text-sm text-gray-700 italic leading-relaxed">
//             “{e.comment}”
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-6 pt-4 border-t text-xs text-gray-500">
//           <span>
//             Completed on{" "}
//             {new Date(e.created_at).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })}
//           </span>

//           <span className="flex items-center gap-1 text-green-600 font-medium">
//             ✓ Verified work record
//           </span>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//       </div>
//     </DashboardLayout>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useAuth } from "@/context/auth-context";
import { CheckCircle2, Clock, ShieldCheck, Star, ArrowUpRight, Award } from "lucide-react";

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
          id, created_at, outcome, comment, overall_rating, timeliness, late_minutes,
          tasks:task_id ( id, title ),
          organizations:org_id ( company_name )
        `)
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });
      if (!error) setEntries(data || []);
      setLoading(false);
    };
    loadLedger();
  }, [user]);

  return (
    <DashboardLayout allowedRoles={["student"]}>
      <div className="p-8 max-w-5xl mx-auto bg-white min-h-screen">
        
        {/* Premium Header - Orange Branding */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-500 w-8 h-1 rounded-full" />
                <span className="text-orange-600 font-bold text-sm uppercase tracking-[0.2em]">Verified Ledger</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">SkillConnect Record</h1>
            <p className="text-slate-500 mt-2 font-medium">Your immutable professional equity, built task by task.</p>
          </div>
          <div className="bg-orange-50 px-5 py-3 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
            <ShieldCheck className="text-orange-600 h-6 w-6" />
            <div>
                <p className="text-[10px] font-bold text-orange-400 uppercase leading-none mb-1">Status</p>
                <p className="text-sm font-black text-orange-900">BGG Certified</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
             {[1,2,3].map(i => <div key={i} className="h-40 w-full bg-slate-50 animate-pulse rounded-3xl border" />)}
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-lg">Your ledger is currently empty.</p>
            <p className="text-slate-400 text-sm">Complete your first task to start building your score.</p>
          </div>
        ) : (
          <div className="relative pl-10 space-y-12">
            {/* The Timeline Line - Subtle Orange Gradient */}
            <div className="absolute left-[13px] top-2 bottom-0 w-[3px] bg-gradient-to-b from-orange-500 via-orange-100 to-transparent rounded-full" />

            {entries.map((e) => (
              <div key={e.id} className="relative group">
                {/* Timeline Node - Orange Glow */}
                <div className="absolute -left-[39px] top-8 h-8 w-8 rounded-full border-[6px] border-white bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)] z-10 group-hover:scale-110 transition-transform" />

                {/* Premium Card Layout */}
                <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] transition-all duration-500 p-8">
                  
                  {/* Top Section: Branding & Outcome */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-50">
                    <div className="flex gap-5 items-start">
                        <div className="h-14 w-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-200 font-black text-xl">
                            {e.organizations?.company_name?.charAt(0) || "T"}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight">
                                {e.tasks?.title}
                            </h2>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <span>{e.organizations?.company_name}</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
                                <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded italic lowercase">ref:{e.id.split('-')[0]}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 self-end lg:self-center">
                        <div className="text-right">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Performance</p>
                            <div className="flex items-center text-orange-600 font-black text-lg">
                                {e.overall_rating || "N/A"}<Star className="h-4 w-4 fill-current ml-1" />
                            </div>
                        </div>
                        <div className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm ${
                            e.outcome === "on_time" 
                            ? "bg-emerald-500 text-white shadow-emerald-100" 
                            : "bg-orange-500 text-white shadow-orange-100"
                        }`}>
                            {e.outcome?.replace('_', ' ')}
                        </div>
                    </div>
                  </div>

                  {/* Middle Section: Detailed Attributes */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Punctuality</p>
                            <p className="text-sm font-black text-slate-800">{e.timeliness === 'on_time' ? "Zero Delay" : `${e.late_minutes}m Late`}</p>
                        </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600">
                            <Award className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Endorsement</p>
                            <p className="text-sm font-black text-slate-800">{e.would_rehire ? "Hiring Preferred" : "Standard Review"}</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center gap-4 md:col-span-2 lg:col-span-1">
                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Verification</p>
                            <p className="text-sm font-black text-slate-800">Org. Authenticated</p>
                        </div>
                    </div>
                  </div>

                  {/* Feedback Quote Section */}
                  {e.comment && (
                    <div className="mt-8 p-6 bg-orange-50/30 rounded-2xl border border-orange-100/50 relative">
                      <p className="text-slate-700 leading-relaxed font-semibold italic text-base">
                        "{e.comment}"
                      </p>
                      <div className="absolute -top-3 -left-3 bg-white p-1 rounded-lg border shadow-sm text-orange-500">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Footer Timestamp */}
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Recorded on {new Date(e.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-[11px] uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4" />
                        Verified Work Record
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}