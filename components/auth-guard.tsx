"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase-client"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: ("admin" | "client")[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (error || !profile) {
        console.error("Error fetching profile:", error?.message)
        router.push("/auth/login")
        return
      }

      if (allowedRoles.includes(profile.role as "admin" | "client")) {
        setIsAuthorized(true)
      } else {
        // Redirect to a generic dashboard or login if role is not allowed
        router.push("/auth/login") // Or a specific unauthorized page
      }
      setLoading(false)
    }

    checkAuth()
  }, [router, allowedRoles])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando autenticação...</div>
  }

  if (!isAuthorized) {
    return null // Or a message like "Você não tem permissão para acessar esta página."
  }

  return <>{children}</>
}
