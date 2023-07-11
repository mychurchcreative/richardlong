export const DetailsPopup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute right-0 top-full z-20 mt-2 w-36  group rounded-lg bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20">
      {children}
    </div>
  );
};
