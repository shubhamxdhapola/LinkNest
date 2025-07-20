import { NextResponse } from "next/server";

export function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.log("Error in logout route : ", error);
    return NextResponse.json(
      { message: "Internal server error", success: false, error: true },
      { status: 500 }
    );
  }
}
