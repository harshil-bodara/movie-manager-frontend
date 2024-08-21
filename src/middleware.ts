import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login'];

// Ensure that static asset requests are not impacted
const assetExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2', '.ttf', '.eot'];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isStaticAsset = assetExtensions.some(extension => pathname.endsWith(extension));

    if (isStaticAsset) {
        // Allow static assets to be served without interference
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;

    if (!token && !publicRoutes.includes(pathname)) {
        const loginUrl = new URL('/login', req.nextUrl.origin);
        return NextResponse.redirect(loginUrl);
    }

    if (token && publicRoutes.includes(pathname)) {
        const homeUrl = new URL('/', req.nextUrl.origin);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

// Configure middleware paths
export const config = {
    matcher: ['/','/login','/movie','/movie/:path*'], // Adjust as needed
};
