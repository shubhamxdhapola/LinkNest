import connectDB from "@/lib/config/db";
import { Link } from "@/models/link.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { title, url } = await req.json();
    const { id } = await params;

    if (!title || !url || !id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const link = await Link.findOne({ _id: id });
    if (!link) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, url },
      { new: true, runValidators: true }
    );
    return NextResponse.json(
      { updatedLink, message: "Link updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in update link route : ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
