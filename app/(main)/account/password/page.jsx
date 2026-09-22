import { redirect } from "next/navigation";
import ChangePassword from "../components/ChangePassword";
import { auth } from "@/auth.config";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-semibold text-deep-cyan">
        Change Your Password*
      </h1>
      <ChangePassword />
    </div>
  );
}