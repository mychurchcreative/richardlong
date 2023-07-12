import { PortableText } from '@portabletext/react';
import React from 'react';

import { RichText } from '~/types/richText';

import { RichTextComponents } from './components';

const RichText = ({ richText }: { richText: RichText; index?: number }) => {
  const value = React.useMemo(() => richText, [richText]);

  return (
    <div>
      {value ? (
        <PortableText value={value} components={RichTextComponents} />
      ) : null}
    </div>
  );
};

export { RichText };
