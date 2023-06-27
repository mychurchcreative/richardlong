import { Badge, Inline, Stack } from '@sanity/ui';
import { useMemo } from 'react';
import type { FieldProps, StringFieldProps } from 'sanity';

export const TextInputWithCharCount = ({
  min = 0,
  max = 0,
  renderDefault,
  ...props
}: FieldProps & {
  min?: number;
  max?: number;
}) => {
  const { inputProps } = props;
  const value = (inputProps.value as StringFieldProps['value']) || '';

  const tooManyCharacters = max + 10;

  const handleTone = useMemo(() => {
    if (max) {
      return value.length < min
        ? undefined
        : value.length >= min && value.length <= max
        ? 'positive'
        : value.length > max && value.length < tooManyCharacters
        ? 'caution'
        : 'critical';
    }
    return 'default';
  }, [value, min, max, tooManyCharacters]);
  return (
    <Stack space={2}>
      {renderDefault({ ...props, renderDefault })}
      <Inline>
        <Badge mode="outline" tone={handleTone} padding={2} radius={6}>
          {!max ? 'Characters: ' : ''}
          {value?.length || 0}
          {max ? ` / ${max}` : ''}
        </Badge>
      </Inline>
    </Stack>
  );
};
