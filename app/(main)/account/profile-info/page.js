import { auth } from "@/auth.config";
import ProfileUpdate from "../components/ProfileUpdate";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-xl font-bold text-slate-900">Update Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Update your account details and personal profile picture.
        </p>
      </div>

      <ProfileUpdate />
    </div>
  );
}