import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/usersignup";

import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();

  // Extracting name and email from request JSON
  const {firstName,lastName, email, password} = await request.json();

  // Creating a new user record with title and description
  await User.create({firstName, lastName, email, password});
  console.log(`${firstName}${lastName}${email}${password}`)

  // Returning a JSON response indicating successful record creation with status code 201
  console.log("write successfull")
  return NextResponse.json({ message: "Record Created" }, { status: 201 });
}