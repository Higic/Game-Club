import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import typeDefs from "./schemas";
import resolvers from "./resolvers";

/**
 * This file is the entry point for the graphql server.
 */


/**
 * Connect to the database
 */
const uri = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log("🎉 connected to database successfully via apollo");
    }
  } catch (error) {
    console.error(error);
  }
};
connectDB();

/**
 * Create the Apollo Server
 */
const server = new ApolloServer({
  resolvers,
  typeDefs,
});

/**
 * Create the Next.js handler
 * @param server
 */
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {},
  }),
});
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}