/**
 * Skeleton Loaders - Swiss Style
 * Loading states para componentes lazy-loaded
 */

export function LiveChatSkeleton() {
  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <div className="w-14 h-14 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse shadow-lg"></div>
    </div>
  );
}
