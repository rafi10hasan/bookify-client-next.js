
import { auth } from "@/auth.config";
import ProfileUpdate from "../components/ProfileUpdate";
import { redirect } from "next/navigation";

export default async function Profile(){
    const session = await auth();
    if(!session){
        redirect('/login')
    }
    return (
        <div>
        <h1 className="text-2xl px-6 mb-2 font-semibold text-deep-cyan">update your profile*</h1>
         <ProfileUpdate/>
        </div>
    );
}