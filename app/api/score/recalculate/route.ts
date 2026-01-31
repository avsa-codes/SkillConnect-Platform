import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { student_id } = await req.json();

    if (!student_id) {
      return NextResponse.json({ error: "student_id required" }, { status: 400 });
    }

    // 1. Load all feedback
    const { data: feedbacks, error } = await supabase
      .from("task_feedback")
      .select("*")
      .eq("student_id", student_id);

    if (error) throw error;

    if (!feedbacks || feedbacks.length === 0) {
      // No tasks yet → base score
      await supabase
        .from("student_profiles")
        .update({ skillconnect_score: 10 })
        .eq("user_id", student_id);

      return NextResponse.json({ score: 10 });
    }

    const totalTasks = feedbacks.length;

    // ---------------------------
    // 2. QUALITY SCORE (50)
    // ---------------------------
    let qualitySum = 0;

    for (const f of feedbacks) {
      const ratings = [
        f.quality_rating,
        f.reliability_rating,
        f.communication_rating,
      ].filter((x) => typeof x === "number");

      if (ratings.length === 0) continue;

      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      const taskScore = (avg / 5) * 50;
      qualitySum += taskScore;
    }

    const qualityScore = qualitySum / totalTasks;

    // ---------------------------
    // 3. RELIABILITY SCORE (30)
    // ---------------------------
    let reliabilityScore = 30;

    const noShows = feedbacks.filter(f => f.outcome === "no_show").length;
    const leftMidway = feedbacks.filter(f => f.outcome === "left_midway").length;
    const lateCount = feedbacks.filter(f => f.timeliness === "late").length;

    reliabilityScore -= noShows * 10;
    reliabilityScore -= leftMidway * 6;
    reliabilityScore -= Math.min(10, lateCount * 2);

    if (reliabilityScore < 0) reliabilityScore = 0;

    // ---------------------------
    // 4. REHIRE SCORE (20)
    // ---------------------------
    const rehireYes = feedbacks.filter(f => f.would_rehire === true).length;
    const rehireRatio = rehireYes / totalTasks;
    const rehireScore = rehireRatio * 20;

    // ---------------------------
    // 5. FINAL SCORE
    // ---------------------------
    let finalScore = Math.round(qualityScore + reliabilityScore + rehireScore);

    if (finalScore < 1) finalScore = 1;
    if (finalScore > 100) finalScore = 100;

    // ---------------------------
    // 6. Save to profile
    // ---------------------------
    await supabase
      .from("student_profiles")
      .update({
        skillconnect_score: finalScore,
        total_tasks_completed: totalTasks,
        total_drops: noShows + leftMidway,
        total_late: lateCount,
        average_rating: qualityScore / 10, // approx back to 5-scale
      })
      .eq("user_id", student_id);

    return NextResponse.json({
      score: finalScore,
      breakdown: {
        qualityScore,
        reliabilityScore,
        rehireScore,
      },
    });
  } catch (err: any) {
    console.error("Score calc error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to calculate score" },
      { status: 500 }
    );
  }
}
