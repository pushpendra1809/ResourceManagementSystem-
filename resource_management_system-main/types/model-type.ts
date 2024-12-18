import { ObjectId } from "mongodb";
export type UserModelType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: "user" | "admin";
};

export type RequestModelType = {
  _id: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  resourceName: string;
  label: string;
  createdBy: ObjectId;
  status: "pending" | "accepted" | "rejected";
};
export type ReminderModelType = {
  _id: ObjectId;
  name: string;
  userEmail: string;
  reminderDate: string;
  startTime: string;
  endTime: string;
  description: string;
  resourceName: string;
};
export type RequestType = Omit<RequestModelType, "createdBy"> & {
  createdBy: UserModelType;
};
