import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const Protected: NextPage=():JSX.Element=> {
    const session = useSession();
    console.log(session)
    return  (
        <div>
        <div>This page is protected</div>
        {session.status ==="authenticated" && (
          <button onClick={() => signOut()}>Logout</button>
        )}
      </div>
        // Other content for authenticated users
      );
}

export default Protected;