import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

interface AuthenticationComparisonProps {
  editedSettings: AuthSettings
  type: "login" | "register"
}

const defaultAuthSettings = {
  background_image_url: "/images/signup-background.png",
  login_title: "Entrar",
  login_description: "Acesse sua conta IA Code Labs",
  register_title: "Cadastre-se",
  register_description: "Crie sua conta IA Code Labs",
  card_bg_color: "#1F2937",
  text_color: "#F9FAFB",
  button_bg_color: "#9333EA",
  button_text_color: "#FFFFFF",
}

export function AuthenticationComparison({ editedSettings, type }: AuthenticationComparisonProps) {
  const title = type === "login" ? editedSettings.login_title : editedSettings.register_title
  const description = type === "login" ? editedSettings.login_description : editedSettings.register_description
  const linkText = type === "login" ? "Cadastre-se" : "Entrar"
  const linkHref = type === "login" ? "/auth/register" : "/auth/login"
  const buttonText = type === "login" ? "Entrar" : "Cadastrar"

  const isChanged = (key: keyof AuthSettings) => editedSettings[key] !== defaultAuthSettings[key]

  const HighlightBadge = () => (
    <span className="ml-2 inline-flex items-center rounded-md bg-yellow-400/20 px-2 py-0.5 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20">
      Alterado
    </span>
  )

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-950 text-gray-50">
      <Image
        src={editedSettings.background_image_url || "/placeholder.svg?height=100&width=200&query=auth background"}
        alt="Background Pattern"
        layout="fill"
        objectFit="cover"
        quality={100}
        className={cn(
          "absolute inset-0 z-0 opacity-20",
          isChanged("background_image_url") && "border-4 border-yellow-500",
        )}
      />
      <div className="relative z-10 w-full max-w-md p-8">
        <Card
          className={cn("shadow-lg", isChanged("card_bg_color") && "border-2 border-yellow-500")}
          style={{ backgroundColor: editedSettings.card_bg_color, color: editedSettings.text_color }}
        >
          <CardHeader className="space-y-1 text-center">
            <CardTitle
              className={cn(
                "text-3xl font-bold",
                isChanged(type === "login" ? "login_title" : "register_title") && "bg-yellow-900/30 p-1 rounded",
              )}
              style={{ color: editedSettings.button_bg_color }}
            >
              {title}
              {isChanged(type === "login" ? "login_title" : "register_title") && <HighlightBadge />}
            </CardTitle>
            <CardDescription
              className={cn(
                isChanged(type === "login" ? "login_description" : "register_description") &&
                  "bg-yellow-900/30 p-1 rounded",
              )}
              style={{ color: editedSettings.text_color + "cc" }}
            >
              {description}
              {isChanged(type === "login" ? "login_description" : "register_description") && <HighlightBadge />}
            </CardDescription>
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
                  backgroundColor: editedSettings.card_bg_color,
                  borderColor: editedSettings.text_color + "33",
                  color: editedSettings.text_color,
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
                    backgroundColor: editedSettings.card_bg_color,
                    borderColor: editedSettings.text_color + "33",
                    color: editedSettings.text_color,
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
                    style={{ color: editedSettings.button_bg_color }}
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
                  backgroundColor: editedSettings.card_bg_color,
                  borderColor: editedSettings.text_color + "33",
                  color: editedSettings.text_color,
                }}
              />
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full",
                (isChanged("button_bg_color") || isChanged("button_text_color")) && "border-2 border-yellow-500",
              )}
              style={{ backgroundColor: editedSettings.button_bg_color, color: editedSettings.button_text_color }}
            >
              {buttonText}
              {(isChanged("button_bg_color") || isChanged("button_text_color")) && <HighlightBadge />}
            </Button>
            <div className="mt-4 text-center text-sm" style={{ color: editedSettings.text_color + "cc" }}>
              {type === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <Link className="underline" href={linkHref} style={{ color: editedSettings.button_bg_color }}>
                {linkText}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
