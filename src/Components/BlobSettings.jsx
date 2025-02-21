import React from 'react';
import {
  Box, Button, Divider, HStack, Card, CardHeader, CardBody, Heading, useClipboard
} from '@chakra-ui/react';
import { RiFileCopyFill } from "react-icons/ri";
import RandomnessSlider from './RandomnessSlider';
import ComplexitySlider from './ComplexitySlider';
import OpacitySlider from './OpacitySlider';
import BlobColorPicker from './BlobColorPicker';
import BlobOutline from './BlobOutline';
import BlobImage from './BlobImage';
import { useBlob } from './BlobContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Use a style of your choice

const BlobSettings = () => {
  const {
    svgPath,
    color,
    isGradient,
    gradientColors,
    showOutline,
    outlineWeight,
    outlineType,
    fillOpacity,
    imageUrl
  } = useBlob();

  // Generate complete SVG code based on current blob state
  const generateSvgCode = () => {
    let svgCode = '';
    
    // Convert special characters to HTML entities
    const escapeHTML = (str) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    // Start building the SVG code
    svgCode += `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">\n`;
    
    // Add defs section if needed (for gradients or patterns)
    if (isGradient || imageUrl) {
      svgCode += `  <defs>\n`;
      
      if (isGradient) {
        svgCode += `    <linearGradient id="blobGradient" gradientTransform="rotate(45)">\n`;
        svgCode += `      <stop offset="0%" stop-color="${escapeHTML(gradientColors[0])}" stop-opacity="${fillOpacity}"/>\n`;
        svgCode += `      <stop offset="100%" stop-color="${escapeHTML(gradientColors[1])}" stop-opacity="${fillOpacity}"/>\n`;
        svgCode += `    </linearGradient>\n`;
      }
      
      if (imageUrl) {
        svgCode += `    <pattern id="blobPattern" patternUnits="userSpaceOnUse" width="100%" height="100%">\n`;
        svgCode += `      <image href="${escapeHTML(imageUrl)}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/>\n`;
        svgCode += `    </pattern>\n`;
      }
      
      svgCode += `  </defs>\n`;
    }
    
    // Add the path element with all current attributes
    svgCode += `  <path\n`;
    svgCode += `    d="${escapeHTML(svgPath)}"\n`;
    
    // Add fill attribute
    if (imageUrl) {
      svgCode += `    fill="url(#blobPattern)"\n`;
    } else if (isGradient) {
      svgCode += `    fill="url(#blobGradient)"\n`;
    } else {
      svgCode += `    fill="${escapeHTML(color)}"\n`;
    }
    
    // Add opacity if not using gradient
    if (!isGradient) {
      svgCode += `    fill-opacity="${fillOpacity}"\n`;
    }
    
    // Add outline attributes if outline is enabled
    if (showOutline) {
      svgCode += `    stroke="${escapeHTML("#000000")}"\n`;
      svgCode += `    stroke-width="${escapeHTML(outlineWeight)}"\n`;
      if (outlineType === 'dashed') {
        svgCode += `    stroke-dasharray="10,5"\n`;
      } else if (outlineType === 'dotted') {
        svgCode += `    stroke-dasharray="2,2"\n`;
      }
    }
    
    svgCode += `  />\n`;
    svgCode += `</svg>`;
    
    return svgCode;
  };

  const svgCode = generateSvgCode();
  const { hasCopied, onCopy } = useClipboard(svgCode); // Use useClipboard hook

  return (
    <Box px={{ lg: 10 }} mt={2}>
      <RandomnessSlider />
      <ComplexitySlider />
      <OpacitySlider />
      <Divider my="5" />
      <HStack justifyContent="center" alignItems="center">
        <BlobColorPicker type="solid" />
        <BlobColorPicker type="gradient" />
        <BlobImage />
        <BlobOutline />
      </HStack>

      <Divider my="5" />

      <Card>
        <CardHeader pt={2}>
          <HStack justifyContent="space-between">
            <Heading size="sm">SVG Code:</Heading>
            <Button 
              bg="gray.600" 
              color="white"
              _hover={{ bg: "gray.700", color:"white" }} 
              size="md" 
              onClick={onCopy}>
                <RiFileCopyFill style={{ marginRight: "8px" }} />
              {hasCopied ? 'Copied' : 'Copy Code'}
            </Button>
          </HStack>
        </CardHeader>
        <CardBody pt={2}>
          <SyntaxHighlighter language="xml" style={atelierForestLight}>
            {svgCode}
          </SyntaxHighlighter>
        </CardBody>
      </Card>

      <Divider mt="5" />
    </Box>
  );
};

export default BlobSettings;
