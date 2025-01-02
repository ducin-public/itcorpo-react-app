import { Info, CheckCircle2, AlertTriangle, Bell, Calendar, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type MessageType = 'DEFAULT' | 'ACCENT' | 'SUCCESS' | 'WARNING' | 'ALERT' | 'UPDATE';

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

export const borderStyle: StyleDictionary = {
  DEFAULT: { hex: '#E5E7EB', tailwindClass: 'border-gray-200' },
  ACCENT: { hex: '#E9D5FF', tailwindClass: 'border-purple-200' },
  SUCCESS: { hex: '#BBF7D0', tailwindClass: 'border-green-200' },
  WARNING: { hex: '#FED7AA', tailwindClass: 'border-orange-200' },
  ALERT: { hex: '#FECACA', tailwindClass: 'border-red-200' },
  UPDATE: { hex: '#BFDBFE', tailwindClass: 'border-blue-200' },
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
  DEFAULT: { hex: '#F9FAFB', tailwindClass: 'hover:bg-gray-50' },
  ACCENT: { hex: '#FAF5FF', tailwindClass: 'hover:bg-purple-50' },
  SUCCESS: { hex: '#F0FDF4', tailwindClass: 'hover:bg-green-50' },
  WARNING: { hex: '#FFF7ED', tailwindClass: 'hover:bg-orange-50' },
  ALERT: { hex: '#FEF2F2', tailwindClass: 'hover:bg-red-50' },
  UPDATE: { hex: '#EFF6FF', tailwindClass: 'hover:bg-blue-50' },
};

const allStyles = {
  textStyle,
  textDarkStyle,
  textHoverStyle,
  borderStyle,
  focusRingStyle,
  backgroundStyle,
  backgroundHoverStyle,
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
  text: getClass('textStyle', messageType),
  textDark: getClass('textDarkStyle', messageType),
  textHover: getClass('textHoverStyle', messageType),
  border: getClass('borderStyle', messageType),
  focusRing: getClass('focusRingStyle', messageType),
  background: getClass('backgroundStyle', messageType),
  backgroundHover: getClass('backgroundHoverStyle', messageType),
})

export const styles = {
  DEFAULT: createStyleMap('DEFAULT'),
  ACCENT: createStyleMap('ACCENT'),
  SUCCESS: createStyleMap('SUCCESS'),
  WARNING: createStyleMap('WARNING'),
  ALERT: createStyleMap('ALERT'),
  UPDATE: createStyleMap('UPDATE'),
}
