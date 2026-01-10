/**
 * @jest-environment node
 */
import { createUserService } from "@/services/UserService";
import prisma from "@/lib/prisma";

describe("Integration: User Flow", () => {
  it("deve salvar um usuário no banco de testes real", async () => {
    const newUser = {
      name: "Teste Integration",
      email: "teste@integration.com",
    };

    const result = await createUserService(newUser);

    expect(result.success).toBe(true);

    const savedUser = await prisma.user.findUnique({
      where: { email: newUser.email },
    });

    expect(savedUser).toBeTruthy();
    expect(savedUser?.email).toBe("teste@integration.com");
  });
});
