"use client"

import { useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import removido, já incluso acima

export function AdminDashboardEditor() {
  const [dashboardSettings, setDashboardSettings] = useState({
    header_title: "Dashboard Administrativo",
    overview_card_bg_color: "#1F2937", // Cor de fundo dos cards de overview
    overview_text_color: "#F9FAFB",
    overview_button_bg_color: "#009FCC",
    overview_button_text_color: "#FFFFFF",
    // Placeholder para outras seções do dashboard
    contacts_card_bg_color: "#1F2937",
    contacts_text_color: "#F9FAFB",
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
    console.log("Saving admin dashboard settings:", dashboardSettings)
    setMessage("Configurações do Dashboard Admin salvas com sucesso!")
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#FAFAFA] mb-2">Personalização do Dashboard Admin</h2>
      <p className="text-[#FAFAFA] mb-4">Altere informações, textos, cores de fundo e botões das páginas do dashboard.</p>
      <Collapsible defaultOpen className="bg-[#000000] rounded-lg shadow-sm">
        <CollapsibleTrigger className="flex items-center w-full px-4 py-3 text-lg font-semibold text-[#009FCC] hover:bg-[#1F2E4F] rounded-t-lg transition cursor-pointer">
          <ChevronDown className="mr-2 h-5 w-5" /> Cabeçalho
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 space-y-4">
          <div className="grid gap-4">
            <Label htmlFor="header_title">Título do Cabeçalho do Dashboard</Label>
            <Input
              id="header_title"
              value={dashboardSettings.header_title}
              onChange={(e) => setDashboardSettings({ ...dashboardSettings, header_title: e.target.value })}
              className="bg-input border-border text-foreground"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible defaultOpen className="bg-[#000000] rounded-lg shadow-sm">
        <CollapsibleTrigger className="flex items-center w-full px-4 py-3 text-lg font-semibold text-[#009FCC] hover:bg-[#1F2E4F] rounded-t-lg transition cursor-pointer">
          <ChevronDown className="mr-2 h-5 w-5" /> Cores dos Cards de Visão Geral
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 space-y-4">
          <div className="grid gap-4">
            <Label htmlFor="overview_card_bg_color">Cor de Fundo do Card (Hex)</Label>
            <Input
              id="overview_card_bg_color"
              type="color"
              value={dashboardSettings.overview_card_bg_color}
              onChange={(e) => setDashboardSettings({ ...dashboardSettings, overview_card_bg_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="overview_text_color">Cor do Texto do Card (Hex)</Label>
            <Input
              id="overview_text_color"
              type="color"
              value={dashboardSettings.overview_text_color}
              onChange={(e) => setDashboardSettings({ ...dashboardSettings, overview_text_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="overview_button_bg_color">Cor de Fundo do Botão (Hex)</Label>
            <Input
              id="overview_button_bg_color"
              type="color"
              value={dashboardSettings.overview_button_bg_color}
              onChange={(e) => setDashboardSettings({ ...dashboardSettings, overview_button_bg_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="overview_button_text_color">Cor do Texto do Botão (Hex)</Label>
            <Input
              id="overview_button_text_color"
              type="color"
              value={dashboardSettings.overview_button_text_color}
              onChange={(e) => setDashboardSettings({ ...dashboardSettings, overview_button_text_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={handleSave} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
        <Save className="mr-2 h-4 w-4" /> {loading ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </div>
  )
}
