
"use client"


import { useRouter } from "next/navigation";

import { useState } from 'react';



export default function SignUpForm() {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any of the fields are empty
    if (!firstName || !lastName || !email || !password) {
      console.log("Please fill out all fields");
      return; // Exit the function if any field is empty
    }

    // Log form data for debugging
    console.log('Form submitted:', { firstName, lastName, email, password, confirmPassword });

    // Add submission logic here
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    // Send POST request to backend API

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log('User signed up successfully!');

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        router.push("/signin");


        // Optionally, you can redirect to another page or show a success message
      }
      else {
        console.error('Failed to sign up:', response.statusText);
        // Optionally, you can display an error message to the user
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle any network or other errors that may occur
    }

  };

  return (
    <div className="bg-[#] px-6 py-24 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sign Up</h2>
        <p className="mt-2 text-lg leading-8 text-white">Please fill out the form to sign up.</p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-200">First name</label>
            <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-200">Last name</label>
            <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-200">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-200">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-semibold leading-6 text-gray-200">Confirm Password</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>        </div>
        <div className="mt-10">
          <button type="submit" className="block w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
