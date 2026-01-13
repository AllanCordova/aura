"use client";

import { useState } from "react";
import { signUp } from "@/actions/AuthAction";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignUp(formData: FormData) {
    setLoading(true);
    setMessage("");

    const result = await signUp(formData);

    if (result.success) {
      setMessage("✅ Usuário criado com sucesso! Verifique o console.");
      console.log("Usuário criado:", result.data);
      // Aqui você redirecionaria para o login: router.push('/login')
    } else {
      setMessage(`❌ Erro: ${result.error}`);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crie sua conta
        </h1>

        <form action={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              name="password"
              type="password"
              placeholder="******"
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 8 caracteres, maiúscula, minúscula, número e símbolo.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Criando..." : "Cadastrar"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-center text-sm ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
