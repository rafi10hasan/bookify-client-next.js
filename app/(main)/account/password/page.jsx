
import { redirect } from "next/navigation";
import ChangePassword from "../components/ChangePassword";
import { auth } from "@/auth.config";

export default async function Profile(){
    const session = await auth();
    if(!session){
        redirect('/login')
      }
    return (
        <div>
        <h1 className="text-2xl px-6 mb-2 font-semibold text-deep-cyan">Change Your Password*</h1>
         <ChangePassword/>
        </div>
    );
}