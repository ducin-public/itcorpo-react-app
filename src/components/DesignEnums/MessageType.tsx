import { Info, CheckCircle2, AlertTriangle, Bell, Calendar, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Certain message types match their UI use-cases:
 * - DEFAULT: General information, standard messages
 * - ACCENT: Highlighted information, tips, updates, suggestions, etc. This is the primary color for emphasizing information
 * - SUCCESS: Confirmation messages of successful operations
 * - WARNING: Non-critical alerts or warnings
 * - ALERT: Critical alerts or errors
 */
export type MessageType = 'DEFAULT' | 'ACCENT' | 'SUCCESS' | 'WARNING' | 'ALERT' | 'UPDATE';

type ColorDictionary = {
  [key in MessageType]: string
};

export const mainColor: ColorDictionary = {
  DEFAULT: 'gray',
  ACCENT: 'purple',
  SUCCESS: 'green',
  WARNING: 'orange',
  ALERT: 'red',
  UPDATE: 'blue',
};

type StyleDictionary = {
  [key in MessageType]: {
    hex: string;
    tailwindClass: string;
  };
};

export const textStyle: StyleDictionary = {
  DEFAULT: { hex: '#1F2937', tailwindClass: 'text-gray-800' },
  ACCENT: { hex: '#9333EA', tailwindClass: 'text-purple-600' },
  SUCCESS: { hex: '#16A34A', tailwindClass: 'text-green-600' },
  WARNING: { hex: '#EA580C', tailwindClass: 'text-orange-600' },
  ALERT: { hex: '#DC2626', tailwindClass: 'text-red-600' },
  UPDATE: { hex: '#2563EB', tailwindClass: 'text-blue-600' },
};

export const textDarkStyle: StyleDictionary = {
  DEFAULT: { hex: '#111827', tailwindClass: 'text-gray-900' },
  ACCENT: { hex: '#6B21A8', tailwindClass: 'text-purple-800' },
  SUCCESS: { hex: '#166534', tailwindClass: 'text-green-800' },
  WARNING: { hex: '#9A3412', tailwindClass: 'text-orange-800' },
  ALERT: { hex: '#991B1B', tailwindClass: 'text-red-800' },
  UPDATE: { hex: '#1E40AF', tailwindClass: 'text-blue-800' },
};

export const textHoverStyle: StyleDictionary = {
  DEFAULT: { hex: '#6B7280', tailwindClass: 'hover:text-gray-500' },
  ACCENT: { hex: '#A855F7', tailwindClass: 'hover:text-purple-500' },
  SUCCESS: { hex: '#22C55E', tailwindClass: 'hover:text-green-500' },
  WARNING: { hex: '#F97316', tailwindClass: 'hover:text-orange-500' },
  ALERT: { hex: '#EF4444', tailwindClass: 'hover:text-red-500' },
  UPDATE: { hex: '#3B82F6', tailwindClass: 'hover:text-blue-500' },
};

export const textHoverLightStyle: StyleDictionary = {
  DEFAULT: { hex: '#E5E7EB', tailwindClass: 'hover:text-gray-200' },
  ACCENT: { hex: '#E9D5FF', tailwindClass: 'hover:text-purple-200' },
  SUCCESS: { hex: '#BBF7D0', tailwindClass: 'hover:text-green-200' },
  WARNING: { hex: '#FED7AA', tailwindClass: 'hover:text-orange-200' },
  ALERT: { hex: '#FECACA', tailwindClass: 'hover:text-red-200' },
  UPDATE: { hex: '#BFDBFE', tailwindClass: 'hover:text-blue-200' },
};

export const accentStyle: StyleDictionary = {
  DEFAULT: { hex: '#4B5563', tailwindClass: 'accent-gray-600' },
  ACCENT: { hex: '#9333EA', tailwindClass: 'accent-purple-600' },
  SUCCESS: { hex: '#16A34A', tailwindClass: 'accent-green-600' },
  WARNING: { hex: '#EA580C', tailwindClass: 'accent-orange-600' },
  ALERT: { hex: '#DC2626', tailwindClass: 'accent-red-600' },
  UPDATE: { hex: '#2563EB', tailwindClass: 'accent-blue-600' },
};

export const borderStyle: StyleDictionary = {
  DEFAULT: { hex: '#E5E7EB', tailwindClass: 'border-gray-200' },
  ACCENT: { hex: '#E9D5FF', tailwindClass: 'border-purple-200' },
  SUCCESS: { hex: '#BBF7D0', tailwindClass: 'border-green-200' },
  WARNING: { hex: '#FED7AA', tailwindClass: 'border-orange-200' },
  ALERT: { hex: '#FECACA', tailwindClass: 'border-red-200' },
  UPDATE: { hex: '#BFDBFE', tailwindClass: 'border-blue-200' },
};

export const borderHoverStyle: StyleDictionary = {
  DEFAULT: { hex: '#9CA3AF', tailwindClass: 'hover:border-gray-400' },
  ACCENT: { hex: '#C084FC', tailwindClass: 'hover:border-purple-400' },
  SUCCESS: { hex: '#4ADE80', tailwindClass: 'hover:border-green-400' },
  WARNING: { hex: '#FB923C', tailwindClass: 'hover:border-orange-400' },
  ALERT: { hex: '#F87171', tailwindClass: 'hover:border-red-400' },
  UPDATE: { hex: '#60A5FA', tailwindClass: 'hover:border-blue-400' },
};

export const borderDarkStyle: StyleDictionary = {
  DEFAULT: { hex: '#4B5563', tailwindClass: 'border-gray-600' },
  ACCENT: { hex: '#9333EA', tailwindClass: 'border-purple-600' },
  SUCCESS: { hex: '#16A34A', tailwindClass: 'border-green-600' },
  WARNING: { hex: '#EA580C', tailwindClass: 'border-orange-600' },
  ALERT: { hex: '#DC2626', tailwindClass: 'border-red-600' },
  UPDATE: { hex: '#2563EB', tailwindClass: 'border-blue-600' },
};

export const borderDarkHoverStyle: StyleDictionary = {
  DEFAULT: { hex: '#1F2937', tailwindClass: 'hover:border-gray-800' },
  ACCENT: { hex: '#6B21A8', tailwindClass: 'hover:border-purple-800' },
  SUCCESS: { hex: '#166534', tailwindClass: 'hover:border-green-800' },
  WARNING: { hex: '#9A3412', tailwindClass: 'hover:border-orange-800' },
  ALERT: { hex: '#991B1B', tailwindClass: 'hover:border-red-800' },
  UPDATE: { hex: '#1E40AF', tailwindClass: 'hover:border-blue-800' },
};

export const focusRingStyle: StyleDictionary = {
  DEFAULT: { hex: '#6B7280', tailwindClass: 'focus:ring-gray-500' },
  ACCENT: { hex: '#A855F7', tailwindClass: 'focus:ring-purple-500' },
  SUCCESS: { hex: '#22C55E', tailwindClass: 'focus:ring-green-500' },
  WARNING: { hex: '#F97316', tailwindClass: 'focus:ring-orange-500' },
  ALERT: { hex: '#EF4444', tailwindClass: 'focus:ring-red-500' },
  UPDATE: { hex: '#3B82F6', tailwindClass: 'focus:ring-blue-500' },
};

export const backgroundStyle: StyleDictionary = {
  DEFAULT: { hex: '#F9FAFB', tailwindClass: 'bg-gray-50' },
  ACCENT: { hex: '#FAF5FF', tailwindClass: 'bg-purple-50' },
  SUCCESS: { hex: '#F0FDF4', tailwindClass: 'bg-green-50' },
  WARNING: { hex: '#FFF7ED', tailwindClass: 'bg-orange-50' },
  ALERT: { hex: '#FEF2F2', tailwindClass: 'bg-red-50' },
  UPDATE: { hex: '#EFF6FF', tailwindClass: 'bg-blue-50' },
};

export const backgroundHoverStyle: StyleDictionary = {
  DEFAULT: { hex: '#F3F4F6', tailwindClass: 'hover:bg-gray-100' },
  ACCENT: { hex: '#F3E8FF', tailwindClass: 'hover:bg-purple-100' },
  SUCCESS: { hex: '#DCFCE7', tailwindClass: 'hover:bg-green-100' },
  WARNING: { hex: '#FFEDD5', tailwindClass: 'hover:bg-orange-100' },
  ALERT: { hex: '#FEE2E2', tailwindClass: 'hover:bg-red-100' },
  UPDATE: { hex: '#DBEAFE', tailwindClass: 'hover:bg-blue-100' },
};

export const backgroundDarkStyle: StyleDictionary = {
  DEFAULT: { hex: '#4B5563', tailwindClass: 'bg-gray-600' },
  ACCENT: { hex: '#9333EA', tailwindClass: 'bg-purple-600' },
  SUCCESS: { hex: '#16A34A', tailwindClass: 'bg-green-600' },
  WARNING: { hex: '#EA580C', tailwindClass: 'bg-orange-600' },
  ALERT: { hex: '#DC2626', tailwindClass: 'bg-red-600' },
  UPDATE: { hex: '#2563EB', tailwindClass: 'bg-blue-600' },
};

export const backgroundDarkHoverStyle: StyleDictionary = {
  DEFAULT: { hex: '#374151', tailwindClass: 'hover:bg-gray-700' },
  ACCENT: { hex: '#7E22CE', tailwindClass: 'hover:bg-purple-700' },
  SUCCESS: { hex: '#15803D', tailwindClass: 'hover:bg-green-700' },
  WARNING: { hex: '#C2410C', tailwindClass: 'hover:bg-orange-700' },
  ALERT: { hex: '#B91C1C', tailwindClass: 'hover:bg-red-700' },
  UPDATE: { hex: '#1D4ED8', tailwindClass: 'hover:bg-blue-700' },
};

export const backgroundGradientStyle: StyleDictionary = {
  DEFAULT: { hex: '#F9FAFB', tailwindClass: 'bg-gradient-to-br from-gray-50 to-gray-200 hover:from-gray-100 hover:to-gray-300' },
  ACCENT: { hex: '#FAF5FF', tailwindClass: 'bg-gradient-to-br from-purple-50 to-purple-200 hover:from-purple-100 hover:to-purple-300' },
  SUCCESS: { hex: '#F0FDF4', tailwindClass: 'bg-gradient-to-br from-green-50 to-green-200 hover:from-green-100 hover:to-green-300' },
  WARNING: { hex: '#FFF7ED', tailwindClass: 'bg-gradient-to-br from-orange-50 to-orange-200 hover:from-orange-100 hover:to-orange-300' },
  ALERT: { hex: '#FEF2F2', tailwindClass: 'bg-gradient-to-br from-red-50 to-red-200 hover:from-red-100 hover:to-red-300' },
  UPDATE: { hex: '#EFF6FF', tailwindClass: 'bg-gradient-to-br from-blue-50 to-blue-200 hover:from-blue-100 hover:to-blue-300' },
};

export const backgroundGradientDarkStyle: StyleDictionary = {
  DEFAULT: { hex: '#4B5563', tailwindClass: 'bg-gradient-to-br from-gray-500 to-gray-800 hover:from-gray-600 hover:to-gray-800' },
  ACCENT: { hex: '#9333EA', tailwindClass: 'bg-gradient-to-br from-purple-500 to-purple-800 hover:from-purple-600 hover:to-purple-800' },
  SUCCESS: { hex: '#16A34A', tailwindClass: 'bg-gradient-to-br from-green-500 to-green-800 hover:from-green-600 hover:to-green-800' },
  WARNING: { hex: '#EA580C', tailwindClass: 'bg-gradient-to-br from-orange-500 to-orange-800 hover:from-orange-600 hover:to-orange-800' },
  ALERT: { hex: '#DC2626', tailwindClass: 'bg-gradient-to-br from-red-500 to-red-800 hover:from-red-600 hover:to-red-800' },
  UPDATE: { hex: '#2563EB', tailwindClass: 'bg-gradient-to-br from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-800' },
};

const allStyles = {
  textStyle,
  textDarkStyle,
  textHoverStyle,
  textHoverLightStyle,
  accentStyle,
  borderStyle,
  borderHoverStyle,
  borderDarkStyle,
  borderDarkHoverStyle,
  focusRingStyle,
  backgroundStyle,
  backgroundHoverStyle,
  backgroundDarkStyle,
  backgroundDarkHoverStyle,
  backgroundGradientStyle,
  backgroundGradientDarkStyle,
}

export const typeIcons: Record<MessageType, LucideIcon> = {
  DEFAULT: Info,
  ACCENT: Lightbulb,
  SUCCESS: CheckCircle2,
  WARNING: AlertTriangle,
  ALERT: Bell,
  UPDATE: Calendar,
};

const getClass = (styleType: keyof typeof allStyles, type: MessageType) =>
  allStyles[styleType][type].tailwindClass;

const createStyleMap = (messageType: MessageType) => ({
  mainColor: mainColor[messageType],
  text: getClass('textStyle', messageType),
  textDark: getClass('textDarkStyle', messageType),
  textHover: getClass('textHoverStyle', messageType),
  textHoverLight: getClass('textHoverLightStyle', messageType),
  accent: getClass('accentStyle', messageType),
  border: getClass('borderStyle', messageType),
  borderHover: getClass('borderHoverStyle', messageType),
  borderDark: getClass('borderDarkStyle', messageType),
  borderDarkHover: getClass('borderDarkHoverStyle', messageType),
  focusRing: getClass('focusRingStyle', messageType),
  background: getClass('backgroundStyle', messageType),
  backgroundHover: getClass('backgroundHoverStyle', messageType),
  backgroundDark: getClass('backgroundDarkStyle', messageType),
  backgroundDarkHover: getClass('backgroundDarkHoverStyle', messageType),
  backgroundGradient: getClass('backgroundGradientStyle', messageType),
  backgroundGradientDark: getClass('backgroundGradientDarkStyle', messageType),
})

/**
 * @usage: styles.DEFAULT.text = 'text-gray-800'
 * @usage: styles.ACCENT.textHoverStyle = 'hover:text-purple-500'
 * @usage: styles.SUCCESS.background = 'bg-green-50'
 * @usage: styles.WARNING.focusRing = 'focus:ring-orange-500'
 */
export const styles = {
  DEFAULT: createStyleMap('DEFAULT'),
  ACCENT: createStyleMap('ACCENT'),
  SUCCESS: createStyleMap('SUCCESS'),
  WARNING: createStyleMap('WARNING'),
  ALERT: createStyleMap('ALERT'),
  UPDATE: createStyleMap('UPDATE'),
}
