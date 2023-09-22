//[[...sign-up]] This is a convention that allows clert to have all the authentication routes in one place
import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <SignUp />;
}