import { NextResponse } from "next/server";
import { cookieOptions, supabase } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  unstable_noStore();
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { access_token, refresh_token } = data.session;

  cookies().set("sb-access-token", access_token, cookieOptions);
  cookies().set("sb-refresh-token", refresh_token, cookieOptions);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  })
}
