import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Task.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}



export async function GET(request, { params }) {
  await connectMongoDB();
  const { id } = params;
  const tasks = await Task.find({ userid: id });
   return NextResponse.json({ tasks }, { status: 200 });
  
  }


export async function DELETE(request, { params }) {
 const { id } = params;
  await connectMongoDB();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" }, { status: 200 });
}



