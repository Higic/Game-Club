import { GET_USER_BY_ID } from "@/app/api/graphql/queries/userQueries";
import { User, UserOutput, UserOutputWithRole } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";

export default function GetUserById(id: string): UserOutputWithRole | null {

    let user: UserOutputWithRole = {
        id: "",
        user_name: "",
        role: "user",
        bio: "",
    };
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { userById: id},
    });
    if (loading) console.log("loading...");
    if (error) console.log("error: ", error);
    if (data) {
        console.log("data: ", data);
        user.id = data.userById.id;
        user.user_name = data.userById.user_name;
        user.bio = data.userById.bio;
        user.role = data.userById.role;
    }
    if (user.id !== "" && user.id !== null) {
        return user;
    }
    return null;
}