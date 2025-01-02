import type { Meta, StoryObj } from '@storybook/react';
import { borderStyle, backgroundStyle, backgroundHoverStyle, textHoverStyle, textStyle, MessageType } from './MessageType';

const isColorDark = (hex: string): boolean => {
  // Remove the hash if it exists
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate relative luminance
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 180;
};

const ColorPalette = () => {
  const styleGroups = {
    'Text Colors': textStyle,
    'Text Hover Colors': textHoverStyle,
    'Border Colors': borderStyle,
    'Background Colors': backgroundStyle,
    'Hover Background Colors': backgroundHoverStyle,
  } as const;

  const colorGroups = Object.entries(styleGroups).map(([title, styles]) => ({
    title,
    colors: Object.entries(styles).map(([type, style]) => ({
      name: type,
      className: style.tailwindClass,
      hex: style.hex,
    })),
  }));

  return (
    <div className="space-y-8">
      {/* Combined styles section */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium mb-3">All Together</h3>
        <div className="flex">
          {(Object.keys(textStyle) as MessageType[]).map((type) => (
            <div
              key={type}
              className={`flex-1 p-4 ${borderStyle[type as MessageType].tailwindClass} border-2 
                ${backgroundStyle[type as MessageType].tailwindClass} 
                ${backgroundHoverStyle[type as MessageType].tailwindClass}`}
            >
              <div className={`${textStyle[type as MessageType].tailwindClass} 
                ${textHoverStyle[type as MessageType].tailwindClass}`}>
                {type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {colorGroups.map((group) => (
        <div key={group.title} className="space-y-2">
          <h3 className="text-lg font-medium mb-3">{group.title}</h3>
          <div className="flex">
            {group.colors.map((color) => (
              <div
                key={color.name}
                className="flex-1"
                style={{ backgroundColor: color.hex }}
              >
                <div className="p-2 text-xs backdrop-blur-sm flex flex-col gap-0.5">
                  <div className={`font-medium ${
                    isColorDark(color.hex) ? 'text-black' : 'text-white'
                  }`}>{color.name}</div>
                  <div className={`text-[10px] ${
                    isColorDark(color.hex) ? 'text-black' : 'text-white'
                  }`}>{color.className}</div>
                  <div className={`mt-1 font-mono ${
                    isColorDark(color.hex) ? 'text-black' : 'text-white'
                  }`}>{color.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const meta: Meta = {
  title: 'UI/Color Palette',
  component: ColorPalette,
};
  
export default meta;
type Story = StoryObj<typeof ColorPalette>;
  
export const Colors: Story = {
  render: ColorPalette,
};
