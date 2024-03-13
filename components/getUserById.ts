import { GET_USER_BY_ID } from "@/app/api/graphql/queries/userQueries";
import { User, UserOutput} from "@/types/DBTypes";
import { useQuery } from "@apollo/client";

export default function GetUserById(id: string): UserOutput | null {

    let user: UserOutput = {
        id: "",
        user_name: "",
        bio: "",
    };
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { userById: id},
    });
    if (error) console.log("error: ", error);
    if (data) {
        user.id = data.userById.id;
        user.user_name = data.userById.user_name;
        user.bio = data.userById.bio;
    }
    if (user.id !== "" && user.id !== null) {
        return user;
    }
    return null;
}