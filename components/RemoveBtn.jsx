"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTask = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {

      // For procuctin
      // const res = await fetch(`https://todoapp-luqman.vercel.app/api/tasks/${id}`, {

      // For local enviroment 

      
      const apiUrl = process.env.SITE_URL;


      // For production
      const res = await fetch(`${apiUrl}/tasks/${id}`, {
        method: "DELETE",
      }
      
      );

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTask} className="">
      <HiOutlineTrash size={24} />
    </button>
  );
}

