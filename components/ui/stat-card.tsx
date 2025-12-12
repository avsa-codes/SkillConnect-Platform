// import type React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { cn } from "@/lib/utils"

// interface StatCardProps {
//   title: string
//   value: string | number
//   description?: string
//   icon?: React.ReactNode
//   trend?: {
//     value: number
//     isPositive: boolean
//   }
//   className?: string
// }

// export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
//   return (
//     <Card className={cn("rounded-2xl", className)}>
//       <CardContent className="p-6">
//         <div className="flex items-start justify-between">
//           <div className="flex-1">
//             <p className="text-sm font-medium text-muted-foreground">{title}</p>
//             <p className="text-2xl font-bold mt-1">{value}</p>
//             {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
//             {trend && (
//               <p className={cn("text-sm font-medium mt-2", trend.isPositive ? "text-green-600" : "text-destructive")}>
//                 {trend.isPositive ? "+" : ""}
//                 {trend.value}%<span className="text-muted-foreground font-normal ml-1">vs last month</span>
//               </p>
//             )}
//           </div>
//           {icon && (
//             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//               {icon}
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        `
      rounded-2xl overflow-hidden 
      bg-white dark:bg-neutral-900 
      border border-neutral-200

      /* premium shadow */
      shadow-[0_4px_18px_rgba(0,0,0,0.06)]
      hover:shadow-[0_6px_28px_rgba(0,0,0,0.10)]
      hover:-translate-y-[2px]
      transition-all duration-300
    `,
        className
      )}
    >
      {/* 🔥 Thin Premium Orange Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-orange-500" />

      <CardContent className="p-6 relative">

        {/* 🔥 Premium Orange Icon Badge */}
        {icon && (
          <div
            className="
            absolute top-6 right-6
            h-11 w-11 rounded-xl
            bg-gradient-to-br from-orange-50 to-orange-100
            border border-orange-200
            shadow-sm
            flex items-center justify-center
            text-primary
          "
          >
            {icon}
          </div>
        )}

        {/* Title */}
        <p className="text-[13px] font-medium text-neutral-500">{title}</p>

        {/* Value */}
        <p className="text-[30px] font-bold mt-2 leading-tight">{value}</p>

        {/* Description */}
        {description && (
          <p className="text-xs text-neutral-500 mt-1">{description}</p>
        )}

        {/* Trend */}
        {trend && (
          <p
            className={cn(
              "text-sm font-semibold mt-3",
              trend.isPositive ? "text-green-600" : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%{" "}
            <span className="text-neutral-400 font-normal ml-1">
              vs last month
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
