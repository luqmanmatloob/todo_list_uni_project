"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link'
import Cookie from 'js-cookie';
import next from 'next';



export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("this function is funning")

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');

      }
      const { message, userId } = await response.json();
      console.log(message); // "Login successful"
      console.log(userId); // User ID

      // If authentication successful, clear form fields and any error message
      setEmail('');
      setPassword('');
      setErrorMessage('');

      Cookie.set('id', userId, { expires: 7 }); // Expires in 7 days


      console.log('User logged in successfully');
      router.push("/");

      // Additional logic such as redirecting to another page can be added here
    } catch (error) {
      console.error('Authentication error:', error.message);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="bg-[#] px-6 py-12 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sign In</h2>
        <p className="mt-2 text-lg leading-8 text-white">Please enter E-mail and password to sign in.</p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6">
          <div className=''>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-300">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-gray-400" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-slate-300">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        <div className="mt-10">
          <button type="submit" className="block w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</button>
        </div>
        <div className="mt-10 flex justify-center gap-5 items-center ">
          <p>Dont have an account?</p>
          <Link href="/signup" className="block  rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up </Link>
        </div>
      </form>
    </div>
  );
}
