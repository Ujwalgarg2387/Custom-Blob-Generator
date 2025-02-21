import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useBlob } from './BlobContext';

const Blob = () => {
  const {
    svgPath,
    fillOpacity,
    color,
    isGradient,
    gradientColors = ['#3182CE', '#63B3ED'],
    showOutline,
    outlineWeight,
    outlineType,
    imageUrl
  } = useBlob();
  
  const svgRef = useRef();

  useEffect(() => {
    if (!svgPath) return;

    const svg = svgRef.current;
    svg.innerHTML = ''; // Clear previous content
    
    // Create the blob path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', svgPath);

    if (imageUrl) {
      // Create pattern for image filling
      const patternId = 'blobPattern';
      const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
      pattern.setAttribute('id', patternId);
      pattern.setAttribute('patternUnits', 'userSpaceOnUse');
      pattern.setAttribute('width', '100%');
      pattern.setAttribute('height', '100%');
      
      const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      image.setAttribute('href', imageUrl);
      image.setAttribute('width', '100%');
      image.setAttribute('height', '100%');
      image.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      
      pattern.appendChild(image);
      svg.appendChild(pattern);
      
      path.setAttribute('fill', `url(#${patternId})`);
      path.setAttribute('fill-opacity', fillOpacity);
    }
    else if (isGradient) {
      // Create gradient
      const gradientId = 'blobGradient';
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.setAttribute('id', gradientId);
      gradient.setAttribute('gradientTransform', 'rotate(45)');
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', gradientColors[0]);
      stop1.setAttribute('stop-opacity', fillOpacity);
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', gradientColors[1]);
      stop1.setAttribute('stop-opacity', fillOpacity);
      
      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      svg.appendChild(gradient);
      
      path.setAttribute('fill', `url(#${gradientId})`);
    } else {
      path.setAttribute('fill', color);
      path.setAttribute('fill-opacity', fillOpacity);
    }
    
    
    if (showOutline) {
      path.setAttribute('stroke', '#000000');
      path.setAttribute('stroke-width', outlineWeight);
      path.setAttribute('stroke-dasharray', outlineType === 'dashed' ? '10,5' : 
                                          outlineType === 'dotted' ? '2,2' : 
                                          'none');
      if (outlineType === 'double') {
        path.setAttribute('stroke-width', outlineWeight);
        const outerPath = path.cloneNode();
        outerPath.setAttribute('stroke-width', String(parseFloat(outlineWeight) * 2));
        outerPath.setAttribute('stroke-opacity', '0.5');
        svg.appendChild(outerPath);
      }
    }
    
    svg.appendChild(path);
  }, [svgPath, fillOpacity, color, isGradient, gradientColors, showOutline, outlineWeight, outlineType, imageUrl]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={8}>
      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        width="500"
        height="500"
        xmlns="http://www.w3.org/2000/svg"
      />
    </Box>
  );
};

export default Blob;