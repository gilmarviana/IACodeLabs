"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase-client" // Importar o cliente Supabase

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`, // URL para onde o usuário será redirecionado após clicar no link do e-mail
    })

    if (supabaseError) {
      setError(supabaseError.message)
    } else {
      setMessage("Se um usuário com este e-mail existir, um link de redefinição de senha foi enviado para ele.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Esqueceu sua Senha?</CardTitle>
          <CardDescription>Digite seu e-mail para redefinir sua senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full">
              Redefinir Senha
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Lembrou da sua senha?{" "}
            <Link className="underline" href="/auth/login">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
