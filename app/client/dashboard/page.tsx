"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  LogOut,
  FolderOpen,
  MessageSquare,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  DollarSign,
  LayoutDashboard,
  CalendarDays,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getSupabaseClient } from "@/lib/supabase-client"
import { ProjectsManager } from "@/components/projects-manager"

// Removido clientProjects. Os projetos agora são gerenciados pelo ProjectsManager

const clientMessages = [
  {
    id: 1,
    from: "João Silva - Gerente de Projeto",
    subject: "Atualização do Sistema de Gestão",
    preview: "Olá! Gostaria de informar que concluímos mais uma etapa...",
    date: "2024-01-20",
    read: false,
  },
  {
    id: 2,
    from: "Maria Santos - Designer",
    subject: "Aprovação do Layout Mobile",
    preview: "Enviamos as telas do aplicativo para sua aprovação...",
    date: "2024-01-18",
    read: true,
  },
]

const invoices = [
  {
    id: 1,
    number: "INV-2024-001",
    project: "Sistema de Gestão Empresarial",
    amount: "R$ 22.500",
    dueDate: "2024-02-15",
    status: "Pago",
    paidDate: "2024-02-10",
  },
  {
    id: 2,
    number: "INV-2024-002",
    project: "App Mobile de Delivery",
    amount: "R$ 8.000",
    dueDate: "2024-02-28",
    status: "Pendente",
    paidDate: null,
  },
]

export default function ClientDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [userName, setUserName] = useState("Cliente Demo") // Default name
  const supabase = getSupabaseClient()

  useEffect(() => {
    document.body.classList.add("dark-theme")
    return () => {
      document.body.classList.remove("dark-theme")
    }
  }, [])

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profile && !profileError) {
        setUserName(user.email?.split("@")[0] || "Cliente") // Usar email como fallback
      } else {
        console.error("Erro ao buscar perfil ou usuário não é cliente:", profileError?.message)
        setUserName(user.email?.split("@")[0] || "Cliente") // Usar email como fallback
      }
    }

    checkAuthAndFetchUser()
  }, [router, supabase])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message)
    } else {
      router.push("/")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Desenvolvimento":
        return "bg-blue-600 text-white"
      case "Planejamento":
        return "bg-yellow-600 text-white"
      case "Concluído":
        return "bg-green-600 text-white"
      case "Pausado":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-600 text-white"
      case "Pendente":
        return "bg-yellow-600 text-white"
      case "Vencido":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="bg-sidebar shadow-lg">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <div className="text-xl font-bold text-sidebar-foreground">
            <span className="text-[#009FCC]">IA</span> Labs
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "overview"} onClick={() => setActiveTab("overview")}> 
                <LayoutDashboard className="h-4 w-4 text-purple-400" />
                <span>Visão Geral</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "projects"} onClick={() => setActiveTab("projects")}> 
                <FolderOpen className="h-4 w-4 text-blue-400" />
                <span>Meus Projetos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "messages"} onClick={() => setActiveTab("messages")}> 
                <MessageSquare className="h-4 w-4 text-green-400" />
                <span>Mensagens</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "invoices"} onClick={() => setActiveTab("invoices")}> 
                <FileText className="h-4 w-4 text-yellow-400" />
                <span>Faturas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "agenda"} onClick={() => setActiveTab("agenda")}> 
                <CalendarDays className="h-4 w-4 text-orange-400" />
                <span>Agenda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="text-red-400 hover:text-red-300"> 
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        {/* Header for mobile and content area */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-[#009FCC] px-4 shadow-sm">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <div className="flex-1 text-lg font-semibold text-foreground">Portal do Cliente</div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{userName}</span>
          </div>
        </header>
        <Tabs>
          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              <ProjectsManager />
            </div>
          </TabsContent>
          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-[#009FCC] shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Central de Mensagens</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Comunicação com a equipe de desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg ${!message.read ? "bg-accent border-accent" : "bg-muted"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-foreground">{message.from}</p>
                          <p className="text-sm text-muted-foreground">{message.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{message.date}</p>
                          {!message.read && (
                            <Badge variant="secondary" className="mt-1 bg-primary text-primary-foreground">
                              Nova
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-foreground">{message.preview}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 bg-[#009FCC] border-border text-white hover:bg-[#00BFFF]"
                      >
                        Ler Mensagem
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="invoices" className="space-y-6">
            <Card className="bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Faturas e Pagamentos</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Histórico financeiro dos seus projetos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="p-4 border rounded-lg bg-muted">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-foreground">{invoice.number}</p>
                          <p className="text-sm text-muted-foreground">{invoice.project}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{invoice.amount}</p>
                          <Badge className={getInvoiceStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Vencimento:</p>
                          <p className="text-foreground">{invoice.dueDate}</p>
                        </div>
                        {invoice.paidDate && (
                          <div>
                            <p className="text-muted-foreground">Pago em:</p>
                            <p className="text-foreground">{invoice.paidDate}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-[#009FCC] border-border text-white hover:bg-[#00BFFF]"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Baixar PDF
                        </Button>
                        {invoice.status === "Pendente" && (
                          <Button size="sm" className="bg-[#009FCC] hover:bg-[#00BFFF] text-white">
                            Pagar Agora
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="agenda" className="space-y-6">
            <Card className="bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Agenda</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Gerencie seus compromissos e prazos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground">Sua agenda está vazia.</p>
                  <p className="text-sm text-muted-foreground">
                    Adicione novos eventos ou sincronize com seu calendário.
                  </p>
                  <Button className="mt-4 bg-[#009FCC] hover:bg-[#00BFFF] text-white">
                    Adicionar Evento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SidebarInset>
    </SidebarProvider>
  );
}
