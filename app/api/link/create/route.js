import connectDB from "@/lib/config/db";
import { Link } from "@/models/link.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, url, user } = await req.json();
    if (!title || !url || !user) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const link = await Link.create({ title, url, user });
    if (link) {
      return NextResponse.json(
        { link, message: "Link created successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Unable to create link" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error in create link route : ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
