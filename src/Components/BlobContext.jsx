import React, { createContext, useContext, useState, useCallback } from 'react';
import { createRandomBlob, createFixedBlob, DEFAULT_BLOB_CONFIG } from './blobUtils';

const BlobContext = createContext();

export const BlobProvider = ({ children }) => {
  const [blobState, setBlobState] = useState({
    ...DEFAULT_BLOB_CONFIG,
    color: '#3182CE',
    isGradient: false,
    gradientColors: ['#e96443', '#904e95'],
    imageUrl: null,
    outlineWeight: '0',
    outlineType: 'solid',
    showOutline: false,
    fillOpacity: 1,
    svgPath: '',
    ...createRandomBlob(DEFAULT_BLOB_CONFIG)
  });

  const updateBlobSettings = useCallback((newSettings) => {
    setBlobState(prevState => {
      const updatedSettings = { ...prevState, ...newSettings };
      const newBlob = createFixedBlob(updatedSettings);
      return { ...updatedSettings, ...newBlob, svgPath: newBlob.svgPath || prevState.svgPath };
    });
  }, []);

  const setColor = useCallback((color) => {
    setBlobState(prevState => ({
      ...prevState,
      color,
      isGradient: false,
      imageUrl: null
    }));
  }, []);

  const setGradientColors = useCallback((colors) => {
    setBlobState(prevState => ({
      ...prevState,
      gradientColors: colors,
      isGradient: true,
      imageUrl: null
    }));
  }, []);

  const setImage = useCallback((url) => {
    setBlobState(prevState => ({
      ...prevState,
      imageUrl: url
    }));
  }, []);

  const clearImage = useCallback(() => {
    setBlobState(prevState => ({
      ...prevState,
      imageUrl: null
    }));
  }, []);

  const setOutlineSettings = useCallback((weight, type) => {
    setBlobState(prevState => ({
      ...prevState,
      outlineWeight: weight,
      outlineType: type,
      showOutline: true
    }));
  }, []);

  const clearOutline = useCallback(() => {
    setBlobState(prevState => ({
      ...prevState,
      outlineWeight: '0',
      outlineType: 'solid',
      showOutline: false
    }));
  }, []);

  const regenerateRandomBlob = useCallback(() => {
    setBlobState(prevState => {
      const newBlob = createRandomBlob(prevState);
      return { ...prevState, ...newBlob };
    });
  }, []);

  return (
    <BlobContext.Provider 
      value={{
        ...blobState,
        updateBlobSettings,
        regenerateRandomBlob,
        setColor,
        setGradientColors,
        setImage,
        clearImage,
        setOutlineSettings,
        clearOutline
      }}
    >
      {children}
    </BlobContext.Provider>
  );
};

export const useBlob = () => useContext(BlobContext);