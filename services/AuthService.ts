import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getErrorMessage } from "@/lib/ErrorMessages";
import { ApiResponse } from "@/types/ApiRespone";
import bcrypt from "bcryptjs";
import { LoginResponse, SafeUser } from "@/types/LoginResponse";
import jwt from "jsonwebtoken";

export async function signUpService(
  data: Prisma.UserCreateInput
): Promise<ApiResponse<SafeUser>> {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;

    return { success: true, data: userWithoutPassword };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

export async function loginService(
  data: Prisma.UserCreateInput
): Promise<ApiResponse<LoginResponse>> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return { success: false, error: "E-mail ou senha incorretos" };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "E-mail ou senha incorretos" };
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("Sem Token");
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1d" });

    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
