/**
 * @jest-environment node
 */
import { createUserAction, getUserAction } from "@/actions/UserAction";
import prisma from "@/lib/prisma";
import { createFormData } from "../../../utils/createFormData";
import { createManyUserService } from "@/services/UserService";

describe("Get Action: User Flow", () => {
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

  it("Get all data", async () => {
    const data = await getUserAction();

    expect(data.success).toBe(true);

    expect(data.data![0].name).toBe("Allan");

    expect(data.data![2].name).toBe("João");
  });

  it("Get not fount data", async () => {
    const data = await getUserAction();

    expect(data.success).toBe(true);

    expect(data.data![3]).toBe(undefined);
  });
});

describe("Create Action: User Flow", () => {
  it("Create a valid data", async () => {
    const newUser = {
      name: "Allan",
      email: "teste@abstracao.com",
    };

    const formData = createFormData(newUser);

    const result = await createUserAction(formData);

    expect(result.success).toBe(true);

    const savedUser = await prisma.user.findUnique({
      where: { email: newUser.email },
    });

    expect(savedUser?.name).toBe("Allan");
  });

  it("Try create a exist data", async () => {
    const newUser = {
      name: "Allan",
      email: "teste@abstracao.com",
    };

    const formData = createFormData(newUser);

    const result = await createUserAction(formData);

    expect(result.success).toBe(true);

    const reply = await createUserAction(formData);

    expect(reply.success).toBe(false);
  });

  it("Not creat a invalid data", async () => {
    const newUser = {
      name: "Allan",
    };

    const formData = createFormData(newUser);

    const result = await createUserAction(formData);

    expect(result.success).toBe(false);
  });

  it("Exist record error message", async () => {
    const newUser = {
      name: "Allan",
      email: "teste@abstracao.com",
    };

    const formData = createFormData(newUser);

    const result = await createUserAction(formData);

    expect(result.success).toBe(true);

    const reply = await createUserAction(formData);

    expect(reply.error).toBe(
      "Este dado já está sendo utilizado em outro cadastro."
    );
  });
});
