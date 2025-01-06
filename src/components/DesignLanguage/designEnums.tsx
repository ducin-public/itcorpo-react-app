export type DesignSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export type DesignFill = 'SOLID' | 'OUTLINED';

/**
 * Certain variant types match their UI use-cases:
 * - DEFAULT: General information, standard messages
 * - ACCENT: Highlighted information, tips, updates, suggestions, etc. This is the primary color for emphasizing information
 * - SUCCESS: Confirmation messages of successful operations
 * - WARNING: Non-critical alerts or warnings
 * - ALERT: Critical alerts or errors
 */
export type VariantType = 'DEFAULT' | 'ACCENT' | 'SUCCESS' | 'WARNING' | 'ALERT' | 'UPDATE';
