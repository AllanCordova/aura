/**
 * @jest-environment node
 */
import { signUpService } from "@/services/AuthService";
import prisma from "@/lib/prisma";

describe("Create service flow", () => {
  it("deve salvar um usuário no banco de testes real", async () => {
    const newUser = {
      name: "Teste Integration",
      email: "teste@integration.com",
      password: "@Cxteste21",
    };

    const result = await signUpService(newUser);

    expect(result.success).toBe(true);

    const savedUser = await prisma.user.findUnique({
      where: { email: newUser.email },
    });

    expect(savedUser).toBeTruthy();
    expect(savedUser?.email).toBe("teste@integration.com");
  });
});
