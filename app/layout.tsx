import { GetStaticProps } from "next";
import "./global.css";
import { ApolloWrapper } from "./lib/apollo-wrapper";
import NavBar from "./navbar";
import Title from "./title";
import { gql, useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "./api/graphql/queries/userQueries";

/**
 * This function contains the metadatta for the project
 */
export const metadata = {
  title: "Game Club",
  description: "Created By Onni Alasaari, Tapio Humaljoki, Miiko Majewski & Edvard Nivala",
};

/**
 * This is the root layout of the website. It contains the navbar, title and the apollo wrapper
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
          <main className="content">
            <ApolloWrapper>
            <div className="buffer"></div>
            <Title/>
            <div className="buffer"></div>
            <NavBar/>
            <div className="buffer"></div>

            {children}
            </ApolloWrapper>
          </main>
      </body>
    </html>
  );
}
