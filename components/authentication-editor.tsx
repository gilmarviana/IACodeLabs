"use client"

import type React from "react"

import { useState } from "react"
// Removido Card
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageIcon, Save, Eye, GitCompare, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
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
    button_bg_color: "#009FCC", // Cor do botão principal
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
    // ...upload logic...
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#FAFAFA] mb-2">Personalização de Autenticação</h2>
      <p className="text-[#FAFAFA] mb-4">Altere a imagem de fundo, textos e cores das páginas de login e registro.</p>
      {/* TODO: Insira aqui os grupos colapsáveis e campos de edição, conforme padrão dos outros editores */}
      {/* Exemplo de agrupamento colapsável:
        <Collapsible>
          <CollapsibleTrigger>Grupo 1</CollapsibleTrigger>
          <CollapsibleContent>
            ...inputs...
          </CollapsibleContent>
        </Collapsible>
      */}
    </div>
  )
}

// Remover qualquer bloco JSX solto ou fechamento de tag fora do return principal
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
  )
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 border-[#009FCC] text-[#009FCC] hover:bg-[#1F2E4F] min-w-[180px]">
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
            <Button variant="outline" className="flex-1 border-[#009FCC] text-[#009FCC] hover:bg-[#1F2E4F] min-w-[180px]">
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
            <Button variant="outline" className="flex-1 border-[#009FCC] text-[#009FCC] hover:bg-[#1F2E4F] min-w-[180px]">
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
            <Button variant="outline" className="flex-1 border-[#009FCC] text-[#009FCC] hover:bg-[#1F2E4F] min-w-[180px]">
              <GitCompare className="mr-2 h-4 w-4" /> Comparar Registro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
            <DialogHeader className="p-4 border-b border-border">
              <DialogTitle className="text-foreground">Comparação da Página de Registro</DialogTitle>
              <DialogDescription className="text-m