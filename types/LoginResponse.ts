import { User } from "@prisma/client";

export type LoginResponse = {
  user: {
    id: number;
    email: string;
    name: string | null;
  };
  token: string;
};

export type SafeUser = Omit<User, "password">;
