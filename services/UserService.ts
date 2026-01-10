import prisma from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { getErrorMessage } from "@/lib/ErrorMessages";
import { ApiResponse } from "@/types/ApiRespone";

export async function createUserService(
  data: Prisma.UserCreateInput
): Promise<ApiResponse<User>> {
  try {
    const user = await prisma.user.create({ data });
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
