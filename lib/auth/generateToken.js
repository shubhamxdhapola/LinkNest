import jwt from "jsonwebtoken";

export default function generateToken(_id, username) {
  return jwt.sign({ _id, username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
