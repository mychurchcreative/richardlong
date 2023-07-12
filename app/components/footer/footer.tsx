import { RiFacebookFill } from 'react-icons/ri';

import { useRootLoaderData } from '~/lib/helpers';

import { Container } from '../container';
import { TwitterIcon } from '../social';
import { SocialLink } from '../social/socialLink';

export function Footer() {
  const { siteTitle } = useRootLoaderData();
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <ul className="flex gap-6">
                <SocialLink
                  to="https://www.facebook.com/profile.php?id=100076390248419"
                  aria-label="Follow on Facebook"
                  icon={RiFacebookFill}
                  target="_blank"
                />
                <SocialLink
                  to="https://twitter.com/richardlongsr"
                  aria-label="Follow on Twitter"
                  icon={TwitterIcon}
                  target="_blank"
                />
              </ul>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} {siteTitle}. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
