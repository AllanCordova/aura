/**
 * @jest-environment node
 */
import createUserAction from "@/actions/UserAction";
import prisma from "@/lib/prisma";
import { createFormData } from "../../../utils/createFormData";

describe("Action: User Flow", () => {
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
