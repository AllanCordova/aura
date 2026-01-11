"use server";

import { getErrorMessage } from "@/lib/ErrorMessages";
import { createUserSchema } from "@/lib/schemas/UserSchema";
import { createUserService, getUserService } from "@/services/UserService";
import { ApiResponse } from "@/types/ApiRespone";
import { User } from "@prisma/client";

export async function getUserAction(): Promise<ApiResponse<User[]>> {
  const result = await getUserService();

  if (result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, data: result.data };
}

export async function createUserAction(
  formData: FormData
): Promise<ApiResponse<User>> {
  const rawData = Object.fromEntries(formData);

  const validation = createUserSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      error: getErrorMessage(validation.error),
    };
  }

  const result = await createUserService(validation.data);

  if (result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, data: result.data };
}
