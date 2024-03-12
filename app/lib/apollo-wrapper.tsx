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

export function ApolloWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <ApolloProvider client={createApolloClient()}>
      {children}
    </ApolloProvider>
  );
}