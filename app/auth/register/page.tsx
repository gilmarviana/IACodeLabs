"use client"

export const dynamic = "force-dynamic";

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseClient } from "@/lib/supabase-client" // Importar a função getSupabaseClient
import { RegistrationSuccessModal } from "@/components/registration-success-modal"
import Image from "next/image"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Adicionar classe para o tema escuro no body
    document.body.classList.add("dark-theme")
    return () => {
      document.body.classList.remove("dark-theme")
    }
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = getSupabaseClient()
    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "client", // Default role for new registrations
        },
      },
    })

    if (supabaseError) {
      setError(supabaseError.message)
    } else if (data.user) {
      setIsModalOpen(true)
    }
    setLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-950 text-gray-50">
      <Image
        src="/images/signup-background.png"
        alt="Background Pattern"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0 opacity-20"
      />
      <div className="relative z-10 w-full max-w-md p-8">
        <Card className="bg-gray-900 border-gray-800 text-gray-50 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-[#009FCC]">Cadastre-se</CardTitle>
            <CardDescription className="text-gray-400">Crie sua conta IA Code Labs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Nome Completo</Label>
                <Input
                  id="full-name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400 focus:border-[#009FCC]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400 focus:border-[#009FCC]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400 focus:border-purple-500"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-[#009FCC] hover:bg-[#00BFFF]" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-400">
              Já tem uma conta?{" "}
              <Link className="underline text-[#009FCC] hover:text-[#00BFFF]" href="/auth/login">
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <RegistrationSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} email={email} />
    </div>
  )
}
