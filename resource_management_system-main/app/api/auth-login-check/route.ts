import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/userModel";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const email = data.email as string | undefined;
  const password = data.password as string | undefined;
  if (!email || !password)
    return NextResponse.json(
      {
        error: "please provide both email and password",
      },
      { status: 400 }
    );

  //connect to db
  dbConnect();

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return NextResponse.json(
      {
        error: "user not found",
      },
      { status: 404 }
    );

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return NextResponse.json(
      {
        error: "password incorrect",
      },
      { status: 401 }
    );

  return NextResponse.json(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    },
    { status: 200 }
  );
}
