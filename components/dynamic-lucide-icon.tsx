import dynamic from "next/dynamic"
import { MessageCircle } from "lucide-react"
import type React from "react"

// Mapeamento de nomes de string para componentes de ícone Lucide React
// Adicione mais ícones conforme necessário para seus menus
const iconComponents = {
  LayoutDashboard: dynamic(() => import("lucide-react").then((mod) => mod.LayoutDashboard)),
  Mail: dynamic(() => import("lucide-react").then((mod) => mod.Mail)),
  MessageCircle: dynamic(() => import("lucide-react").then((mod) => mod.MessageCircle)),
  DollarSign: dynamic(() => import("lucide-react").then((mod) => mod.DollarSign)),
  Users: dynamic(() => import("lucide-react").then((mod) => mod.Users)),
  FolderOpen: dynamic(() => import("lucide-react").then((mod) => mod.FolderOpen)),
  ListChecks: dynamic(() => import("lucide-react").then((mod) => mod.ListChecks)),
  CalendarDays: dynamic(() => import("lucide-react").then((mod) => mod.CalendarDays)),
  Settings: dynamic(() => import("lucide-react").then((mod) => mod.Settings)),
  // Adicione outros ícones que você planeja usar nos menus
}

interface DynamicLucideIconProps extends React.SVGProps<SVGSVGElement> {
  name: string
}

export function DynamicLucideIcon({ name, ...props }: DynamicLucideIconProps) {
  const IconComponent = iconComponents[name as keyof typeof iconComponents]
  if (!IconComponent) {
    // Retorna um ícone padrão ou null se o nome não for encontrado
    return <MessageCircle {...props} /> // Exemplo: retorna um ícone de mensagem como fallback
  }
  return <IconComponent {...props} />
}
