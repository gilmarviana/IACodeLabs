"use client"

import { useState } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

export function ColorsEditor() {
  const [colorSettings, setColorSettings] = useState({
    primary_color: "#009FCC", // Ex: purple-600
    secondary_color: "#4B5563", // Ex: gray-600
    accent_color: "#FACC15", // Ex: yellow-400
    background_color: "#0A0A0A", // Ex: gray-950
    foreground_color: "#F9FAFB", // Ex: gray-50
    border_color: "#374151", // Ex: gray-700
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
    console.log("Saving color settings:", colorSettings)
    setMessage("Cores principais salvas com sucesso!")
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#FAFAFA] mb-2">Personalização de Cores</h2>
      <p className="text-[#FAFAFA] mb-4">Altere as cores principais do sistema.</p>
      <Collapsible defaultOpen className="bg-[#000000] rounded-lg shadow-sm">
        <CollapsibleTrigger className="flex items-center w-full px-4 py-3 text-lg font-semibold text-[#009FCC] hover:bg-[#1F2E4F] rounded-t-lg transition cursor-pointer">
          <ChevronDown className="mr-2 h-5 w-5" /> Cores Principais
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 space-y-4">
          <div className="grid gap-4">
            <Label htmlFor="primary_color">Cor Primária (Hex)</Label>
            <Input
              id="primary_color"
              type="color"
              value={colorSettings.primary_color}
              onChange={(e) => setColorSettings({ ...colorSettings, primary_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="secondary_color">Cor Secundária (Hex)</Label>
            <Input
              id="secondary_color"
              type="color"
              value={colorSettings.secondary_color}
              onChange={(e) => setColorSettings({ ...colorSettings, secondary_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="accent_color">Cor de Destaque (Hex)</Label>
            <Input
              id="accent_color"
              type="color"
              value={colorSettings.accent_color}
              onChange={(e) => setColorSettings({ ...colorSettings, accent_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible defaultOpen className="bg-[#000000] rounded-lg shadow-sm">
        <CollapsibleTrigger className="flex items-center w-full px-4 py-3 text-lg font-semibold text-[#009FCC] hover:bg-[#1F2E4F] rounded-t-lg transition cursor-pointer">
          <ChevronDown className="mr-2 h-5 w-5" /> Cores de Fundo e Bordas
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 space-y-4">
          <div className="grid gap-4">
            <Label htmlFor="background_color">Cor de Fundo (Hex)</Label>
            <Input
              id="background_color"
              type="color"
              value={colorSettings.background_color}
              onChange={(e) => setColorSettings({ ...colorSettings, background_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="foreground_color">Cor do Foreground (Hex)</Label>
            <Input
              id="foreground_color"
              type="color"
              value={colorSettings.foreground_color}
              onChange={(e) => setColorSettings({ ...colorSettings, foreground_color: e.target.value })}
              className="w-full h-10 p-1 border-border rounded-md"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="border_color">Cor da Borda (Hex)</Label>
            <Input
              id="border_color"
              type="color"
              value={colorSettings.border_color}
              onChange={(e) => setColorSettings({ ...colorSettings, border_color: e.target.value })}
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
