import { twMerge } from 'tailwind-merge';

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge(className, 'prose dark:prose-invert')}>
      {children}
    </div>
  );
}
