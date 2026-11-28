/**
 * Super EZ Tour - Master Destination Registry
 * Powers the dynamic Destination Landing Engine for all 16 destinations.
 */

import { DA_NANG_CONFIG, getLocalizedDaNangConfig } from './da-nang.config.js';
import { HA_NOI_CONFIG, getLocalizedHaNoiConfig } from './ha-noi.config.js';

export const DESTINATION_REGISTRY = {
  'da-nang': DA_NANG_CONFIG,
  'vietnam-danang': DA_NANG_CONFIG,
  'danang': DA_NANG_CONFIG,
  'ha-noi': HA_NOI_CONFIG,
  'hanoi': HA_NOI_CONFIG,
  'vietnam-hanoi': HA_NOI_CONFIG,
};

/**
 * Get destination configuration by slug or id, with language localization support
 * @param {string} slug
 * @param {string} language 'ko' | 'vi'
 * @returns {object|null} Destination config object
 */
export function getDestinationConfig(slug, language = 'ko') {
  const normalized = (slug || '').toLowerCase().trim();

  if (normalized === 'da-nang' || normalized === 'vietnam-danang' || normalized === 'danang') {
    return getLocalizedDaNangConfig(language);
  }

  if (normalized === 'ha-noi' || normalized === 'hanoi' || normalized === 'vietnam-hanoi') {
    return getLocalizedHaNoiConfig(language);
  }

  if (DESTINATION_REGISTRY[normalized]) {
    return DESTINATION_REGISTRY[normalized];
  }

  // Return null when a destination has not yet published its 3D config
  return null;
}

export default DESTINATION_REGISTRY;