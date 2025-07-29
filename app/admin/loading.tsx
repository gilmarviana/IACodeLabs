import { Skeleton } from "@/components/ui/skeleton"

export default function AdminDashboardLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950 p-4">
      <header className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-6 py-4 mb-6">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </header>
      <div className="mb-6 flex flex-wrap gap-2">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
      <main className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="col-span-full h-96 w-full rounded-lg" />
      </main>
    </div>
  )
}
