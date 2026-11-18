/**
 * Super EZ Tour — Traveler Stories & UGC Service Layer
 *
 * Architecture:
 * - Data abstraction adapter isolating UI components from data source.
 * - Current stage: serves curated client-side mock/demonstration models.
 * - Future stage: seamless drop-in replacement with REST/GraphQL endpoints:
 *   GET /api/v1/traveler-stories?destination=&type=&page=
 *   GET /api/v1/traveler-reviews?destination=
 *   POST /api/v1/traveler-stories/submissions
 *
 * Schema Interfaces:
 * - TravelerStory: { id, type, destinationSlug, destinationName, title, caption, thumbnailUrl, videoUrl, mediaType, duration, aspectRatio, author, rating, travelDate, publishedAt, isDemo, verificationStatus, moderationStatus, status }
 * - TravelerReview: { id, destinationSlug, destinationName, author, travelDate, packName, title, content, fullContent, tripPhotoUrl, rating, isDemo, verificationStatus, status }
 */

import { TRAVELER_STORIES, TRAVELER_REVIEWS } from '../data/travelerStoriesData';
import { VIETNAM_DESTINATIONS } from '../data/vietnamDestinations';

export const travelerStoriesService = {
  /**
   * Fetches published traveler video/photo moments
   * @param {Object} params
   * @param {string} [params.destination='all']
   * @param {string} [params.type]
   * @param {number} [params.limit]
   * @returns {Promise<Array>}
   */
  async getStories({ destination = 'all', type, limit } = {}) {
    // Simulated async resolution ensuring seamless future API swap
    let results = TRAVELER_STORIES.filter((s) => s.status === 'PUBLISHED');

    if (destination && destination !== 'all') {
      results = results.filter((s) => s.destinationSlug === destination);
    }

    if (type) {
      results = results.filter((s) => s.type === type);
    }

    if (limit && typeof limit === 'number') {
      results = results.slice(0, limit);
    }

    return results;
  },

  /**
   * Fetches published editorial traveler reviews
   * @param {Object} params
   * @param {string} [params.destination='all']
   * @param {number} [params.limit]
   * @returns {Promise<Array>}
   */
  async getReviews({ destination = 'all', limit } = {}) {
    let results = TRAVELER_REVIEWS.filter((r) => r.status === 'PUBLISHED');

    if (destination && destination !== 'all') {
      results = results.filter((r) => r.destinationSlug === destination);
    }

    if (limit && typeof limit === 'number') {
      results = results.slice(0, limit);
    }

    return results;
  },

  /**
   * Finds a story by its unique ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getStoryById(id) {
    const found = TRAVELER_STORIES.find((s) => s.id === id);
    return found || null;
  },

  /**
   * Dynamically constructs filter tabs based on destinations having stories/reviews
   * Always grounded in canonical VIETNAM_DESTINATIONS
   */
  getAvailableFilterDestinations(isKorean = false) {
    const storyDestSlugs = new Set([
      ...TRAVELER_STORIES.map((s) => s.destinationSlug),
      ...TRAVELER_REVIEWS.map((r) => r.destinationSlug),
    ]);

    const filters = [
      {
        id: 'all',
        label: isKorean ? '전체 스토리' : 'Tất cả khoảnh khắc',
      },
    ];

    VIETNAM_DESTINATIONS.forEach((d) => {
      if (storyDestSlugs.has(d.id)) {
        filters.push({
          id: d.id,
          label: isKorean ? d.nameKr : (d.nameVi || d.name),
        });
      }
    });

    return filters;
  },

  /**
   * Future submission hook signature (prepared for MongoDB + Object Storage integration)
   * @param {Object} submissionPayload
   * @returns {Promise<Object>}
   */
  async submitTravelerStoryDraft(submissionPayload) {
    // In production, this posts to backend for moderation queueing
    return {
      success: true,
      submissionId: `sub-${Date.now()}`,
      status: 'PENDING_MODERATION',
      message: 'Story submitted successfully for review.',
      payload: submissionPayload,
    };
  },
};

export default travelerStoriesService;
