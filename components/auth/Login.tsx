"use client";

import { useState } from "react";
import { login } from "@/actions/AuthAction";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ... dentro do componente ...
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    setLoading(true);
    setMessage("");

    const result = await login(formData);

    if (result.success) {
      setMessage("✅ Login realizado! Redirecionando...");
      // O cookie já está salvo. Basta ir para a home ou dashboard.
      router.push("/dashboard");
      // router.refresh(); // Opcional: para garantir que o layout atualize
    } else {
      setMessage(`❌ Erro: ${result.error}`);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Acesse sua conta
        </h1>

        <form action={handleLogin} className="space-y-4">
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-green-300"
          >
            {loading ? "Entrando..." : "Entrar"}
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
