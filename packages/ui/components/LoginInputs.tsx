import { useState } from "react";

interface LoginInputs {

    onClick: (email: string, password: string) => void;
}

export function LoginInput(props:LoginInputs) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="w-1/4">
            <div className='flex flex-col '>
                <input
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2 '
                />
                <input
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2'
                />

                {/* <button
      className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-50"
      type="button"
    > */}
                <button
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full"
                    type="button"
                    onClick={async () => {
                        props.onClick(email, password)
                    }}
                >
                    Login
                </button>

            </div>
        </div>
    )
}