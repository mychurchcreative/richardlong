import { useRootLoaderData } from '~/lib/helpers';

import { Container } from '../container';
import { InstagramIcon, LinkedInIcon, TwitterIcon } from '../social';
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
                  to="https://twitter.com"
                  aria-label="Follow on Twitter"
                  icon={TwitterIcon}
                />
                <SocialLink
                  to="https://instagram.com"
                  aria-label="Follow on Instagram"
                  icon={InstagramIcon}
                />
                <SocialLink
                  to="https://linkedin.com"
                  aria-label="Follow on LinkedIn"
                  icon={LinkedInIcon}
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
