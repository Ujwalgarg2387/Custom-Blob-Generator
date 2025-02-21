import React from 'react';
import SettingsButton from './SettingsButtons';
import { RiPaintFill } from 'react-icons/ri';
import { VscSymbolColor } from 'react-icons/vsc';

const solidColors = [
  '#fab1a0',
  '#00cec9',
  '#fdcb6e',
  '#fd79a8',
  '#a29bfe',
  '#B53471',
];
const gradientColors = [
  ['#e96443', '#904e95'],
  ['#ff5f6d', '#ffc371'],
  ['#eecda3', '#ef629f'],
  ['#4ca1af', '#c4e0e5'],
  ['#c2e59c', '#64b3f4'],
  ['#3ca55c', '#b5ac49'],
];

const BlobColorPicker = ({ type }) => {
  return (
    <>
      {type === 'solid' ? (
        <SettingsButton
          buttonName="Color"
          type={type}
          Icon={RiPaintFill}
          isSelected={true}
          colors={solidColors}
        />
      ) : (
        <SettingsButton
          buttonName="Gradient"
          type={type}
          Icon={VscSymbolColor}
          isSelected={true}
          colors={gradientColors}
        />
      )}
    </>
  );
};

export default BlobColorPicker;