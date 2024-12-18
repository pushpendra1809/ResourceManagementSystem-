"use server";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/userModel";
import { compare, hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";
import { ObjectId } from "mongodb";
import { Request } from "@/model/requestModel";

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (user) throw new Error("user already exists");

    const hashedPassword = await hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    console.log("user created");
    return {
      success: true,
      message: "User Signup Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export const logoutUser = async () => {
  await signOut();
};

export const getAllUser = async () => {
  try {
    await dbConnect();
    const res = await User.find({});
    return {
      success: true,
      data: JSON.parse(JSON.stringify(res)),
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};
export const deleteUser = async (id: ObjectId) => {
  try {
    await dbConnect();
    await User.findByIdAndDelete(id);
    await Request.deleteMany({ createdBy: id });
    return {
      success: true,
      message: "user deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const approveUser = async (id: ObjectId) => {
  try {
    await dbConnect();
    await User.findByIdAndUpdate(id, { verified: true });
    return {
      success: true,
      message: "user approved successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const getUserData = async (id: string | undefined) => {
  try {
    await dbConnect();
    if (id === undefined) throw new Error("user not found");
    const user = await User.findById(id);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const changeRole = async (id: ObjectId, role: "user" | "admin") => {
  try {
    await dbConnect();
    await User.findByIdAndUpdate(id, { role: role });
    return {
      success: true,
      message: "Role updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const changePassword = async (
  id: string | undefined,
  oldPassword: string,
  newPassword: string
) => {
  try {
    if (id === undefined) throw new Error("user not found");
    await dbConnect();
    const user = await User.findById(id);
    const isMatch = await compare(oldPassword, user.password);
    if (!isMatch)
      return {
        success: false,
        message: "Old Password is incorrect",
      };
    const hashedPassword = await hash(newPassword, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });
    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};
