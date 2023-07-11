import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = React.ComponentPropsWithoutRef<'div'>;

const OuterContainer = forwardRef<HTMLDivElement, ContainerProps>(
  function OuterContainer(
    { className, children, ...props },
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <div ref={ref} className={twMerge('sm:px-8', className)} {...props}>
        <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
      </div>
    );
  }
);

const InnerContainer = forwardRef<HTMLDivElement, ContainerProps>(
  function InnerContainer(
    { className, children, ...props },
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <div
        ref={ref}
        className={twMerge('relative px-4 sm:px-8 lg:px-12', className)}
        {...props}
      >
        <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    );
  }
);

export const ContainerComponent = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { children, ...props }: PropsWithChildren,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <OuterContainer ref={ref} {...props}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    );
  }
);

export const Container = Object.assign(ContainerComponent, {
  Outer: OuterContainer,
  Inner: InnerContainer,
});
