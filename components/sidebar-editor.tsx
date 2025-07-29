"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, Plus, Trash2, Eye, GitCompare } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { DynamicLucideIcon } from "@/components/dynamic-lucide-icon" // Importar o componente de ícone dinâmico

// Definir os valores padrão para o sidebar!
const defaultSidebarSettings = {
  background_color: "#171717", // Cor de fundo do sidebar
  text_color: "#F9FAFB", // Cor do texto padrão
  active_bg_color: "#009FCC", // Cor de fundo do item ativo
  active_text_color: "#FFFFFF", // Cor do texto do item ativo
  menu_items: [
    { id: "1", label: "Visão Geral", icon: "LayoutDashboard", url: "overview" },
    { id: "2", label: "Contatos", icon: "Mail", url: "contacts" },
    { id: "3", label: "Chat", icon: "MessageCircle", url: "chat" },
    { id: "4", label: "Financeiro", icon: "DollarSign", url: "financial" },
    { id: "5", label: "Clientes", icon: "Users", url: "clients" },
    { id: "6", label: "Projetos", icon: "FolderOpen", url: "projects" },
    { id: "7", label: "Tarefas", icon: "ListChecks", url: "tasks" },
    { id: "8", label: "Agenda", icon: "CalendarDays", url: "agenda" },
  ],
}

type MenuItem = {
  id: string
  label: string
  icon: string // Agora é obrigatório e string
  url: string
}

interface SidebarSettings {
  background_color: string
  text_color: string
  active_bg_color: string
  active_text_color: string
  menu_items: MenuItem[]
}

// Componente de Preview do Sidebar
interface SidebarPreviewProps {
  settings: SidebarSettings
}

function SidebarPreview({ settings }: SidebarPreviewProps) {
  const [activeItem, setActiveItem] = useState(settings.menu_items[0]?.url || "")

  return (
    <div className="flex h-full">
      <aside
        className="flex h-full w-64 flex-col shadow-lg p-4"
        style={{ backgroundColor: settings.background_color, color: settings.text_color }}
      >
        <div className="text-xl font-bold mb-6">
          <span className="text-purple-400">IA</span> Labs
        </div>
        <nav className="flex-1 space-y-1">
          {settings.menu_items.map((item) => (
            <button
              key={item.id}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors"
              style={{
                backgroundColor: activeItem === item.url ? settings.active_bg_color : "transparent",
                color: activeItem === item.url ? settings.active_text_color : settings.text_color,
              }}
              onClick={() => setActiveItem(item.url)}
            >
              <DynamicLucideIcon name={item.icon} className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700" style={{ borderColor: settings.text_color + "33" }}>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-red-400 hover:bg-red-900/20">
            <DynamicLucideIcon name="LogOut" className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-950 text-gray-50">
        <h2 className="text-2xl font-bold mb-4">Conteúdo da Página</h2>
        <p>Este é um exemplo de como o conteúdo da página apareceria com o sidebar personalizado.</p>
        <p className="mt-2">
          Item ativo: <span className="font-semibold">{activeItem || "Nenhum"}</span>
        </p>
      </main>
    </div>
  )
}

// Componente Original do Sidebar
function OriginalSidebar() {
  return <SidebarPreview settings={defaultSidebarSettings} />
}

// Componente de Comparação do Sidebar
interface SidebarComparisonProps {
  editedSettings: SidebarSettings
}

function SidebarComparison({ editedSettings }: SidebarComparisonProps) {
  const isChanged = (key: keyof SidebarSettings | string) => {
    if (key === "menu_items") {
      // Deep comparison for menu_items array
      if (editedSettings.menu_items.length !== defaultSidebarSettings.menu_items.length) return true
      for (let i = 0; i < editedSettings.menu_items.length; i++) {
        if (
          editedSettings.menu_items[i].label !== defaultSidebarSettings.menu_items[i]?.label ||
          editedSettings.menu_items[i].icon !== defaultSidebarSettings.menu_items[i]?.icon ||
          editedSettings.menu_items[i].url !== defaultSidebarSettings.menu_items[i]?.url
        ) {
          return true
        }
      }
      return false
    }
    return editedSettings[key as keyof SidebarSettings] !== defaultSidebarSettings[key as keyof SidebarSettings]
  }

  const HighlightBadge = () => (
    <span className="ml-2 inline-flex items-center rounded-md bg-yellow-400/20 px-2 py-0.5 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20">
      Alterado
    </span>
  )

  const [activeItem, setActiveItem] = useState(editedSettings.menu_items[0]?.url || "")

  return (
    <div className="flex h-full">
      <aside
        className="flex h-full w-64 flex-col shadow-lg p-4"
        style={{ backgroundColor: editedSettings.background_color, color: editedSettings.text_color }}
      >
        <div className="text-xl font-bold mb-6">
          <span className="text-purple-400">IA</span> Labs
        </div>
        <nav className="flex-1 space-y-1">
          {editedSettings.menu_items.map((item, index) => (
            <button
              key={item.id}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors"
              style={{
                backgroundColor: activeItem === item.url ? editedSettings.active_bg_color : "transparent",
                color: activeItem === item.url ? editedSettings.active_text_color : editedSettings.text_color,
              }}
              onClick={() => setActiveItem(item.url)}
            >
              <DynamicLucideIcon name={item.icon} className="h-4 w-4" />
              <span className={cn(isChanged(`menu_items[${index}].label`) && "bg-yellow-900/30 p-1 rounded")}>
                {item.label}
                {isChanged(`menu_items[${index}].label`) && <HighlightBadge />}
              </span>
              <span className={cn(isChanged(`menu_items[${index}].icon`) && "bg-yellow-900/30 p-1 rounded")}>
                {isChanged(`menu_items[${index}].icon`) && <HighlightBadge />}
              </span>
              <span className={cn(isChanged(`menu_items[${index}].url`) && "bg-yellow-900/30 p-1 rounded")}>
                {isChanged(`menu_items[${index}].url`) && <HighlightBadge />}
              </span>
            </button>
          ))}
          {isChanged("menu_items") && editedSettings.menu_items.length !== defaultSidebarSettings.menu_items.length && (
            <div className="mt-4 text-sm text-yellow-400 bg-yellow-900/30 p-2 rounded">
              Itens de menu adicionados/removidos. <HighlightBadge />
            </div>
          )}
        </nav>
        <div
          className="mt-auto pt-4 border-t border-gray-700"
          style={{ borderColor: editedSettings.text_color + "33" }}
        >
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-red-400 hover:bg-red-900/20">
            <DynamicLucideIcon name="LogOut" className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </div>
        {(isChanged("background_color") ||
          isChanged("text_color") ||
          isChanged("active_bg_color") ||
          isChanged("active_text_color")) && (
          <div className="mt-4 text-sm text-yellow-400 bg-yellow-900/30 p-2 rounded">
            Cores do Sidebar alteradas. <HighlightBadge />
          </div>
        )}
      </aside>
      <main className="flex-1 p-6 bg-gray-950 text-gray-50">
        <h2 className="text-2xl font-bold mb-4">Conteúdo da Página</h2>
        <p>Este é um exemplo de como o conteúdo da página apareceria com o sidebar personalizado.</p>
        <p className="mt-2">
          Item ativo: <span className="font-semibold">{activeItem || "Nenhum"}</span>
        </p>
      </main>
    </div>
  )
}

export function SidebarEditor() {
  const supabase = getSupabaseClient()
  const [sidebarSettings, setSidebarSettings] = useState<SidebarSettings>(defaultSidebarSettings)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSidebarSettings = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("sidebar_settings").select("*").eq("id", 1).single()
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching sidebar settings:", error)
        setError("Erro ao carregar configurações do sidebar.")
      } else if (data) {
        setSidebarSettings({
          background_color: data.background_color || defaultSidebarSettings.background_color,
          text_color: data.text_color || defaultSidebarSettings.text_color,
          active_bg_color: data.active_bg_color || defaultSidebarSettings.active_bg_color,
          active_text_color: data.active_text_color || defaultSidebarSettings.active_text_color,
          menu_items: data.menu_items || defaultSidebarSettings.menu_items,
        })
      }
      setLoading(false)
    }
    fetchSidebarSettings()
  }, [supabase])

  const handleSave = async () => {
    setLoading(true)
    setMessage("")
    setError("")

    const { data, error } = await supabase
      .from("sidebar_settings")
      .upsert(
        {
          id: 1, // Always update the single row
          background_color: sidebarSettings.background_color,
          text_color: sidebarSettings.text_color,
          active_bg_color: sidebarSettings.active_bg_color,
          active_text_color: sidebarSettings.active_text_color,
          menu_items: sidebarSettings.menu_items,
        },
        { onConflict: "id" },
      )
      .select()

    if (error) {
      console.error("Error saving sidebar settings:", error)
      setError("Erro ao salvar configurações: " + error.message)
    } else {
      setMessage("Configurações do Sidebar salvas com sucesso!")
    }
    setLoading(false)
  }

  const handleMenuItemChange = (id: string, field: keyof MenuItem, value: string) => {
    setSidebarSettings((prev) => ({
      ...prev,
      menu_items: prev.menu_items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const handleAddMenuItem = () => {
    setSidebarSettings((prev) => ({
      ...prev,
      menu_items: [
        ...prev.menu_items,
        { id: Date.now().toString(), label: "Novo Item", icon: "MessageCircle", url: "" },
      ],
    }))
  }

  const handleRemoveMenuItem = (id: string) => {
    setSidebarSettings((prev) => ({
      ...prev,
      menu_items: prev.menu_items.filter((item) => item.id !== id),
    }))
  }

  if (loading && !message && !error) {
    return (
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Carregando Editor do Sidebar...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">Carregando dados...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Personalização do Sidebar</CardTitle>
        <CardDescription className="text-muted-foreground">Altere os menus e as cores do sidebar.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground mt-4">Cores do Sidebar</h3>
        <div className="grid gap-4">
          <Label htmlFor="sidebar_bg_color">Cor de Fundo (Hex)</Label>
          <Input
            id="sidebar_bg_color"
            type="color"
            value={sidebarSettings.background_color}
            onChange={(e) => setSidebarSettings({ ...sidebarSettings, background_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="sidebar_text_color">Cor do Texto (Hex)</Label>
          <Input
            id="sidebar_text_color"
            type="color"
            value={sidebarSettings.text_color}
            onChange={(e) => setSidebarSettings({ ...sidebarSettings, text_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="sidebar_active_bg_color">Cor de Fundo do Item Ativo (Hex)</Label>
          <Input
            id="sidebar_active_bg_color"
            type="color"
            value={sidebarSettings.active_bg_color}
            onChange={(e) => setSidebarSettings({ ...sidebarSettings, active_bg_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="sidebar_active_text_color">Cor do Texto do Item Ativo (Hex)</Label>
          <Input
            id="sidebar_active_text_color"
            type="color"
            value={sidebarSettings.active_text_color}
            onChange={(e) => setSidebarSettings({ ...sidebarSettings, active_text_color: e.target.value })}
            className="w-full h-10 p-1 border-border rounded-md"
          />
        </div>

        <h3 className="text-lg font-semibold text-foreground mt-6">Itens do Menu</h3>
        <div className="space-y-4">
          {sidebarSettings.menu_items.map((item) => (
            <div key={item.id} className="flex items-end gap-2 border p-3 rounded-md bg-muted">
              <div className="flex-1 grid gap-2">
                <Label htmlFor={`menu_label_${item.id}`}>Rótulo</Label>
                <Input
                  id={`menu_label_${item.id}`}
                  value={item.label}
                  onChange={(e) => handleMenuItemChange(item.id, "label", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
                <Label htmlFor={`menu_icon_${item.id}`}>Ícone (Nome Lucide React)</Label>
                <Input
                  id={`menu_icon_${item.id}`}
                  value={item.icon}
                  onChange={(e) => handleMenuItemChange(item.id, "icon", e.target.value)}
                  className="bg-input border-border text-foreground"
                  placeholder="Ex: LayoutDashboard"
                />
                <CardDescription className="text-muted-foreground text-xs">
                  Use nomes de ícones do Lucide React (ex: LayoutDashboard, Mail, MessageCircle).
                </CardDescription>
                <Label htmlFor={`menu_url_${item.id}`}>URL (aba)</Label>
                <Input
                  id={`menu_url_${item.id}`}
                  value={item.url || ""}
                  onChange={(e) => handleMenuItemChange(item.id, "url", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <Button variant="destructive" size="icon" onClick={() => handleRemoveMenuItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={handleAddMenuItem} variant="outline" className="w-full bg-transparent">
            <Plus className="mr-2 h-4 w-4" /> Adicionar Item de Menu
          </Button>
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
                <Eye className="mr-2 h-4 w-4" /> Visualizar Sidebar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Pré-visualização do Sidebar</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é uma pré-visualização das suas alterações no sidebar.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <SidebarPreview settings={sidebarSettings} />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-accent min-w-[180px]"
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar Sidebar Original
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Sidebar Original</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é a versão original do sidebar do sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <OriginalSidebar />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-accent min-w-[180px]"
              >
                <GitCompare className="mr-2 h-4 w-4" /> Comparar Sidebar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Comparação do Sidebar</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é a versão original do sidebar com suas alterações destacadas.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <SidebarComparison editedSettings={sidebarSettings} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
