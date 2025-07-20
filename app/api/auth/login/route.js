import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
import connectDB from "@/lib/config/db";
import generateToken from "@/lib/auth/generateToken";
import saveCookie from "@/lib/auth/saveCookie";

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    if (!username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const response = NextResponse.json(
      {
        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
          profilePic: user.profilePic,
          bio: user.bio,
          createdAt: user.createdAt,
        },
        message: "Logged in successfully",
        success: true,
      },
      { status: 200 }
    );
    const token = generateToken(user._id, user.username);
    return saveCookie(token, response);
  } catch (error) {
    console.log("Error in login route : ", error);
    return NextResponse.json(
      { message: "Internal server error", success: false, error: true },
      { status: 500 }
    );
  }
}
