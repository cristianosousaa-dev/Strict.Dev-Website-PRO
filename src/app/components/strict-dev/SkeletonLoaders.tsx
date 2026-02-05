/**
 * Skeleton Loaders - Swiss Style
 * Loading states para componentes lazy-loaded
 */

export function LiveChatSkeleton() {
  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <div className="w-14 h-14 bg-slate-200 rounded-full animate-pulse shadow-lg"></div>
    </div>
  );
}

export function LeadMagnetSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Skeleton */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl h-20 flex items-center justify-between">
          <div className="h-16 w-48 bg-slate-200 animate-pulse"></div>
          <div className="h-10 w-32 bg-slate-200 animate-pulse rounded-none"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl py-12 md:py-16">
        <div className="space-y-6">
          {/* Title */}
          <div className="h-8 bg-slate-200 animate-pulse w-3/4"></div>
          <div className="h-4 bg-slate-200 animate-pulse w-full"></div>
          <div className="h-4 bg-slate-200 animate-pulse w-5/6"></div>

          {/* Form */}
          <div className="mt-10 space-y-4">
            <div className="h-12 bg-slate-200 animate-pulse rounded-none"></div>
            <div className="h-12 bg-slate-200 animate-pulse rounded-none"></div>
            <div className="h-12 bg-slate-200 animate-pulse rounded-none"></div>
            <div className="h-12 bg-slate-200 animate-pulse rounded-none mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebinarSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Skeleton */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl h-20 flex items-center justify-between">
          <div className="h-16 w-48 bg-slate-200 animate-pulse"></div>
          <div className="h-10 w-32 bg-slate-200 animate-pulse rounded-none"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12 md:py-16">
        <div className="space-y-6">
          {/* Title */}
          <div className="h-10 bg-slate-200 animate-pulse w-3/4"></div>
          <div className="h-4 bg-slate-200 animate-pulse w-full"></div>
          <div className="h-4 bg-slate-200 animate-pulse w-5/6"></div>

          {/* Video placeholder */}
          <div className="aspect-video bg-slate-200 animate-pulse mt-8"></div>

          {/* Registration form */}
          <div className="mt-10 space-y-4">
            <div className="h-12 bg-slate-200 animate-pulse rounded-none"></div>
            <div className="h-12 bg-slate-200 animate-pulse rounded-none"></div>
            <div className="h-12 bg-slate-200 animate-pulse rounded-none mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
