"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function ClientDashboardEditor() {
  const [clientDashboardSettings, setClientDashboardSettings] = useState({
    header_title: "Portal do Cliente",
    overview_card_bg_color: "#1F2937",
    overview_text_color: "#F9FAFB",
    overview_button_bg_color: "#9333EA",
    overview_button_text_color: "#FFFFFF",
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
    console.log("Saving client dashboard settings:", clientDashboardSettings)
    setMessage("Configurações do Dashboard do Cliente salvas com sucesso!")
    setLoading(false)
  }

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Personalização do Dashboard do Cliente</CardTitle>
        <CardDescription className="text-muted-foreground">
          Altere informações, textos, cores de fundo e botões do dashboard do cliente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <Label htmlFor="client_header_title">Título do Cabeçalho do Dashboard</Label>
          <Input
            id="client_header_title"
            value={clientDashboardSettings.header_title}
            onChange={(e) => setClientDashboardSettings({ ...clientDashboardSettings, header_title: e.target.value })}
            className="bg-input border-border text-foreground"
          />
        </div>

        <h3 className="text-lg font-semibold text-foreground mt-4">Cores dos Cards de Visão Geral</h3>
        <div className="grid gap-4">
          <Label htmlFor="client_overview_card_bg_color">Cor de Fundo do Card (Hex)</Label>
          <Input
            id="client_overview_card_bg_color"
            type="color"
            value={clientDashboardSettings.overview_card_bg_color}
            onChange={(e) =>
              setClientDashboardSettings({ ...clientDashboardSettings, overview_card_bg_color: e.target.value })
            }
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="client_overview_text_color">Cor do Texto do Card (Hex)</Label>
          <Input
            id="client_overview_text_color"
            type="color"
            value={clientDashboardSettings.overview_text_color}
            onChange={(e) =>
              setClientDashboardSettings({ ...clientDashboardSettings, overview_text_color: e.target.value })
            }
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="client_overview_button_bg_color">Cor de Fundo do Botão (Hex)</Label>
          <Input
            id="client_overview_button_bg_color"
            type="color"
            value={clientDashboardSettings.overview_button_bg_color}
            onChange={(e) =>
              setClientDashboardSettings({ ...clientDashboardSettings, overview_button_bg_color: e.target.value })
            }
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="client_overview_button_text_color">Cor do Texto do Botão (Hex)</Label>
          <Input
            id="client_overview_button_text_color"
            type="color"
            value={clientDashboardSettings.overview_button_text_color}
            onChange={(e) =>
              setClientDashboardSettings({ ...clientDashboardSettings, overview_button_text_color: e.target.value })
            }
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
