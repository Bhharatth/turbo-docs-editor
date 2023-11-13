'use client'
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
        Edit profile
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>

    {/* <!-- Add these classes to your existing HTML structure --> */}

<Dialog.Overlay className="bg-blackA6 bg-opacity-60 fixed inset-0 rounded" />

<Dialog.Content className="animate-contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-85vh w-90vw max-w-450px rounded-6 bg-white p-8 shadow-lg focus:outline-none">
  <Dialog.Title className="text-violet11 text-2xl font-medium mb-4">
    Edit profile
  </Dialog.Title>

  <Dialog.Description className="text-violet11 text-base mb-6">
    Make changes to your profile here. Click save when you're done.
  </Dialog.Description>

  <fieldset className="mb-6 border-b border-gray-300 pb-4">
    <label className="text-violet11 w-24 text-right text-base" htmlFor="name">
      Name
    </label>
    <input
      className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-9 w-full flex-1 items-center justify-center rounded-4 px-3 text-base leading-none outline-none focus:shadow-outline"
      id="name"
      defaultValue="Pedro Duarte"
    />
  </fieldset>

  <fieldset className="mb-6 border-b border-gray-300 pb-4">
    <label className="text-violet11 w-24 text-right text-base" htmlFor="name">
      Name
    </label>
    <input
      className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-9 w-full flex-1 items-center justify-center rounded-4 px-3 text-base leading-none outline-none focus:shadow-outline"
      id="name"
      defaultValue="Pedro Duarte"
    />
  </fieldset>


  <fieldset className="mb-6 border-b border-gray-300 pb-4">
    <label className="text-violet11 w-24 text-right text-base" htmlFor="username">
      Username
    </label>
    <input
      className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-9 w-full flex-1 items-center justify-center rounded-4 px-3 text-base leading-none outline-none focus:shadow-outline"
      id="username"
      defaultValue="@peduarte"
    />
  </fieldset>

  <div className="mt-8 flex justify-end">
    <Dialog.Close asChild>
      <button className="text-white bg-gradient-to-br from-purple-600  to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm mt-8 px-5 py-2.5 text-center mr-2 mb-2 w-full">
        Save changes
      </button>
    </Dialog.Close>
  </div>

  <Dialog.Close asChild>
    <button
      className="text-violet11 hover:bg-gray-200 focus:shadow-outline absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full focus:outline-none"
      aria-label="Close"
    >
      <Cross2Icon />
    </button>
  </Dialog.Close>
</Dialog.Content>


    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;