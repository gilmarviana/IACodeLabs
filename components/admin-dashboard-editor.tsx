"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function AdminDashboardEditor() {
  const [dashboardSettings, setDashboardSettings] = useState({
    header_title: "Dashboard Administrativo",
    overview_card_bg_color: "#1F2937", // Cor de fundo dos cards de overview
    overview_text_color: "#F9FAFB",
    overview_button_bg_color: "#9333EA",
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
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Personalização do Dashboard Admin</CardTitle>
        <CardDescription className="text-muted-foreground">
          Altere informações, textos, cores de fundo e botões das páginas do dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <Label htmlFor="header_title">Título do Cabeçalho do Dashboard</Label>
          <Input
            id="header_title"
            value={dashboardSettings.header_title}
            onChange={(e) => setDashboardSettings({ ...dashboardSettings, header_title: e.target.value })}
            className="bg-input border-border text-foreground"
          />
        </div>

        <h3 className="text-lg font-semibold text-foreground mt-4">Cores dos Cards de Visão Geral</h3>
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

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button onClick={handleSave} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
          <Save className="mr-2 h-4 w-4" /> {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </CardContent>
    </Card>
  )
}
