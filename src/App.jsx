import React from 'react';
import './App.css';
import { Button, ChakraProvider } from '@chakra-ui/react';
import BlobSettings from './Components/BlobSettings';
import { BlobProvider, useBlob } from './Components/BlobContext';
import Blob from './Components/Blob';

function AppHeader() {
  const { color, isGradient, gradientColors } = useBlob();

  const headerStyle = isGradient
    ? {
        backgroundImage: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
      }
    : {
        backgroundColor: color,
      };
  
  return (
    <header
      style={headerStyle}
      className="text-xl md:text-2xl text-white text-center py-3 sm:py-4 fixed w-full top-0 shadow-lg z-10"
    >
      <h1 className="font-bold">Custom Blob Generation</h1>
    </header>
  );
}
function RandomBlobFunction() {
  const { color, isGradient, gradientColors, regenerateRandomBlob } = useBlob();

  const buttonStyle = isGradient
    ? `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`
    : color;

  return (
    <Button 
      bg={buttonStyle}
      color="#fff"
      opacity="88%"
      size={{ base: "md", sm: "lg" }}
      _hover={{opacity:"100%", bg:{buttonStyle}}}
      width={{ base: "120px", sm: "150px" }}
      marginBottom={{base: "8px"}}
      mt={4}
      onClick={regenerateRandomBlob} // Call regenerateRandomBlob to generate a new blob
    >
      Random Blob
    </Button>
  );
}


function App() {
  return (
    <BlobProvider>
      <ChakraProvider>
        <div className="min-h-screen w-full">
          <AppHeader />
          <div className="flex flex-col md:flex-row justify-between items-start px-2 sm:px-4 pt-16 sm:pt-20 gap-4">
            {/* Blob Preview */}
            <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-2 sm:p-4 flex flex-col justify-center items-center">
              <Blob />
              <RandomBlobFunction/>
            </div>

            {/* Blob Controls */}
            <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-2 sm:p-4 mb-4 md:mb-0 overflow-y-auto">
              <BlobSettings />
            </div>
          </div>
        </div>
      </ChakraProvider>
    </BlobProvider>
  );
}


export default App;