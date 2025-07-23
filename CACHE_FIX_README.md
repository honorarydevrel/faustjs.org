# ISR Cache-Control Headers Fix

## Problem
ISR page data was randomly getting incorrect Cache-Control headers, causing inconsistent caching behavior across the site.

## Root Cause
- Next.js 15.x changes to ISR caching behavior
- Conflicting cache headers from multiple sources
- Inconsistent revalidation patterns
- Missing Vary headers causing cache conflicts

## Solution Implemented

### 1. Updated Next.js Configuration (`next.config.mjs`)
Added explicit Cache-Control headers for ISR pages:
- Blog posts: `public, s-maxage=3600, stale-while-revalidate=86400`
- Blog index: `public, s-maxage=60, stale-while-revalidate=300`
- Docs pages: `public, s-maxage=600, stale-while-revalidate=3600`
- Static assets: `public, max-age=31536000, immutable`

### 2. Added Middleware (`middleware.js`)
Created middleware to handle cache headers more reliably:
- Intercepts requests to ISR pages
- Sets appropriate Cache-Control headers
- Adds Vary headers to prevent cache conflicts
- Handles static assets caching

### 3. Centralized Cache Configuration (`src/lib/cache-config.js`)
Created utility to centralize cache configuration:
- Consistent cache settings across all ISR pages
- Easy to maintain and update
- Prevents configuration drift

### 4. Updated ISR Pages
- Standardized revalidation periods
- Consistent with cache header configuration
- Added comments for clarity

## Cache Strategy

### Blog Posts
- **Revalidation**: 1 hour (3600 seconds)
- **Cache**: 1 hour with 24-hour stale-while-revalidate
- **Purpose**: Balance freshness with performance

### Blog Index
- **Revalidation**: 1 minute (60 seconds)
- **Cache**: 1 minute with 5-minute stale-while-revalidate
- **Purpose**: Keep latest posts visible quickly

### Documentation
- **Revalidation**: 10 minutes (600 seconds)
- **Cache**: 10 minutes with 1-hour stale-while-revalidate
- **Purpose**: Balance content freshness with performance

### Static Assets
- **Cache**: 1 year immutable
- **Purpose**: Maximum performance for static content

## Testing

To verify the fix:

1. **Check Cache Headers**:
   ```bash
   curl -I https://your-site.com/blog/some-post
   curl -I https://your-site.com/blog/
   curl -I https://your-site.com/docs/some-page
   ```

2. **Verify ISR Behavior**:
   - Visit ISR pages
   - Check Network tab for Cache-Control headers
   - Verify revalidation works as expected

3. **Monitor Performance**:
   - Check page load times
   - Monitor cache hit rates
   - Verify no cache conflicts

## Monitoring

Monitor these metrics after deployment:
- Cache hit rates
- Page load performance
- ISR revalidation frequency
- Error rates related to caching

## Rollback Plan

If issues occur:
1. Remove middleware.js
2. Revert next.config.mjs changes
3. Remove cache-config.js
4. Monitor for any remaining issues
