"use server";
import ReminderEmail from "@/emails/ReminderEmail";
import RequestAcceptedEmail from "@/emails/RequestAcceptedEmail";
import RequestRejectEmail from "@/emails/RequestRejectEmail";
import { ReminderEmailDataType } from "@/types/email-type";
import { Resend } from "resend";

export const requestRejectEmail = async (data: any) => {
  const emailData = {
    ...data,
    subject: `Regarding your ${data.resourceName} booking request`,
  };
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const res = await resend.emails.send({
      from: "noreply@bypawan.online",
      to: emailData.email,
      subject: emailData.subject,
      react: RequestRejectEmail({ data }),
    });

    console.log(res);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};

export const requestAcceptEmail = async (data: any) => {
  const emailData = {
    ...data,
    subject: `Regarding your ${data.resourceName} booking request`,
  };
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const res = await resend.emails.send({
      from: "noreply@bypawan.online",
      to: emailData.email,
      subject: emailData.subject,
      react: RequestAcceptedEmail({ data }),
    });

    console.log(res);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};

export const reminderEmail = async (data: ReminderEmailDataType) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const res = await resend.emails.send({
      from: "reminder@bypawan.online",
      to: data.userEmail,
      subject: `Reminder: Your Booking on ${data.reminderDate} `,
      react: ReminderEmail({ data }),
    });

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};
