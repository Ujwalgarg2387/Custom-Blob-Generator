import generator from 'blobshape';

// Default blob configuration
export const DEFAULT_BLOB_CONFIG = {
  size: 500,
  growth: 6,
  edges: 6,
  seed: null,
  fillOpacity: 1,
  color: '#3182CE'
};

export const generateBlob = (props) => {
  return generator({ ...DEFAULT_BLOB_CONFIG, ...props, size: 500 });
};

export const createRandomBlob = (props) => {
  const { path: svgPath, seedValue: seed } = generateBlob({
    ...props,
    seed: null,
  });
  return { svgPath, seed };
};

export const createFixedBlob = (props) => {
  const { path: svgPath } = generateBlob(props);
  return { svgPath };
};