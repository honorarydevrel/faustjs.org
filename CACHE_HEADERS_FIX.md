# Cache-Control Headers Fix for ISR Pages

## Issue Description

Issue [#343](https://github.com/wpengine/faustjs.org/issues/343) reported that ISR (Incremental Static Regeneration) page data was randomly getting incorrect Cache-Control headers. This was causing inconsistent caching behavior and potential performance issues.

## Root Cause Analysis

The issue was caused by conflicts between:

1. **Atlas Next Edge Caching**: The `@wpengine/atlas-next` package includes `@wpengine/edge-cache` which was interfering with Next.js's default ISR caching behavior.

2. **Header Configuration Conflicts**: Multiple sources were setting Cache-Control headers, leading to inconsistent behavior.

3. **Missing Explicit Cache Headers**: ISR pages didn't have explicit Cache-Control headers defined, relying on Next.js defaults which were being overridden.

## Solution Implemented

### 1. Explicit Cache-Control Headers in `next.config.mjs`

Added specific Cache-Control headers for different page types:

```javascript
async headers() {
  return [
    // ... existing headers ...
    {
      source: "/blog/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
    {
      source: "/docs/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=600, stale-while-revalidate=3600",
        },
      ],
    },
    {
      source: "/blog/",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=60, stale-while-revalidate=300",
        },
      ],
    },
  ];
}
```

### 2. Middleware for Consistent Header Application

Created `middleware.js` to ensure proper Cache-Control headers are applied consistently:

```javascript
export function middleware(request) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/blog/') && pathname !== '/blog/') {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  } else if (pathname === '/blog/') {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    );
  } else if (pathname.startsWith('/docs/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=3600'
    );
  }
  
  response.headers.set('Vary', 'Accept-Encoding, Accept-Language');
  return response;
}
```

### 3. Disabled Atlas Next Remote Cache Handler

Updated Atlas Next configuration to prevent conflicts:

```javascript
export default withWPEConfig(withFaust(nextConfig), {
  remoteCacheHandler: false,
});
```

## Cache Strategy

| Page Type | Revalidation Period | Cache-Control Header |
|-----------|-------------------|---------------------|
| Blog Index (`/blog/`) | 60 seconds | `public, s-maxage=60, stale-while-revalidate=300` |
| Blog Posts (`/blog/[slug]/`) | 1 hour | `public, s-maxage=3600, stale-while-revalidate=86400` |
| Docs Pages (`/docs/**`) | 10 minutes | `public, s-maxage=600, stale-while-revalidate=3600` |

## Testing

A test script has been created to verify the fix:

```bash
# Test against local development server
pnpm test:cache-headers

# Test against production/staging
BASE_URL=https://your-domain.com pnpm test:cache-headers
```

The test script checks that:
- Cache-Control headers are properly set for each page type
- Headers match the expected values
- No missing or incorrect headers

## Verification Steps

1. **Deploy the changes**
2. **Run the test script**: `pnpm test:cache-headers`
3. **Monitor production logs** for any caching-related errors
4. **Check browser dev tools** to verify headers are consistent
5. **Monitor CDN/edge cache behavior** to ensure proper caching

## Expected Behavior After Fix

- **Consistent Headers**: All ISR pages will have predictable Cache-Control headers
- **Proper Caching**: Edge caches will respect the defined cache strategies
- **No Random Behavior**: Headers will be consistent across requests
- **Performance**: Stale-while-revalidate will provide good performance while ensuring fresh content

## Rollback Plan

If issues arise, the fix can be rolled back by:

1. Removing the explicit Cache-Control headers from `next.config.mjs`
2. Deleting the `middleware.js` file
3. Reverting the Atlas Next configuration to default

## Monitoring

Monitor the following metrics after deployment:

- Cache hit rates
- Response times
- Error rates
- Browser console warnings about caching
- CDN cache behavior

## Related Issues

This fix addresses:
- Inconsistent Cache-Control headers for ISR pages
- Conflicts between Atlas Next and Next.js caching
- Random caching behavior affecting user experience