"use server";

import dbConnect from "@/lib/dbConnect";
import { Reminder } from "@/model/reminder";
import { ReminderEmailDataType } from "@/types/email-type";
import { ReminderModelType } from "@/types/model-type";
import { ObjectId } from "mongodb";

export const getAllReminders = async () => {
  try {
    dbConnect();
    const reminders = (await Reminder.find({})) as ReminderModelType[];
    return {
      success: true,
      data: reminders,
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const createReminder = async (reminder: ReminderEmailDataType) => {
  try {
    await dbConnect();
    console.log("reminder: ", reminder);
    await Reminder.create(reminder);
    return {
      success: true,
      message: "Reminder created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};

export const deleteReminder = async (id: ObjectId) => {
  try {
    await dbConnect();
    await Reminder.findByIdAndDelete(id);
    return {
      success: true,
      message: "Reminder deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
};
