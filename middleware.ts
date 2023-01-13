import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const entriesEndpoint = req.nextUrl.pathname.startsWith('/api/entries');
    const id = req.nextUrl.pathname.split('/')[3];
    
    if (entriesEndpoint && id){
        const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
        if ( !checkMongoIDRegExp.test(id) ) {
            const newURL = req.nextUrl.clone();
            newURL.pathname = '/api/bad-request';
            newURL.search = `?message=Invalid MongoID: ${id}`;
            return NextResponse.rewrite(newURL);
        }
    }
    
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/entries/:path*',
} 