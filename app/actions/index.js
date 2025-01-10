"use server"

import { signIn } from "@/auth.config";

export async function credentialLogin(data) {
    try {
       const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })
        return response;
    } catch(error) {
        throw new Error(error);
    }
}

export async function doSocialLogin(formData) {
    const action = formData.get("action");
    await signIn(action, { redirectTo: "/courses"})
}