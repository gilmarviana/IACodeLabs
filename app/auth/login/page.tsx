"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseClient } from "@/lib/supabase-client" // Importar a função getSupabaseClient
import { useRouter } from "next/navigation"
import Image from "next/image"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Adicionar classe para o tema escuro no body
    document.body.classList.add("dark-theme")
    return () => {
      document.body.classList.remove("dark-theme")
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = getSupabaseClient()
    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (supabaseError) {
      setError(supabaseError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Fetch user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profileError || !profile) {
        setError("Erro ao buscar perfil do usuário.")
        setLoading(false)
        await supabase.auth.signOut() // Logout if profile fetch fails
        return
      }

      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userType", profile.role)

      if (profile.role === "admin") {
        router.push("/admin")
      } else if (profile.role === "client") {
        router.push("/client/dashboard")
      } else {
        setError("Tipo de usuário desconhecido.")
        setLoading(false)
        await supabase.auth.signOut()
      }
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
            <CardTitle className="text-3xl font-bold text-[#009FCC]">Entrar</CardTitle>
            <CardDescription className="text-gray-400">Acesse sua conta IA Code Labs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    className="text-sm underline text-[#009FCC] hover:text-[#00BFFF]"
                    href="/auth/forgot-password"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
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
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link className="underline text-[#009FCC] hover:text-[#00BFFF]" href="/auth/register">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
