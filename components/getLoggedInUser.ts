import { CHECK_TOKEN } from "@/app/api/graphql/queries/userQueries";
import { UserOutput } from "@/types/DBTypes";
import MyContext from "@/types/MyContext";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";

const getUserToken = () => {
    return Cookies.get("token");
  }

export default function GetLoggedInUser(): UserOutput | null {

    const token = getUserToken() as MyContext;

    let user: UserOutput = {
        id: "",
        user_name: "",
        bio: "",
    };

    if (token === undefined) {
        return null;
    }
    console.log("token: ", token);
    const { loading, error, data } = useQuery(CHECK_TOKEN, {
        variables: { token: token },
    
    });
    

    if (loading) console.log("loading...");
    if (error) console.log("error: ", error);
    if (data) {
        console.log("data: ", data);
        user.id = data.checkToken.user.id;
        user.user_name = data.checkToken.user.user_name;
        user.bio = data.checkToken.user.bio;
    }


    if (user.id !== "" && user.id !== null) {
        return user;
    }
    return null;
}