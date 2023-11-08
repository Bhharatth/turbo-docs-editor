import React from 'react';

function Login() {
  return (
    <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply overflow-hidden">

      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white p-8 flex flex-col items-center justify-center md:flex-row">

        <div className="flex flex-row items-center justify-between md:flex-col">
          <h1 className="text-5xl font-extrabold mb-4">TURBO DOCS</h1>
          <p className="text-lg hidden md:block lg:block">Edit your docs at lightning speed</p>
        </div>

        <button
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-25 mx-20 "
          type="button"
        >
          Signup
        </button>
      </div>

      <div className='flex items-center justify-center h-screen mt-30'>



        <div className="w-1/4">


          <div className='flex flex-col '>
            <input
              placeholder='Email'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2 '
            />
            <input
              placeholder='Password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2'
            />


            <button
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full"
              type="button"
            >
              Login
            </button>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Login