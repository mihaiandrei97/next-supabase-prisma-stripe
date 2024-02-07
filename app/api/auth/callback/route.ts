import { createSupabaseInstance } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createSupabaseInstance(cookieStore);
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}

// export async function GET(request: Request) {
//   try {

//   unstable_noStore();
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the Auth Helpers package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");

//   if (!code) {
//     return new Response(null, {
//       status: 400,
//     });
//   }

//   const supabase = createSupabaseInstance(cookies());

//   const { data, error } = await supabase.auth.exchangeCodeForSession(code);

//   if (error) {
//     return new Response(null, {
//       status: 400,
//     });
//   }

//   const { access_token, refresh_token } = data.session;

//   cookies().set("sb-access-token", access_token, cookieOptions);
//   cookies().set("sb-refresh-token", refresh_token, cookieOptions);

//   return new Response(null, {
//     status: 302,
//     headers: {
//       Location: "/",
//     },
//   })
//   } catch (error) {
//     console.log(error)
//     return new Response(null, {
//       status: 400,
//     });
//   }
// }
