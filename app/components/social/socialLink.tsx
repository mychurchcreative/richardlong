import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

// TODO: not sure what type to use for Icon
export function SocialLink({
  icon: Icon,
  className,
  ...props
}: { icon: any } & LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <li className={twMerge('group -m-1 p-1 group', className)}>
      <Link
        className="flex items-center gap-4  text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
        {...props}
      >
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
        {props.children}
      </Link>
    </li>
  );
}
