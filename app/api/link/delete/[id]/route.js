import connectDB from "@/lib/config/db";
import { Link } from "@/models/link.model";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    }
    await connectDB();
    const link = await Link.findByIdAndDelete(id);
    if (!link) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in delete link route : ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
