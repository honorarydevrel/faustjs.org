import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Get the pathname to determine the appropriate cache strategy
  const { pathname } = request.nextUrl;
  
  // Ensure proper Cache-Control headers for ISR pages
  // This prevents conflicts with Atlas Next edge caching
  if (pathname.startsWith('/blog/') && pathname !== '/blog/') {
    // Individual blog posts - 1 hour revalidation
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  } else if (pathname === '/blog/') {
    // Blog index - 1 minute revalidation
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    );
  } else if (pathname.startsWith('/docs/')) {
    // Documentation pages - 10 minutes revalidation
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=3600'
    );
  }
  
  // Add Vary header to ensure proper cache key generation
  response.headers.set('Vary', 'Accept-Encoding, Accept-Language');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - feeds (feed routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|feeds).*)',
  ],
};