"use server";
import { getErrorMessage } from "@/lib/ErrorMessages";
import { createUserSchema, loginSchema } from "@/lib/schemas/UserSchema";
import { signUpService } from "@/services/AuthService";
import { loginService } from "@/services/AuthService";
import { ApiResponse } from "@/types/ApiRespone";
import { SafeUser } from "@/types/LoginResponse";
import { cookies } from "next/headers";

export async function signUp(
  formData: FormData
): Promise<ApiResponse<SafeUser>> {
  const rawData = Object.fromEntries(formData);

  const validation = createUserSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      error: getErrorMessage(validation.error),
    };
  }

  const result = await signUpService(validation.data);

  if (result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, data: result.data };
}

export async function Login(
  formData: FormData
): Promise<ApiResponse<SafeUser>> {
  const rawData = Object.fromEntries(formData);

  const validation = loginSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      error: getErrorMessage(validation.error),
    };
  }

  const result = await loginService(validation.data);

  if (result.error) {
    return { success: false, error: result.error };
  }

  if (!result.data) {
    return { success: false, data: undefined };
  }

  await setCookies(result.data.token);

  return { success: true, data: result.data.user };
}

async function setCookies(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}
