import React, { FormEventHandler, useState } from 'react';
import * as Form from '@radix-ui/react-form';
// import {Button} from "@gsocs/ui"
import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useToasts } from 'react-toast-notifications';



function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {data, status} = useSession()
  const { addToast } = useToasts();
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
        signIn("credentials", {
        email,
        password,
        redirect: false
      })
      await new Promise((resolve) => setTimeout(resolve, 
        3000));
      console.log('User logged in successfully', data);
      router.push("/")
      if(!data){

        addToast("user not logged in", { appearance: 'error', containerId: 'specificDivId' });
      }
    } catch (error) {
      console.error('Failed to sign in', error);
      addToast("please enter correct email and password", { appearance: 'success', containerId: 'specificDivId' });
    }
 
  }
  const gotoSignup=()=> {
    router.push("/signuppage")
  }
  

  return (
    <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply overflow-hidden z-0">
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white p-8 flex flex-col items-center justify-center md:flex-row">
      <div className="flex flex-row items-center justify-between md:flex-col">
        <h1 className="text-5xl font-extrabold mb-4">TURBO DOCS</h1>
        <p className="text-lg hidden md:block lg:block">Edit your docs at lightning speed</p>
      </div>
      <button
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-25 mx-20 "
        type="button"
        // disabled={}
        onClick={()=>gotoSignup()}
      >
        Signup
      </button>
      {/* <button className="flex flex-row text-xl" onClick={() => signIn('github')}>
        or login with github
      <FaGithub className="w-8 h-8 mr-5 ml-5 "/>
    </button> */}
    </div>
    <div id="specificDivId" >
        
    </div>
    <div className='flex items-center justify-center h-screen'>
     <div>
     <Form.Root className="w-[260px]">
  

    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Email</Form.Label>
        <Form.Message className="text-[13px] text-orange-500 opacity-[0.8]" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="text-[13px] text-red-400 opacity-[0.8]" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
          type="email"
          placeholder='email'
          required
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
      </Form.Control>
    </Form.Field>


    <Form.Field className="grid mb-[10px]" name="Password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Password</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please provide a Password
        </Form.Message>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
          Please provide a valid Password
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
          type="password"
          placeholder='password'
          required
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
      </Form.Control>
    </Form.Field>




   
    <Form.Submit asChild>
      <button className="text-white bg-gradient-to-br from-purple-600  to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm mt-8 px-5 py-2.5 text-center mr-2 mb-2 w-full"
      onClick={handleSubmit}
      disabled={status === "loading"}>
        Signup
      </button>
    </Form.Submit>
  </Form.Root>
     </div>
    </div>
  </section>
  )
}

export default Login