/**
 * Cache configuration for ISR pages
 * Centralized configuration to prevent cache header conflicts
 */

export const CACHE_CONFIG = {
	// Blog post pages - 1 hour revalidation
	BLOG_POST: {
		revalidate: 3600,
		cacheControl: 'public, s-maxage=3600, stale-while-revalidate=86400',
	},
	
	// Blog index page - 1 minute revalidation
	BLOG_INDEX: {
		revalidate: 60,
		cacheControl: 'public, s-maxage=60, stale-while-revalidate=300',
	},
	
	// Docs pages - 10 minutes revalidation
	DOCS: {
		revalidate: 600,
		cacheControl: 'public, s-maxage=600, stale-while-revalidate=3600',
	},
	
	// Static assets - 1 year cache
	STATIC: {
		cacheControl: 'public, max-age=31536000, immutable',
	},
};

/**
 * Get cache configuration for a specific page type
 * @param {string} pageType - The type of page (BLOG_POST, BLOG_INDEX, DOCS, STATIC)
 * @returns {Object} Cache configuration object
 */
export function getCacheConfig(pageType) {
	return CACHE_CONFIG[pageType] || CACHE_CONFIG.BLOG_POST;
}

/**
 * Set cache headers for ISR pages
 * @param {Object} res - Next.js response object
 * @param {string} pageType - The type of page
 */
export function setCacheHeaders(res, pageType) {
	const config = getCacheConfig(pageType);
	
	if (config.cacheControl) {
		res.setHeader('Cache-Control', config.cacheControl);
	}
	
	// Add Vary header to prevent cache conflicts
	if (pageType !== 'STATIC') {
		res.setHeader('Vary', 'Accept-Encoding, Accept-Language');
	}
}
