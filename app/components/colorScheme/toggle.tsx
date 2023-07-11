import { Form, useLocation } from '@remix-run/react';
import React from 'react';
import { TbDeviceImac, TbMoon, TbSun } from 'react-icons/tb';

import { useColorScheme } from '~/lib/color-scheme';

import { DetailsMenu } from '../detailsMenu';
import { DetailsPopup } from '../detailsPopUp';

function ColorSchemeToggle() {
  let location = useLocation();

  return (
    <DetailsMenu className="relative cursor-pointer">
      <summary className="flex _no-triangle group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10">
        <TbSun
          className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden dark:fill-teal-50 dark:stroke-teal-500 dark:group-hover:fill-teal-50 dark:group-hover:stroke-teal-600"
          size={24}
        />
        <TbMoon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block dark:group-hover:fill-teal-400/50 dark:fill-teal-400/30 dark:stroke-teal-500" />
      </summary>
      <DetailsPopup>
        <Form
          replace
          action="/color-scheme"
          method="post"
          preventScrollReset
          className="p-2"
        >
          <input
            type="hidden"
            name="returnTo"
            value={location.pathname + location.search}
          />
          <ColorSchemeButton
            icon={<TbSun color="currentColor" />}
            label="Light"
            value="light"
            name="colorScheme"
          />
          <ColorSchemeButton
            icon={<TbMoon color="currentColor" />}
            label="Dark"
            value="dark"
            name="colorScheme"
          />
          <ColorSchemeButton
            icon={<TbDeviceImac color="currentColor" />}
            label="System"
            value="system"
            name="colorScheme"
          />
        </Form>
      </DetailsPopup>
    </DetailsMenu>
  );
}

const ColorSchemeButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<'button'> & {
    icon: React.ReactNode;
    label: string;
  }
>(({ icon, label, ...props }, forwardedRef) => {
  let colorScheme = useColorScheme();
  return (
    <button
      {...props}
      ref={forwardedRef}
      disabled={colorScheme === props.value}
      className={`flex w-full items-center gap-4 px-4 py-1
        ${
          colorScheme === props.value
            ? 'text-teal-500 '
            : 'rounded-md  transition dark:text-zinc-100 '
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
});

ColorSchemeButton.displayName = 'ColorSchemeButton';

export { ColorSchemeToggle };
