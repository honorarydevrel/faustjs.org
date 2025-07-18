# Cache-Control Headers Fix for ISR Pages

## Issue Description

Issue [#343](https://github.com/wpengine/faustjs.org/issues/343) reported that ISR (Incremental Static Regeneration) page data was randomly getting incorrect Cache-Control headers. This was causing inconsistent caching behavior and potential performance issues.

## Root Cause Analysis

The issue was caused by **Atlas Next's remote cache handler** interfering with Next.js's built-in ISR caching behavior. The `@wpengine/atlas-next` package includes `@wpengine/edge-cache` which was overriding Next.js's default Cache-Control headers for ISR pages.

## Simple Solution

### Disable Atlas Next Remote Cache Handler

The fix is simple - disable the remote cache handler in Atlas Next configuration:

```javascript
export default withWPEConfig(withFaust(nextConfig), {
  remoteCacheHandler: false,
});
```

This allows Next.js to handle ISR caching with its built-in mechanisms, which are well-tested and reliable.

## Why This Works

1. **Next.js ISR is robust**: Next.js has excellent built-in caching for ISR pages
2. **Atlas Next was interfering**: The remote cache handler was overriding Next.js headers
3. **Minimal change**: We don't need to reinvent caching - just let Next.js handle it
4. **No performance impact**: Next.js ISR caching is already optimized

## Expected Behavior After Fix

- ✅ **Consistent Headers**: ISR pages will use Next.js default Cache-Control headers
- ✅ **No Random Behavior**: Headers will be predictable and consistent
- ✅ **Proper Caching**: Next.js will handle revalidation according to `revalidate` values
- ✅ **Edge Cache Compatible**: CDNs will still cache properly with Next.js headers

## Verification

After deployment, verify that:
1. ISR pages have consistent Cache-Control headers
2. No more random caching behavior
3. Revalidation works as expected (60s for blog index, 1h for posts, 10m for docs)

## Rollback

If issues arise, simply remove the `remoteCacheHandler: false` configuration to revert to Atlas Next's default behavior.

## Alternative Solutions (if needed)

If disabling the remote cache handler doesn't work, these are the next steps:

1. **Check Atlas Next version**: Ensure using the latest version
2. **Contact WP Engine support**: Atlas Next is their package
3. **Consider removing Atlas Next**: If it's causing more problems than it solves

## Related Issues

This fix addresses:
- Inconsistent Cache-Control headers for ISR pages
- Conflicts between Atlas Next and Next.js caching
- Random caching behavior affecting user experience