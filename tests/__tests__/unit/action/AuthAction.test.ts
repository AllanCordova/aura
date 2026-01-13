/**
 * @jest-environment node
 */
import { signUp } from "@/actions/AuthAction";
import prisma from "@/lib/prisma";
import { createFormData } from "../../../utils/createFormData";

describe("Create Action: User Flow", () => {
  const newUser = {
    name: "Allan",
    email: "teste@abstracao.com",
    password: "testpassworD@12",
  };

  const formData = createFormData(newUser);
  it("Create a valid data", async () => {
    const result = await signUp(formData);

    expect(result.success).toBe(true);

    const savedUser = await prisma.user.findUnique({
      where: { email: newUser.email },
    });

    expect(savedUser?.name).toBe("Allan");
  });

  it("Try create a exist data", async () => {
    const result = await signUp(formData);

    expect(result.success).toBe(true);

    const reply = await signUp(formData);

    expect(reply.success).toBe(false);
  });

  it("Not creat a invalid data", async () => {
    const invalidData = {
      name: "Allan",
    };

    const formData = createFormData(invalidData);

    const result = await signUp(formData);

    expect(result.success).toBe(false);
  });

  it("Exist record error message", async () => {
    const result = await signUp(formData);

    expect(result.success).toBe(true);

    const reply = await signUp(formData);

    expect(reply.error).toBe(
      "Este dado já está sendo utilizado em outro cadastro."
    );
  });
});
