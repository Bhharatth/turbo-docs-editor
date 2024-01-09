import { NextPage } from "next";
import React, {  useState } from "react";
import * as Form from '@radix-ui/react-form';
import {  api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useToasts } from 'react-toast-notifications';
import { SignUpResponse } from "@/common/authSchema";
import { signIn } from "next-auth/react";
import { LogoutButtonState } from "@gdocs/recoilstore";
import { useRecoilState } from "recoil";

interface Props {}

const SignUp: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const [logoutHandler, setLogoutHandler] = useRecoilState(LogoutButtonState)
  const {mutate: signUpUser}= api.account.signup.useMutation();
  
  const [userName, setuserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const { addToast } = useToasts();
  const createUsers = api.account.signup.useMutation<SignUpResponse>({
    onSuccess: (res)=> {
      if(res){
        console.log('User created successfully');
        addToast(res.message, { appearance: 'success', containerId: 'specificDivId' });

        try {
          signIn("credentials", {
            email,
            password,
            redirect: false
          });
          router.push("/")

          setLogoutHandler({
            clicked: false
          })
          
        } catch (error) {
          console.log(error)
          
        }
        router.push("/")
       
      }
  
      // router.push("/")
    },
    onError:(error)=> {
      if (error.message === 'FORBIDDEN') {
        addToast(error.message, { appearance: 'error', containerId: 'specificDivId',autoDismiss: true });
      } else {
        addToast(error.message, { appearance: 'error', containerId: 'specificDivId',autoDismiss: true  });
      }
    }
  });
  
  const handleClick = async (e:any) => {
    e.preventDefault();
    
    try {
    const res = await createUsers.mutate({
        email,
        userName,
        password,
      });
      console.log('User created successfully');
      
      console.log('User signed in:', res);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const gotoLogin=()=> {
    router.push("/loginpage")
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
        onClick={()=> gotoLogin()}
      >
        Login
      </button>
      {/* <button className="flex flex-row text-xl" onClick={() => signIn('github')}>
        or login with github
      <FaGithub className="w-8 h-8 mr-5 ml-5 "/>
    </button> */}
      <div id="specificDivId" >
        
    </div>
    </div>
    <div className='flex items-center justify-center h-screen'>
     <div>
     <Form.Root className="w-[260px]">
    <Form.Field className="grid mb-[10px]" name="User name">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">User Name</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please enter your User name
        </Form.Message>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
          Please provide a valid User name
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
          type="text"
          placeholder='User name'
          onChange={(e)=> setuserName(e.target.value)}
          required
          
        />
      </Form.Control>
    </Form.Field>

    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Email</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
          type="email"
          placeholder='email'
          onChange={(e)=> setEmail(e.target.value)}
          required
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
          onChange={(e)=> setPassword(e.target.value)}
          required
        />
      </Form.Control>
    </Form.Field>
   
    <Form.Submit asChild>
      <button className="text-white bg-gradient-to-br from-purple-600  to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm mt-8 px-5 py-2.5 text-center mr-2 mb-2 w-full"
      type="submit"
      onClick={handleClick}>
        Signup
      </button>
    </Form.Submit>
   
  </Form.Root>
     </div>
    </div>
    
  </section>
  );
};

export default SignUp;
