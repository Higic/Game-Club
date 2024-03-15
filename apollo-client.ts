import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://game-club-git-main-onnis-projects-fd36d217.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;