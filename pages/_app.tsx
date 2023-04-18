import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import "@/styles/globals.css";
import "@edgebrix-sdk/react/dist/style.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Component {...pageProps} />
    </ClerkProvider>
    // <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    //   <SignedIn>
    //     <Component {...pageProps} />
    //   </SignedIn>
    //   <SignedOut>
    //     <main>
    //       <div className="flex h-screen bg-gray-50">
    //         <div className="m-auto">
    //           <SignIn redirectUrl="/" />
    //         </div>
    //       </div>
    //     </main>
    //   </SignedOut>
    // </ClerkProvider>
  );
}
