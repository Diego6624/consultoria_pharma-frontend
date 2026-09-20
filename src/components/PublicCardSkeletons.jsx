function SkeletonBlock({ className = "" }) {
  return <span className={`block animate-pulse rounded bg-slate-200 ${className}`} />;
}

export function ServiceCardsSkeleton({ count = 12 }) {
  return (
    <section className="px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <article key={index} className="flex h-auto w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:h-full lg:min-h-[300px] lg:flex-row">
            <SkeletonBlock className="aspect-[4/3] w-full rounded-none md:aspect-square lg:h-auto lg:w-1/2 lg:aspect-auto" />
            <div className="flex w-full flex-col gap-4 p-6 lg:h-full lg:w-1/2">
              <SkeletonBlock className="h-5 w-24 rounded-full" />
              <SkeletonBlock className="h-7 w-4/5" />
              <SkeletonBlock className="h-1 w-12 bg-cyan-200" />
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-11/12" />
                <SkeletonBlock className="h-4 w-3/4" />
              </div>
              <SkeletonBlock className="mt-auto h-5 w-28 rounded-full" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ArticleCardsSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
          <SkeletonBlock className="h-48 w-full rounded-none" />
          <div className="space-y-4 p-4">
            <SkeletonBlock className="h-6 w-4/5" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-11/12" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        </article>
      ))}
    </div>
  );
}
