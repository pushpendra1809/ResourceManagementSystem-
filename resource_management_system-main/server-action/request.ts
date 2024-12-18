"use server";

import dbConnect from "@/lib/dbConnect";
import { Request } from "@/model/requestModel";
import { User } from "@/model/userModel";
import { RequestModelType } from "@/types/model-type";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const createRequest = async ({
  date,
  startTime,
  endTime,
  resourceName,
  description,
  createdBy,
  label,
}: {
  date: Date;
  startTime: string;
  endTime: string;
  resourceName: string;
  description: string;
  createdBy: string;
  label: string;
}) => {
  if (!ObjectId.isValid(createdBy)) throw new Error("Invalid user id");
  const userId = new ObjectId(createdBy);
  const request = {
    date,
    startTime,
    endTime,
    description,
    resourceName,
    createdBy: userId,
    label,
    status: "pending",
  };
  console.log("request: ", request);
  await dbConnect();
  await Request.create(request);
};

export const getAllRequests = async () => {
  await dbConnect();
  const requests = await Request.find({}).populate("createdBy").lean();
  return JSON.parse(JSON.stringify(requests));
};

export const getRequestsByUser = async (userId: string) => {
  if (!ObjectId.isValid(userId)) throw new Error("You are not Login");
  const userIdObject = new ObjectId(userId);
  await dbConnect();
  const requests = await Request.find({ createdBy: userIdObject });
  return JSON.parse(JSON.stringify(requests));
};

export const deleteRequest = async (id: ObjectId) => {
  try {
    await dbConnect();
    await Request.deleteOne({ _id: id });
    return {
      success: true,
      message: "booking Request deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const updateStatusRequest = async (
  id: ObjectId,
  status: RequestModelType["status"]
) => {
  try {
    await dbConnect();
    await Request.updateOne({ _id: id }, { status });
    return {
      success: true,
      message: "booking Request updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};
