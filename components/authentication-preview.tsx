import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthSettings {
  background_image_url: string
  login_title: string
  login_description: string
  register_title: string
  register_description: string
  card_bg_color: string
  text_color: string
  button_bg_color: string
  button_text_color: string
}

interface AuthenticationPreviewProps {
  settings: AuthSettings
  type: "login" | "register" // Para renderizar a página de login ou registro
}

export function AuthenticationPreview({ settings, type }: AuthenticationPreviewProps) {
  const title = type === "login" ? settings.login_title : settings.register_title
  const description = type === "login" ? settings.login_description : settings.register_description
  const linkText = type === "login" ? "Cadastre-se" : "Entrar"
  const linkHref = type === "login" ? "/auth/register" : "/auth/login"
  const buttonText = type === "login" ? "Entrar" : "Cadastrar"

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-950 text-gray-50">
      <Image
        src={settings.background_image_url || "/placeholder.svg?height=100&width=200&query=auth background"}
        alt="Background Pattern"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0 opacity-20"
      />
      <div className="relative z-10 w-full max-w-md p-8">
        <Card className="shadow-lg" style={{ backgroundColor: settings.card_bg_color, color: settings.text_color }}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold" style={{ color: settings.button_bg_color }}>
              {title}
            </CardTitle>
            <CardDescription style={{ color: settings.text_color + "cc" }}>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                style={{
                  backgroundColor: settings.card_bg_color,
                  borderColor: settings.text_color + "33",
                  color: settings.text_color,
                }}
              />
            </div>
            {type === "register" && (
              <div className="space-y-2">
                <label htmlFor="full-name" className="block text-sm font-medium">
                  Nome Completo
                </label>
                <input
                  id="full-name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  style={{
                    backgroundColor: settings.card_bg_color,
                    borderColor: settings.text_color + "33",
                    color: settings.text_color,
                  }}
                />
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Senha
                </label>
                {type === "login" && (
                  <Link
                    className="text-sm underline"
                    href="/auth/forgot-password"
                    style={{ color: settings.button_bg_color }}
                  >
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                style={{
                  backgroundColor: settings.card_bg_color,
                  borderColor: settings.text_color + "33",
                  color: settings.text_color,
                }}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: settings.button_bg_color, color: settings.button_text_color }}
            >
              {buttonText}
            </Button>
            <div className="mt-4 text-center text-sm" style={{ color: settings.text_color + "cc" }}>
              {type === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <Link className="underline" href={linkHref} style={{ color: settings.button_bg_color }}>
                {linkText}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
