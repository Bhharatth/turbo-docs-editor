'use client'
import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

type UserDetails = {
  name: string,
  username: string,
  currentPassword: string,
  newPassword: string
};

type DialogDemoProps = {
  userDetails: Partial<UserDetails>;

};



const DialogDemo: React.FC<DialogDemoProps> = ({
  userDetails,
}) => {


  // const [username, setUsername] = useState(userDetails.username || '');
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');


  const handelChange = (UserDetails: Partial<UserDetails>): void => {
    alert(UserDetails.username)
    alert(UserDetails.currentPassword)
    alert(UserDetails.newPassword)

  };


  const onChangePassword = (passwordData: {
    currentPassword: string;
    newPassword: string;
    conformPassword: string;
  }): void => {
    alert(currentPassword)
    alert(newPassword)
    alert(conformPassword)
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>

        {/* <!-- Add these classes to your existing HTML structure --> */}
        <Tabs.Root
          className="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-blackA2 mx-auto my-auto"
          defaultValue="tab1"
        >
          <Tabs.List className="shrink-0 flex border-b border-mauve6 " aria-label="Manage your account">
            <Tabs.Trigger
              className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-white data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:hover:bg-gradient-to-bl data-[state=active]:focus:ring-4 data-[state=active]:focus:outline-none data-[state=active]:focus:ring-blue-300 data-[state=active]:dark:focus:ring-blue-800 outline-none cursor-default"
              value="tab1"
            >
              Account
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-white data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:hover:bg-gradient-to-bl data-[state=active]:focus:ring-4 data-[state=active]:focus:outline-none data-[state=active]:focus:ring-blue-300 data-[state=active]:dark:focus:ring-blue-800 outline-none cursor-default"
              value="tab2"
            >
              Password
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab1"
          >
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">
              Make changes to your account here. Click save when you're done.
            </p>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="name">
                Name
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="name"
                defaultValue="Pedro Duarte"
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="username">
                Username
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                defaultValue="@peduarte"
              />
            </fieldset>
            <div className="flex justify-end mt-5">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm mt-8 px-5 py-2.5 text-center mr-2 mb-2 w-full"
                onClick={async() => {
                  handelChange({
                    username,
                    newPassword,
                  })
                }}>
                Save changes
              </button>
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab2"
          >
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">
              Change your password here. After saving, you'll be logged out.
            </p>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="currentPassword"
              >
                Current password
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="newPassword"
              >
                New password
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="confirmPassword"
                value={conformPassword}
                onChange={(e) => setConformPassword(e.target.value)}
                type="password"
              />
            </fieldset>
            <div className="flex justify-end mt-5">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm mt-8 px-5 py-2.5 text-center mr-2 mb-2 w-full"
                onClick={async () => onChangePassword({
                  currentPassword,
                  newPassword,
                  conformPassword
                })}
              >
                Change password
              </button>
            </div>
          </Tabs.Content>
        </Tabs.Root>

      </Dialog.Portal>
    </Dialog.Root>
  )
}

  ;

export default DialogDemo;