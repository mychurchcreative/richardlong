import { RiPriceTag3Line } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

import slug from '../objects/slug';

export default defineType({
  name: 'tagTaxonomy',
  title: 'Tag',
  icon: RiPriceTag3Line,
  type: 'document',
  fields: [defineField({ name: 'title', type: 'string' }), slug('tag')],
});
