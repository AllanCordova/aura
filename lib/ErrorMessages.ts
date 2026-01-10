import { Prisma } from "@prisma/client";

const prismaErrorMap: Record<string, string> = {
  P2002: "Este dado já está sendo utilizado em outro cadastro.",
  P2025: "O registro solicitado não foi encontrado.",
  P2003: "Não é possível realizar esta operação devido a dados vinculados.",
  P2000: "O valor informado é muito longo para este campo.",
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const friendlyMessage = prismaErrorMap[error.code];

    return friendlyMessage || `Erro Prisma ${error.code}: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return `Ocorreu um erro inesperado: ${String(error)}`;
}
