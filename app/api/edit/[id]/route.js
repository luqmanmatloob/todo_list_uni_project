import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const task = await Task.findOne({ _id: id });
    return NextResponse.json({ task }, { status: 200 });
  }
  