import { defineField } from 'sanity';

import { TextInputWithCharCount } from '~/sanity/components/inputs/TextInputWithCharCount';

export default defineField({
  name: 'title',
  title: 'Title',
  description:
    "Every page on your site should have a title that isn't too long or too short. The best page titles are between 10 and 65 characters and include keywords for which you want your page to rank.",
  type: 'string',
  validation: (Rule) => [Rule.required()],
  components: {
    field: (props) => <TextInputWithCharCount min={30} max={65} {...props} />,
  },
});
