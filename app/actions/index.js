"use server";

import { signIn } from "@/auth.config";

export async function credentialLogin(data) {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      return { error: "Invalid email or password" };
    }

    return { success: true };
  } catch (error) {
    return { error: "Invalid email or password" };
  }
}