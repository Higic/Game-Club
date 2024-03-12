
import { redirect } from "next/navigation";

/**
 * This is just here to redirect from /api to /api/graphql
 * @returns null
 */
export default function Redirect() {

    redirect('/api/graphql');

    return null;
}
