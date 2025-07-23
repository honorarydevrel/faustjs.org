import { NextResponse } from 'next/server';

export function middleware(request) {
	const response = NextResponse.next();

	// Handle ISR pages with proper cache headers
	const { pathname } = request.nextUrl;

	// Blog post pages (ISR with 1 hour revalidation)
	if (pathname.startsWith('/blog/') && pathname !== '/blog/') {
		response.headers.set(
			'Cache-Control',
			'public, s-maxage=3600, stale-while-revalidate=86400'
		);
	}

	// Blog index page (ISR with 1 minute revalidation)
	if (pathname === '/blog/') {
		response.headers.set(
			'Cache-Control',
			'public, s-maxage=60, stale-while-revalidate=300'
		);
	}

	// Docs pages (ISR with 10 minutes revalidation)
	if (pathname.startsWith('/docs/')) {
		response.headers.set(
			'Cache-Control',
			'public, s-maxage=600, stale-while-revalidate=3600'
		);
	}

	// Static assets
	if (pathname.startsWith('/_next/static/')) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=31536000, immutable'
		);
	}

	// Add Vary header for ISR pages to prevent cache conflicts
	if (pathname.startsWith('/blog/') || pathname.startsWith('/docs/')) {
		response.headers.set('Vary', 'Accept-Encoding, Accept-Language');
	}

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
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
