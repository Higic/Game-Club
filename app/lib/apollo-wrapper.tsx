"use client";

/**
 * Apollo wrapper used to provide the apollo client to the app. This is used for all queries and mutations.
 */

import createApolloClient from "@/apollo-client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
  });

  // Create a new ApolloClient instance
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

// This function wraps the entire app with the Apollo client. Used to get the queries and mutations working
export function ApolloWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <ApolloProvider client={createApolloClient()}>
      {children}
    </ApolloProvider>
  );
}