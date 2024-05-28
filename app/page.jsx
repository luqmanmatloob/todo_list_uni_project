

"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TasksList from "@/components/TasksList";
import Cookie from 'js-cookie';

export default function Home() {
  const [userid, setUserid] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userIdFromCookie = Cookie.get('id');
    if (!userIdFromCookie) {
      router.push('/signin');
    } else {
      setUserid(userIdFromCookie);
    }
  }, []);

  return (
    <div className=''>
      {userid && <TasksList />}
    </div>
  );
}
