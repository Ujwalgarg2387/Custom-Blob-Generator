import React, { useState } from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Box,
  Container,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useBlob } from './BlobContext';

const ComplexitySlider = () => {
  const { edges, updateBlobSettings, color, isGradient, gradientColors } = useBlob();
  const [showTooltip, setShowTooltip] = useState(false);
  
  const trackBackground = isGradient
  ? `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`
  : color;

  const thumbBorderColor = isGradient ? gradientColors[0] : color;

  return (
    <Box my={{ base: 4, sm: 8 }}>
      <Container centerContent maxW={{ base: "100%", sm: "sm" }} px={{ base: 2, sm: 4 }}>
        <Flex justify="space-between" w="100%" mb="2">
          <Text fontSize={{ base: "xs", sm: "sm" }} variant="subtle">
            Complexity
          </Text>
          <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.500">
            {edges}
          </Text>
        </Flex>
        <Slider
          value={edges}
          min={3}
          max={20}
          step={1}
          onChange={(val) => updateBlobSettings({ edges: val })}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderTrack bg={trackBackground} opacity="60%">
            <SliderFilledTrack bg={trackBackground} opacity="60%"/>
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="blue.500"
            color="white"
            placement="bottom"
            isOpen={showTooltip}
            label={edges}
          >
            <SliderThumb
              boxSize={{ base: 4, sm: 5 }}
              borderWidth="3px"
              borderColor={thumbBorderColor}
              bg="white"
            />
          </Tooltip>
        </Slider>
      </Container>
    </Box>
  );
};

export default ComplexitySlider;