import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow-md shadow-slate-700 flex justify-between items-center bg-slate-900 px-8 rounded-md   py-5">
      <Link className="text-white font-extrabold" href={"/"}>
        Todo List
      </Link>
      <Link className="bg-blue-500 p-2 rounded-md text-white" href={"/addTask"}>
        Add Task
      </Link>
    </nav>
  );
}

