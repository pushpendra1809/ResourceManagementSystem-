import { SessionProvider } from "next-auth/react";
import Dashboard from "./_components/Dashboard";


export default function Home() {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  )
}
