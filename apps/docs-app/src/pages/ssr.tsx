// import { signIn, signOut, useSession } from "next-auth/react";

// export default function Ssr({session}){
//     // const session = useSession();
//     console.log(session)
  
//     return (
//       <div>
//         {session.data?.user.email}
//         <div>
//           {session.data && <button onClick={()=> signOut()}>signout</button>}
//         </div>
//         {session.data && <button onClick={()=> signIn()}>signIn</button>}
        
//       </div>
  
//     )
//   }