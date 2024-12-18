import { EmailDataType, ReminderEmailDataType } from "@/types/email-type";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function ReminderEmail({
  data,
}: {
  data: ReminderEmailDataType;
}) {
  return (
    <>
      <Html>
        <Head />
        <Preview>
          Reminder for {data?.resourceName} booking on {data?.reminderDate}
        </Preview>
        <Body style={styles.main}>
          <Container style={styles.container}>
            <Section style={styles.box}>
              <Img
                src={`https://lnmiit.ac.in/wp-content/uploads/2023/07/LNMIIT-Logo-Transperant-Background.png`}
                width="49"
                height="21"
                alt="Lnmiit logo"
                style={styles.image}
              />
              <Hr style={styles.hr} />
              <Text style={styles.paragraph}>Dear {data?.name},</Text>
              <Text style={styles.paragraph}>
                We hope this message finds you well! Here&#39;s a quick reminder
                about your upcoming booking.
              </Text>
              <Hr style={styles.hr} />
              <Text style={styles.paragraph}>
                <strong>Booking Information:</strong>
              </Text>
              <Text style={styles.paragraph}>
                Resource Name : {data?.resourceName}
              </Text>
              <Text style={styles.paragraph}>Date : {data?.reminderDate}</Text>
              <Text style={styles.paragraph}>
                time : {data?.startTime} - {data?.endTime}
              </Text>
              <Text style={styles.paragraph}>
                Description : {data?.description}
              </Text>
              <Button
                style={styles.button}
                href={`${process.env.NEXTAUTH_URL}/my-booking`}
              >
                View your Booking
              </Button>
              <Hr style={styles.hr} />

              <Text style={styles.paragraph}>
                If you have any changes or need assistance, don’t hesitate to
                contact us.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
  },
  main: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },
  box: {
    padding: "0 48px",
  },
  hr: {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  },
  paragraph: {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
  },
  button: {
    backgroundColor: "#656ee8",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
    padding: "10px",
  },
  footer: {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
  },
  image: {
    height: "100px",
    width: "auto",
  },
};
