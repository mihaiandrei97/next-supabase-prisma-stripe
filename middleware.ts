import { NextRequest, NextResponse } from "next/server";
import { createSupabaseInstanceMiddleware } from "./lib/supabase";

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createSupabaseInstanceMiddleware(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getUser();

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

//   let response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });

//   const accessToken = request.cookies.get("sb-access-token");
//   const refreshToken = request.cookies.get("sb-refresh-token");

//   if (!accessToken || !refreshToken) {
//     return response;
//   }

//   const supabase = createSupabaseInstance(cookies());

//   const { data, error } = await supabase.auth.setSession({
//     access_token: accessToken.value,
//     refresh_token: refreshToken.value,
//   });

//   if (error || !data.session) {
//     response.cookies.set("sb-access-token", "", { maxAge: 0 });
//     response.cookies.set("sb-refresh-token", "", { maxAge: 0 });
//     return response;
//   }

//   const isSameAccessToken = accessToken.value === data.session.access_token;
//   const isSameRefreshToken = refreshToken.value === data.session.refresh_token;

//   if (!isSameAccessToken || !isSameRefreshToken) {
//     response.cookies.set(
//       "sb-access-token",
//       data.session.access_token,
//       cookieOptions
//     );
//     response.cookies.set(
//       "sb-refresh-token",
//       data.session.refresh_token,
//       cookieOptions
//     );
//   }
//   return response;
// }

// adapt matcher to not look for api/auth/callback
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
