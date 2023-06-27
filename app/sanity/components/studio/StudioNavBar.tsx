import { Link } from '@remix-run/react';
import { Button, Card, Inline, Stack } from '@sanity/ui';
import { MdOutlineOpenInNew } from 'react-icons/md';
import type { NavbarProps } from 'sanity';

export default function StudioNavBar(props: NavbarProps) {
  return (
    <Stack>
      <Card tone="primary" padding={2}>
        <Inline>
          <Link to="/" target="_blank" style={{ textDecoration: 'none' }}>
            <Button
              fontSize={[1, 1, 1]}
              icon={<MdOutlineOpenInNew size={16} />}
              mode="ghost"
              padding={[3, 3, 2]}
              text="Go to Site"
            />
          </Link>
        </Inline>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  );
}
