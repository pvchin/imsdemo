import { Spinner, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useIsFetching } from '@tanstack/react-query';

export function Loading() {
  // will use React Query `useIsFetching` to determine whether or not to display
  const isFetching = useIsFetching();

  const display = isFetching ? 'inherit' : 'none';

  return (
    <Spinner
      size="xl"
      thickness="4px"
      speed="0.65s"
      emptyColor="teal.200"
      color="teal.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
