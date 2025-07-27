"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageIcon, Save, Eye, GitCompare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { AuthenticationPreview } from "./authentication-preview"
import { OriginalAuthentication } from "./original-authentication"
import { AuthenticationComparison } from "./authentication-comparison"

export function AuthenticationEditor() {
  const [authSettings, setAuthSettings] = useState({
    background_image_url: "/placeholder.svg?height=100&width=200",
    login_title: "Entrar",
    login_description: "Acesse sua conta IA Code Labs",
    register_title: "Cadastre-se",
    register_description: "Crie sua conta IA Code Labs",
    card_bg_color: "#1F2937", // Cor de fundo do card no tema escuro
    text_color: "#F9FAFB", // Cor do texto no tema escuro
    button_bg_color: "#9333EA", // Cor do botão principal
    button_text_color: "#FFFFFF",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  // Placeholder for actual data fetching/saving logic
  const handleSave = async () => {
    setLoading(true)
    setMessage("")
    setError("")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving authentication settings:", authSettings)
    setMessage("Configurações de Autenticação salvas com sucesso!")
    setLoading(false)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setError("Por favor, selecione uma imagem para upload.")
      return
    }
    const file = event.target.files[0]
    // Simulate upload and get URL
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    const imageUrl = URL.createObjectURL(file) // Replace with actual storage URL
    setAuthSettings((prev) => ({ ...prev, background_image_url: imageUrl }))
    setMessage("Imagem de fundo enviada com sucesso!")
    setLoading(false)
  }

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Personalização de Autenticação</CardTitle>
        <CardDescription className="text-muted-foreground">
          Altere a imagem de fundo, textos e cores das páginas de login e registro.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <Label htmlFor="auth_bg_image">Imagem de Fundo</Label>
          <div className="flex items-center gap-4">
            <Input id="auth_bg_image" type="file" onChange={handleImageUpload} className="flex-1" />
            {authSettings.background_image_url && (
              <img
                src={authSettings.background_image_url || "/placeholder.svg"}
                alt="Auth Background Preview"
                className="w-24 h-16 object-cover rounded-md border border-border"
              />
            )}
          </div>
          <CardDescription className="text-muted-foreground flex items-center gap-1">
            <ImageIcon className="h-4 w-4" />
            Faça upload de uma nova imagem para o fundo das páginas de autenticação.
          </CardDescription>
        </div>

        <div className="grid gap-4">
          <Label htmlFor="login_title">Título da Página de Login</Label>
          <Input
            id="login_title"
            value={authSettings.login_title}
            onChange={(e) => setAuthSettings({ ...authSettings, login_title: e.target.value })}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="login_description">Descrição da Página de Login</Label>
          <Textarea
            id="login_description"
            value={authSettings.login_description}
            onChange={(e) => setAuthSettings({ ...authSettings, login_description: e.target.value })}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="register_title">Título da Página de Registro</Label>
          <Input
            id="register_title"
            value={authSettings.register_title}
            onChange={(e) => setAuthSettings({ ...authSettings, register_title: e.target.value })}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="register_description">Descrição da Página de Registro</Label>
          <Textarea
            id="register_description"
            value={authSettings.register_description}
            onChange={(e) => setAuthSettings({ ...authSettings, register_description: e.target.value })}
            className="bg-input border-border text-foreground"
          />
        </div>

        <div className="grid gap-4">
          <Label htmlFor="card_bg_color">Cor de Fundo do Card (Hex)</Label>
          <Input
            id="card_bg_color"
            type="color"
            value={authSettings.card_bg_color}
            onChange={(e) => setAuthSettings({ ...authSettings, card_bg_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="text_color">Cor do Texto (Hex)</Label>
          <Input
            id="text_color"
            type="color"
            value={authSettings.text_color}
            onChange={(e) => setAuthSettings({ ...authSettings, text_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="button_bg_color">Cor de Fundo do Botão (Hex)</Label>
          <Input
            id="button_bg_color"
            type="color"
            value={authSettings.button_bg_color}
            onChange={(e) => setAuthSettings({ ...authSettings, button_bg_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="button_text_color">Cor do Texto do Botão (Hex)</Label>
          <Input
            id="button_text_color"
            type="color"
            value={authSettings.button_text_color}
            onChange={(e) => setAuthSettings({ ...authSettings, button_text_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 min-w-[180px]"
          >
            <Save className="mr-2 h-4 w-4" /> {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-accent min-w-[180px]"
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar Login
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Pré-visualização da Página de Login</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é uma pré-visualização das suas alterações na página de login.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <AuthenticationPreview settings={authSettings} type="login" />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-accent min-w-[180px]"
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Pré-visualização da Página de Registro</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é uma pré-visualização das suas alterações na página de registro.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <AuthenticationPreview settings={authSettings} type="register" />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-accent min-w-[180px]"
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar Original
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Páginas de Autenticação Originais</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é a versão original das páginas de login e registro do sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <OriginalAuthentication />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-accent min-w-[180px]"
              >
                <GitCompare className="mr-2 h-4 w-4" /> Comparar Login
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Comparação da Página de Login</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é a página de login original com suas alterações destacadas.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <AuthenticationComparison editedSettings={authSettings} type="login" />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-accent min-w-[180px]"
              >
                <GitCompare className="mr-2 h-4 w-4" /> Comparar Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Comparação da Página de Registro</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é a página de registro original com suas alterações destacadas.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <AuthenticationComparison editedSettings={authSettings} type="register" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
