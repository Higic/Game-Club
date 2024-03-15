import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  console.log(process.env.APOLLO_URI);
  return new ApolloClient({
    uri: process.env.APOLLO_URI,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;