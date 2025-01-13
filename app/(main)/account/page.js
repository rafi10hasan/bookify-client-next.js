
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
export default async function Account(){
    const session = await auth();
    if(!session){
        redirect('/login')
    }
    else{
        redirect('/account/profile-info')
    }  
}