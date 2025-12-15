// app/admin/loading.tsx
export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="h-7 w-72 bg-muted animate-pulse rounded-md" />

      {/* Admin stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-muted animate-pulse"
          />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-16 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
