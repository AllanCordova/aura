/**
 * @jest-environment node
 */
import {
  createManyUserService,
  createUserService,
  getUserService,
} from "@/services/UserService";
import prisma from "@/lib/prisma";

describe("Create get flow", () => {
  beforeEach(async () => {
    const newUsers = [
      {
        name: "Allan",
        email: "teste@abstracao.com",
      },
      {
        name: "Maria",
        email: "maria@abstracao.com",
      },
      {
        name: "João",
        email: "joão@abstracao.com",
      },
    ];

    await createManyUserService(newUsers);
  });
  it("deve pegar os usuarios corretamente", async () => {
    const data = await getUserService();

    expect(data.data![0].name).toBe("Allan");
    expect(data.data![2].name).toBe("João");
  });

  it("Deve retonar undefined para dados inexistentes", async () => {
    const data = await getUserService();

    expect(data.data![3]).toBe(undefined);
  });
});

describe("Create service flow", () => {
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
