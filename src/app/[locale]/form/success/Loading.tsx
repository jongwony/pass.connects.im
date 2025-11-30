export default function Loading() {
  return (
    <div className="w-full max-w-md space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="text-center space-y-2">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mx-auto" />
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3 mx-auto" />
      </div>

      {/* Content card skeleton */}
      <div className="border rounded-lg border-gray-400 p-8 space-y-4">
        <div className="h-20 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full mx-auto" />
        <div className="space-y-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mx-auto" />
    </div>
  );
}
