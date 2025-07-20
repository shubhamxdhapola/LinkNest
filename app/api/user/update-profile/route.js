import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { profilePic, name, username, bio, userId } = await req.json();
    if (!userId)
      return NextResponse.json(
        { message: "UserId is required" },
        { status: 400 }
      );

    const user = await User.findOne({ username, _id: { $ne: userId } });
    if (user) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic, name, username, bio },
      { runValidators: true, new: true }
    );
    return NextResponse.json(
      { updatedUser, message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in update profile route : ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
