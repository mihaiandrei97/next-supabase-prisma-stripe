
import { createClient } from "@supabase/supabase-js";
import { memoryLocalStorageAdapter, store } from "./store";

// In development, Next clears Node.js cache on run, so every time there is a "compiling..." in the terminal (which happens per page render), it starts as a new app, losing any previous variable.

// This is why, in this article, written by Next.js team, down to the section where they instantiate a PrismaClient, to have it created only once, they use the global object, in your case, like so:

// let analytics;

// if (process.env.NODE_ENV === "production") {
//   analytics = new Analytics();
// } else {
//   if (!global.analytics) {
//     global.analytics = new Analytics();
//   }
//   analytics = global.analytics;
// }

// export default analytics;

// export const store:Record<string, string> = {
//   "now": new Date().toISOString(),
// };

// /**
//  * Returns a localStorage-like object that stores the key-value pairs in
//  * memory.
//  */
// export function memoryLocalStorageAdapter(store: { [key: string]: string } = {}) {
//   return {
//     getItem: (key: string) => {
//       console.log('getting item', key, 'from store', store);
//       return store[key] || null
//     },

//     setItem: (key: string, data: string) => {
//       console.log('setting item', key, 'from store', store);
//       store[key] = data
//       console.log('store is now', store);
//     },

//     removeItem: (key:string) => {
//       console.log('deletting item', key, 'from store', store);
//       delete store[key]
//     },
//   }
// }

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      detectSessionInUrl: true,
      persistSession: true,
      storage: memoryLocalStorageAdapter(store),
      // storage: {
      //   getItem(key) {
      //     console.log('get', key);
      //     return '1234/abc'
      //   },
      //   setItem(key, data) {
      //     console.log('set', key, data);
      //   },
      //   removeItem(key) {
      //     console.log('remove', key);
      //   }
      // }
    },
    
  },
);

export const cookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "lax",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
} as const;