import React, { useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import ColorPopover from './ColorPopover';

const SettingsButton = ({ buttonName, type, colors = [], Icon,  isSelected }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen((prev) => !prev);

  const popoverTrigger = (
    <Button
      variant="unstyled"
      p="2"
      h="auto"
      pos="relative"
      _hover={{ opacity: 1 }}
      opacity={isSelected ? 1 : 0.4}
      _focus={{ outline: 'none' }}
      onClick={togglePopover}
    >
      <Flex direction="column" align="center">
      <Icon fontSize="26px" color="gray.600" _dark={{ color: 'gray.300' }} />
        <Text fontSize="sm" fontWeight="normal" variant="subtle" mt="2">
          {buttonName}
        </Text>
      </Flex>
    </Button>
  );

  return (
    <>
      <ColorPopover
        colors={colors} // Ensure this is passed correctly
        heading = {type==="solid" ? "Choose a color" : "Gradient Colors"}
        type={type}
        isOpen={isPopoverOpen}
        onClose={togglePopover}
        trigger={popoverTrigger}
      />
    </>
  );
};

export default SettingsButton;
