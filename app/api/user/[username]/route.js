import connectDB from "@/lib/config/db";
import { Link } from "@/models/link.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    await connectDB();
    const { username } = await params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const links = await Link.find({ user: user._id });
    return NextResponse.json({ user, links }, { status: 200 });
  } catch (error) {
    console.log("Error in get profile route : ", error);
    return NextResponse.json(
      { message: "Internal sever error" },
      { status: 500 }
    );
  }
}
