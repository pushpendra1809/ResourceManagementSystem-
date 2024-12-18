export const dynamic = "force-dynamic";
import { reminderEmail } from "@/server-action/emails";
import { deleteReminder, getAllReminders } from "@/server-action/reminder";
import { format } from "date-fns";

export async function GET() {
  try {
    const res = await getAllReminders();
    if (!res.success) return new Response(res.message, { status: 400 });
    const reminders = res.data;
    if (!reminders || reminders.length === 0)
      return new Response("No reminders found", { status: 200 });
    const todayReminders = reminders.filter(
      (reminder) => reminder.reminderDate === format(new Date(), "dd MMM yyyy")
    );
    for (const reminder of todayReminders) {
      await reminderEmail(reminder);
    }
    // for (const reminder of todayReminders) {
    //   await deleteReminder(reminder._id);
    // }

    return new Response(JSON.stringify(todayReminders), { status: 200 });
  } catch (error) {
    return new Response(String(error));
  }
}
