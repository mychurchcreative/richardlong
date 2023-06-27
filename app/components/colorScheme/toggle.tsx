import { Form, useLocation } from '@remix-run/react';
import React from 'react';
import { TbDeviceImac, TbMoon, TbSun } from 'react-icons/tb';

import { useColorScheme } from '~/lib/color-scheme';

import { DetailsMenu } from '../detailsMenu';
import { DetailsPopup } from '../detailsPopUp';

function ColorSchemeToggle() {
  let location = useLocation();

  // This is the same default, hover, focus style as the VersionSelect
  const className =
    'border border-transparent transition-colors hover:bg-gray-200 focus:border focus:border-gray-100 dark:focus:border-transparent focus:bg-[var(--color-fill-card-button)] dark:bg-indigo-950 dark:hover:bg-indigo-900 ';

  return (
    <DetailsMenu className="relative cursor-pointer">
      <summary
        className={`_no-triangle focus:border-200 flex h-[40px] w-[40px] items-center justify-center rounded-full ${className}`}
      >
        <TbSun className="text-indigo-500 dark:hidden" size={24} />
        <TbMoon className="hidden text-indigo-300 dark:inline" />
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
  // TODO: replace useColorScheme with appropriate theme classes
  let colorScheme = useColorScheme();
  return (
    <button
      {...props}
      ref={forwardedRef}
      disabled={colorScheme === props.value}
      className={`flex w-full items-center gap-4 px-4 py-1
        ${
          colorScheme === props.value
            ? 'text-indigo-500 dark:text-white'
            : 'rounded-md text-gray-900  transition-colors hover:bg-gray-50 dark:text-indigo-300 dark:hover:bg-indigo-700'
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
