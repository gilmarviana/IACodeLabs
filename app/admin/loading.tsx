import { Skeleton } from "@/components/ui/skeleton"

export default function AdminDashboardLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#1F2E4F] p-4">
      <header className="flex items-center justify-between border-b border-[#27272A] bg-[#000000] px-6 py-4 mb-6 rounded-lg shadow-lg">
        <Skeleton className="h-8 w-64 bg-[#27272A]" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-32 bg-[#27272A]" />
          <Skeleton className="h-10 w-20 rounded-md bg-[#009FCC]" />
        </div>
      </header>
      <div className="mb-6 flex flex-wrap gap-2">
        <Skeleton className="h-10 w-28 rounded-md bg-[#009FCC]" />
        <Skeleton className="h-10 w-28 rounded-md bg-[#009FCC]" />
        <Skeleton className="h-10 w-28 rounded-md bg-[#009FCC]" />
        <Skeleton className="h-10 w-28 rounded-md bg-[#009FCC]" />
        <Skeleton className="h-10 w-28 rounded-md bg-[#009FCC]" />
        <Skeleton className="h-10 w-28 rounded-md bg-[#009FCC]" />
      </div>
      <main className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40 w-full rounded-lg bg-[#27272A]" />
        <Skeleton className="h-40 w-full rounded-lg bg-[#27272A]" />
        <Skeleton className="h-40 w-full rounded-lg bg-[#27272A]" />
        <Skeleton className="col-span-full h-96 w-full rounded-lg bg-[#27272A]" />
      </main>
    </div>
  )
}
