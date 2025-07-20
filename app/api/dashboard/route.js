import verifyToken from "@/lib/auth/verifyToken";
import connectDB from "@/lib/config/db";
import { Link } from "@/models/link.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    const payload = token && (await verifyToken(token));
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(payload._id).select("-password");
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
