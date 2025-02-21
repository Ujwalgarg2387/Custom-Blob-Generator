import React, { useState, useEffect } from 'react';
import {
  Box,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  HStack,
  Divider,
  Text,
  Input,
  PopoverTrigger
} from '@chakra-ui/react';
import { useBlob } from './BlobContext';

const ColorPopover = ({ colors = [], heading, type, isOpen, onClose, trigger }) => {
  const { color, gradientColors, setColor, setGradientColors } = useBlob();
  const [selectedSolidColor, setSelectedSolidColor] = useState(color);
  const [selectedGradient, setSelectedGradient] = useState(gradientColors);

  useEffect(() => {
    setSelectedSolidColor(color);
  }, [color]);

  useEffect(() => {
    setSelectedGradient(gradientColors);
  }, [gradientColors]);

  // Function to handle selecting solid or gradient color
  const handleSelectColor = (selectedColor) => {
    if (Array.isArray(selectedColor)) {
      setSelectedGradient(selectedColor);
      setGradientColors(selectedColor);
    } else {
      setSelectedSolidColor(selectedColor);
      setColor(selectedColor);
    }
  };

  // Handle color input changes
  const handleSolidColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedSolidColor(newColor);
    setColor(newColor);
  };

  const handleGradientColorChange = (index, newColor) => {
    const newGradient = [...selectedGradient];
    newGradient[index] = newColor;
    setSelectedGradient(newGradient);
    setGradientColors(newGradient);
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={true}>
      <PopoverTrigger>
        {React.Children.only(trigger)}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{heading}</PopoverHeader>
        <PopoverBody>
          <HStack spacing={4} mt={3} justify="center">
            {colors.map((color) => (
              <Box
                key={Array.isArray(color) ? color.join('-') : color}
                width="30px"
                height="30px"
                borderRadius="md"
                cursor="pointer"
                bg={Array.isArray(color) ? `linear-gradient(45deg, ${color[0]}, ${color[1]})` : color}
                onClick={() => handleSelectColor(color)}
                _hover={{ transform: 'scale(1.1)' }}
                transition="transform 0.2s"
              />
            ))}
          </HStack>
          <Divider my={4} />
          {type === 'gradient' ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <HStack spacing={4} mt={1}>
                <HStack spacing={5}>
                  <Text>{selectedGradient[0]}</Text>
                  <Input
                    type="color"
                    value={selectedGradient[0]}
                    onChange={(e) => handleGradientColorChange(0, e.target.value)}
                    width="50px"
                    height="30px"
                    padding="0"
                  />
                </HStack>
                <HStack spacing={4}>
                  <Text>{selectedGradient[1]}</Text>
                  <Input
                    type="color"
                    value={selectedGradient[1]}
                    onChange={(e) => handleGradientColorChange(1, e.target.value)}
                    width="50px"
                    height="30px"
                    padding="0"
                  />
                </HStack>
              </HStack>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text>Selected Color: {selectedSolidColor}</Text>
              <Input
                type="color"
                value={selectedSolidColor}
                onChange={handleSolidColorChange}
                width="50px"
                height="30px"
                padding="0"
              />
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPopover;