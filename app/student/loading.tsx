// app/student/loading.tsx
export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Page title */}
      <div className="h-7 w-56 bg-muted animate-pulse rounded-md" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-muted animate-pulse"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="space-y-4">
        <div className="h-5 w-40 bg-muted animate-pulse rounded" />
        <div className="h-24 bg-muted animate-pulse rounded-xl" />
        <div className="h-24 bg-muted animate-pulse rounded-xl" />
      </div>
    </div>
  )
}
