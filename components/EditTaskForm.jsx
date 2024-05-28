"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTaskForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // for local enviroment
      // const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {

      

      const apiUrl = process.env.SITE_URL;


      // For production
      const res = await fetch(`${apiUrl}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2 rounded-md bg-slate-700"
        type="text"
        placeholder="Task Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2 rounded-md bg-slate-700"
        type="text"
        placeholder="Task Description"
      />

      <button className="bg-blue-500 font-bold text-white py-3 px-6 w-fit rounded-md border-[1px] border-transparent shadow-md shadow-black">
        Update Task
      </button>
    </form>
  );
}
