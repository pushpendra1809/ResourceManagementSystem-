"use server";

// import dbConnect from "@/lib/dbConnect";
// import { User } from "@/model/userModel";
// import { compare } from "bcryptjs";
// import { error } from "console";
// import { CredentialsSignin } from "next-auth";

// export const authLoginCheck = async (
//   credentials: Partial<Record<"email" | "password", unknown>>
// ) => {
//   const email = credentials.email as string | undefined;
//   const password = credentials.password as string | undefined;
//   if (!email || !password)
//     throw new CredentialsSignin({
//       cause: "please provide both email and password",
//     });

//   //connect to db
//   dbConnect();

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) throw new Error("user not found");

//   const isMatch = await compare(password, user.password);

//   if (!isMatch) throw new Error("invalid password");
//   return {
//     id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };
// };

export const demo = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth-login-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    console.log(response);

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }
    console.log(data);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
