
"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userid, setUserid] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUserid(Cookie.get('id'));
  }, []);

console.log(userid)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !userid) {
      alert("Title, Description, and Signin are required.");
      return;
    }

    try {

      // for development
      const res = await fetch("http://localhost:3000/api/tasks", {


      // for production
      // const res = await fetch("https://todoapp-luqman.vercel.app//api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, userid}),
      });

      if (res.ok) {
        console.log(userid)
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2 rounded-md bg-slate-700"
        type="text"
        placeholder="Task Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2 rounded-md bg-slate-700"
        type="text"
        placeholder="Task Description"
      />
  
      <button
        type="submit"
        className="bg-blue-500 font-bold text-white py-3 px-6 w-fit rounded-md border-[1px] border-transparent shadow-md shadow-black"
      >
        Add Task
      </button>
    </form>
  );
}
