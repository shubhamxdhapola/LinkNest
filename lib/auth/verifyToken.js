import { jwtVerify } from "jose";

export default async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log("Error in verifyToken : ", error);
    return null;
  }
}