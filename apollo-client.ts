import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://game-club-two.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;