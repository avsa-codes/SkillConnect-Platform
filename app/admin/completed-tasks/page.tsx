"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import AdminRoute from "@/components/admin/AdminRoute";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeStatus } from "@/components/ui/badge-status";
import { Button } from "@/components/ui/button";
import { User, Calendar, Star } from "lucide-react";

export default function CompletedTasksPage() {
  const supabase = createSupabaseBrowserClient();

  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompletedTasks() {
      setLoading(true);

      // Fetch completed tasks
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("status", "completed")
        .order("completed_at", { ascending: false });

      if (!tasks) {
        setCompletedTasks([]);
        setLoading(false);
        return;
      }

      // Fetch student details for each task (assigned_students = uuid array)
      const enrichedTasks = [];

      for (const task of tasks) {
        const assigned = task.assigned_students || [];

        let student = null;

        if (assigned.length > 0) {
          const { data: stuData } = await supabase
            .from("student_profiles")
            .select("*")
            .eq("user_id", assigned[0]) // currently only 1 student assigned
            .maybeSingle();

          student = stuData;
        }

        enrichedTasks.push({ ...task, student });
      }

      setCompletedTasks(enrichedTasks);
      setLoading(false);
    }

    loadCompletedTasks();
  }, []);

  if (loading) {
    return (
      <AdminRoute>
        <DashboardLayout allowedRoles={["admin", "super_admin"]}>
          <p className="py-10 text-center text-muted-foreground">Loading completed tasks...</p>
        </DashboardLayout>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <DashboardLayout allowedRoles={["admin", "super_admin"]}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Completed Tasks</h1>
            <p className="text-muted-foreground">
              Review completed tasks, feedback, and student performance.
            </p>
          </div>

          <div className="space-y-4">
            {completedTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">
                No completed tasks yet.
              </p>
            ) : (
              completedTasks.map((task) => (
                <Card key={task.id} className="rounded-xl shadow-md border">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{task.title}</CardTitle>
                      <BadgeStatus status="completed" />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">

                    {/* Task Info */}
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Completion Date</p>
                      <p className="font-medium">
                        {task.completed_at ? new Date(task.completed_at).toLocaleDateString() : "-"}
                      </p>
                    </div>

                    {/* Student Section */}
                    {task.student ? (
                      <div className="space-y-2 p-4 bg-blue-50 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-blue-600" />
                          <p className="font-semibold text-blue-800">{task.student.full_name}</p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {task.student.college}
                        </p>

                        <p className="text-sm">{task.student.bio || "No bio provided."}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {task.student.skills?.map((sk: string) => (
                            <span key={sk} className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                              {sk}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1 mt-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <p className="font-medium">{task.student.rating ?? "No rating"}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No student assigned.
                      </p>
                    )}

                    {/* Org Feedback */}
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-muted-foreground">Organisation Feedback</p>
                      <p className="font-medium">
                        {task.org_feedback || "No feedback provided."}
                      </p>

                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <p className="font-medium">{task.org_rating ?? "No rating"}</p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}
