import { CHECK_TOKEN } from "@/app/api/graphql/queries/userQueries";
import { UserOutput } from "@/types/DBTypes";
import MyContext from "@/types/MyContext";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";

const getUserToken = () => {
  return Cookies.get("token");
};

/**
 * This function is used globally to get the logged in user's token and validate it. Used in many components.
 * @returns the logged in user
 */
export default function GetLoggedInUser(): UserOutput | null {
  const token = getUserToken() as MyContext;

  let user: UserOutput = {
    id: "",
    user_name: "",
    bio: "",
  };


  // Query to check the token
  const { loading, error, data } = useQuery(CHECK_TOKEN, {
    variables: { token: token },
  });

  if (error) console.log("error: ", error);
  if (data) {
    user.id = data.checkToken.user.id;
    user.user_name = data.checkToken.user.user_name;
    user.bio = data.checkToken.user.bio;
  }

  if (user.id !== "" && user.id !== null) {
    return user;
  }
  return null;
}
