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

export async function createManyUserService(
  data: Prisma.UserCreateInput[]
): Promise<ApiResponse<User[]>> {
  try {
    await prisma.user.createMany({ data });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

export async function getUserService(): Promise<ApiResponse<User[]>> {
  try {
    const user = await prisma.user.findMany();
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
