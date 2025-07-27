"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function TextsEditor() {
  const [textSettings, setTextSettings] = useState({
    font_family_base: "Inter", // Ex: Inter, Roboto, Open Sans
    font_size_base: "16px",
    font_size_h1: "48px",
    font_size_h2: "36px",
    line_height_base: "1.5",
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
    console.log("Saving text settings:", textSettings)
    setMessage("Configurações de Texto salvas com sucesso!")
    setLoading(false)
  }

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Personalização de Textos</CardTitle>
        <CardDescription className="text-muted-foreground">
          Altere o formato dos textos principais do sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <Label htmlFor="font_family_base">Família da Fonte Base</Label>
          <Input
            id="font_family_base"
            value={textSettings.font_family_base}
            onChange={(e) => setTextSettings({ ...textSettings, font_family_base: e.target.value })}
            className="bg-input border-border text-foreground"
          />
          <CardDescription className="text-muted-foreground">
            Ex: Inter, Roboto, Open Sans. Certifique-se de que a fonte está disponível.
          </CardDescription>
        </div>
        <div className="grid gap-4">
          <Label htmlFor="font_size_base">Tamanho da Fonte Base (px)</Label>
          <Input
            id="font_size_base"
            type="number"
            value={Number.parseInt(textSettings.font_size_base)}
            onChange={(e) => setTextSettings({ ...textSettings, font_size_base: `${e.target.value}px` })}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="font_size_h1">Tamanho da Fonte H1 (px)</Label>
          <Input
            id="font_size_h1"
            type="number"
            value={Number.parseInt(textSettings.font_size_h1)}
            onChange={(e) => setTextSettings({ ...textSettings, font_size_h1: `${e.target.value}px` })}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="font_size_h2">Tamanho da Fonte H2 (px)</Label>
          <Input
            id="font_size_h2"
            type="number"
            value={Number.parseInt(textSettings.font_size_h2)}
            onChange={(e) => setTextSettings({ ...textSettings, font_size_h2: `${e.target.value}px` })}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="line_height_base">Altura da Linha Base</Label>
          <Input
            id="line_height_base"
            type="number"
            step="0.1"
            value={Number.parseFloat(textSettings.line_height_base)}
            onChange={(e) => setTextSettings({ ...textSettings, line_height_base: e.target.value })}
            className="bg-input border-border text-foreground"
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
