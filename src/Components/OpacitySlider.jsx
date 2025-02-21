import React from 'react';
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

const OpacitySlider = () => {
  const { fillOpacity, updateBlobSettings, color, isGradient, gradientColors } = useBlob();
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleOpacityChange = (value) => {
    const opacity = value / 100;
    updateBlobSettings({ fillOpacity: opacity });
  };

  const sliderValue = Math.round(fillOpacity * 100);

  const trackBackground = isGradient
  ? `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`
  : color;

  const thumbBorderColor = isGradient ? gradientColors[0] : color;

  return (
    <Box my={{ base: 4, sm: 8 }}>
      <Container centerContent maxW={{ base: "100%", sm: "sm" }} px={{ base: 2, sm: 4 }}>
        <Flex justify="space-between" w="100%" mb="2">
          <Text fontSize={{ base: "xs", sm: "sm" }} variant="subtle">
            Opacity
          </Text>
          <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.500">
            {sliderValue}%
          </Text>
        </Flex>
        <Slider
          value={sliderValue}
          min={0}
          max={100}
          step={1}
          onChange={handleOpacityChange}
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
            label={`${sliderValue}%`}
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

export default OpacitySlider;