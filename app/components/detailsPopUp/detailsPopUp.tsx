export const DetailsPopup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-gray-100 bg-white py-2 shadow-lg dark:border-transparent dark:bg-indigo-950 dark:focus:border-transparent ">
      {children}
    </div>
  );
};
