// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/code-review/:path*',
    '/demo/:path*',
    '/history/:path*',
    '/profile/:path*',
  ],
};
