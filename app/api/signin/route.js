

// import connectMongoDB from "../../../libs/mongodb";
// import User from "../../../models/usersignup";

// import { NextResponse } from "next/server";

// export async function POST(request) {
//   await connectMongoDB();

//   // Extracting email and password from request JSON
//   const { email, password } = await request.json();

//   try {
//     // Search for user in the database
//     const user = await User.findOne({ email });

//     if (!user) {
//       // If user not found, return an error response
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Compare provided password with password stored in the database
//     if (user.password !== password) {
//       // If password doesn't match, return an error response
//       return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//     }

//     // If email and password match, return a success message
//     return NextResponse.json({ message: "Login successful" }, { status: 200 });
//   } catch (error) {
//     // If an error occurs, return an internal server error response
//     console.error("Error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }




import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/usersignup";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();

  // Extracting email and password from request JSON
  const { email, password } = await request.json();

  try {
    // Search for user in the database
    const user = await User.findOne({ email });

    if (!user) {
      // If user not found, return an error response
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare provided password with password stored in the database
    if (user.password !== password) {
      // If password doesn't match, return an error response
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // If email and password match, return a success message along with the user id
    return NextResponse.json({ message: "Login successful", userId: user.id }, { status: 200 });
  } catch (error) {
    // If an error occurs, return an internal server error response
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
