"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { createRequest } from "@/server-action/request";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import ResourcePicker from "./ResourcePicker";
import { IoArrowBackOutline } from "react-icons/io5";

const formSchema = z
  .object({
    date: z.date(),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
    resourceName: z.string().min(1, { message: "Resource is not selected" }),
    description: z.string().min(1, { message: "Description is required" }),
  })
  .refine(
    (data) => {
      const startDateTime = parseTime(data.startTime, data.date);
      const endDateTime = parseTime(data.endTime, data.date);

      return endDateTime > startDateTime;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

const parseTime = (timeString: string, date: Date): Date => {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  const adjustedHours =
    period.toUpperCase() === "PM" && hours < 12 ? hours + 12 : hours;
  const finalHours =
    period.toUpperCase() === "AM" && hours === 12 ? 0 : adjustedHours;

  const parsedDate = new Date(date);
  parsedDate.setHours(finalHours, minutes, 0, 0);

  return parsedDate;
};

const BookingForm = ({
  resourceList,
  label,
  setShowForm,
}: {
  resourceList: string[];
  label: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      resourceName: "",
      startTime: "",
      endTime: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createRequest({ ...data, createdBy: userId || "", label });
      form.reset();
      toast.success("Request created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create request");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-4/5">
        <CardHeader className="flex flex-row gap-2">
          <Button
            onClick={() => {
              setShowForm(false);
            }}
            className="text-xl text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <IoArrowBackOutline />
          </Button>
          <span>{label} Booking</span>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-12 gap-5"
            >
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="col-span-12 flex flex-col gap-1">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <TimePicker setTime={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <TimePicker setTime={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resourceName"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Resource</FormLabel>
                    <FormControl>
                      <ResourcePicker
                        resource={field.value}
                        setResource={field.onChange}
                        resourceList={resourceList}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Reason for booking...."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-12">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-24"
                >
                  {form.formState.isSubmitting ? "loading..." : "submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
