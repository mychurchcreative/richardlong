import { Box, Flex, Text } from '@sanity/ui';
import type { SlugInputProps } from 'sanity';

export function SlugInput(props: SlugInputProps, prefix?: string) {
  return (
    <>
      <Flex align="center">
        <Text>{prefix ? <Text size={1}>{prefix}/</Text> : null}</Text>
        <Box flex={1} paddingLeft={2}>
          {props.renderDefault(props)}
        </Box>
      </Flex>
    </>
  );
}
