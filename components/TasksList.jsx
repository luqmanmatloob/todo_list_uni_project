
"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Cookie from 'js-cookie';

const getTasks = (id) => {
  console.log(id);


// for production
  return fetch(`/api/tasks/${id}`, { // Update the URL to match your server-side endpoint
    cache: "no-store",

  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return res.json();
  })
  .catch(error => {
    console.log("Error loading tasks: ", error);
    return { tasks: [] };
  });
};

export default function TaskList() {
  const [userid, setUserid] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const id = Cookie.get('id');
    if (!id) {
      console.error("Userid not found in cookie.");
      return;
    }
    setUserid(id);

    getTasks(id)
      .then(({ tasks: fetchedTasks }) => {
        setTasks(fetchedTasks);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      });
  }, []);

  return (
    <div className="">
    <div >
      {tasks.map((t) => (
        <div
          key={t._id}
          className="p-4 my-3 flex justify-between gap-5 items-start rounded-md shadow-slate-500 shadow-sm mb-5"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTask/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
