import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
import connectDB from "@/lib/config/db";
import generateToken from "@/lib/auth/generateToken";
import saveCookie from "@/lib/auth/saveCookie";

export async function POST(req) {
  await connectDB();
  let { name, username, password, profilePic, bio } = await req.json();
  username = username.trim().toLowerCase();
  try {
    if (!username || !name || !password) {
      return NextResponse.json(
        { message: "Username, Name, and Password are required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }
    const newUser = await User.create({
      name,
      username,
      password,
      profilePic,
      bio,
    });
    if (newUser) {
      const response = NextResponse.json(
        {
          user: {
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            profilePic: newUser.profilePic,
            bio: newUser.bio,
            createdAt: newUser.createdAt,
          },
          message: "Registered successfully",
          success: true,
        },
        { status: 201 }
      );
      const token = generateToken(newUser._id, newUser.username);
      return saveCookie(token, response);
    }
  } catch (error) {
    console.log("Error in register route : ", error);
    return NextResponse.json(
      { message: "Internal server error", success: false, error: true },
      { status: 500 }
    );
  }
}
