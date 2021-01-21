import React from 'react';

import { Flex } from "@chakra-ui/react"

type Props = React.ComponentProps<typeof Flex>;
export const Layout: React.FC<Props> = ({ children, ...props }) => (
  <Flex
    w="100%"
    minH="100vh"
    direction="column"
    align="center"
    bgColor="bg_neu"
  >
    {children}
  </Flex>
);

export default Layout;
