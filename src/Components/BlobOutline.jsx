import React, { useState } from 'react';
import { IoMdSquareOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";

import {
  Button,
  Flex,
  Text,
  Popover,
  PopoverBody,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverArrow,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box
} from '@chakra-ui/react';
import { useBlob } from './BlobContext';

const BlobOutline = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState('1px');
  const [selectedType, setSelectedType] = useState('solid');
  const { setOutlineSettings, clearOutline } = useBlob();

  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
    setOutlineSettings(weight, selectedType);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setOutlineSettings(selectedWeight, type);
  };

  const handleClearOutline = () => {
    clearOutline();
    setSelectedWeight('1px');
    setSelectedType('solid');
  };

  const popoverTrigger = (
    <Button
      variant="unstyled"
      p="2"
      h="auto"
      pos="relative"
      _hover={{ opacity: 1 }}
      _focus={{ outline: 'none' }}
      onClick={togglePopover}
    >
      <Flex direction="column" align="center">
        <IoMdSquareOutline fontSize="26px" color="gray.600" />
        <Text fontSize="sm" fontWeight="normal" variant="subtle" mt="2">
          Outline
        </Text>
      </Flex>
    </Button>
  );

  const menuListStyles = {
    minW: 'unset',
    w: '120px'
  };

  const menuItemStyles = {
    px: 3,
    py: 2
  };

  return (
    <Popover isOpen={isPopoverOpen} onClose={togglePopover} closeOnBlur={true}>
      <PopoverTrigger>
        {React.Children.only(popoverTrigger)}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Blob Outlines</PopoverHeader>
        <PopoverBody>
          <VStack spacing="4">
            <HStack spacing="6">
              <Menu>
                <MenuButton as={Button} rightIcon={<FaAngleDown />} size="sm">
                  Weight
                </MenuButton>
                <MenuList sx={menuListStyles}>
                  <MenuItem onClick={() => handleWeightChange('1px')} sx={menuItemStyles}>
                    <Box borderBottom="2px solid" width="100%" />
                  </MenuItem>
                  <MenuItem onClick={() => handleWeightChange('3px')} sx={menuItemStyles}>
                    <Box borderBottom="4px solid" width="100%" />
                  </MenuItem>
                  <MenuItem onClick={() => handleWeightChange('5px')} sx={menuItemStyles}>
                    <Box borderBottom="6px solid" width="100%" />
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton as={Button} rightIcon={<FaAngleDown />} size="sm">
                  Type
                </MenuButton>
                <MenuList sx={menuListStyles}>
                  <MenuItem onClick={() => handleTypeChange('solid')} sx={menuItemStyles}>
                    <Box borderBottom="2px solid" width="100%" />
                  </MenuItem>
                  <MenuItem onClick={() => handleTypeChange('dotted')} sx={menuItemStyles}>
                    <Box borderBottom="2px dotted" width="100%" />
                  </MenuItem>
                  <MenuItem onClick={() => handleTypeChange('dashed')} sx={menuItemStyles}>
                    <Box borderBottom="2px dashed" width="100%" />
                  </MenuItem>
                  <MenuItem onClick={() => handleTypeChange('double')} sx={menuItemStyles}>
                    <Box borderBottom="4px double" width="100%" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Button colorScheme="red" variant="outline" onClick={handleClearOutline} size="sm">
              Clear Outline
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BlobOutline;