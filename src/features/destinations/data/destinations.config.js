/**
 * Super EZ Tour - Master Destination Registry
 * Powers the dynamic Destination Landing Engine for all 16 destinations.
 */

import { DA_NANG_CONFIG } from './da-nang.config.js';

export const DESTINATION_REGISTRY = {
  'da-nang': DA_NANG_CONFIG,
  'vietnam-danang': DA_NANG_CONFIG,
  'danang': DA_NANG_CONFIG,
};

/**
 * Get destination configuration by slug or id
 * @param {string} slug
 * @returns {object} Destination config object
 */
export function getDestinationConfig(slug) {
  const normalized = (slug || '').toLowerCase().trim();
  if (DESTINATION_REGISTRY[normalized]) {
    return DESTINATION_REGISTRY[normalized];
  }

  // Fallback to Da Nang if not found or return default structure
  return DA_NANG_CONFIG;
}

export default DESTINATION_REGISTRY;