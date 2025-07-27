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

const clientProjects = [
  {
    id: 1,
    name: "Sistema de Gestão Empresarial",
    status: "Em Desenvolvimento",
    progress: 75,
    startDate: "2024-01-15",
    expectedEnd: "2024-03-15",
    budget: "R$ 45.000",
    description: "Sistema completo de gestão com módulos financeiro, estoque e vendas",
    tasks: {
      completed: 12,
      total: 16,
    },
  },
  {
    id: 2,
    name: "App Mobile de Delivery",
    status: "Planejamento",
    progress: 25,
    startDate: "2024-02-01",
    expectedEnd: "2024-05-01",
    budget: "R$ 32.000",
    description: "Aplicativo mobile para delivery com sistema de pagamento integrado",
    tasks: {
      completed: 3,
      total: 12,
    },
  },
]

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
            <span className="text-purple-400">IA</span> Labs
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card px-4 shadow-sm">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <div className="flex-1 text-lg font-semibold text-foreground">Portal do Cliente</div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{userName}</span>
          </div>
        </header>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* TabsContent for each section */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-card shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Projetos Ativos</CardTitle>
                    <FolderOpen className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Em desenvolvimento</p>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Mensagens</CardTitle>
                    <MessageSquare className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Não lida</p>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Tarefas Concluídas</CardTitle>
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">De 28 totais</p>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Investimento Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 77.000</div>
                    <p className="text-xs text-muted-foreground">Em projetos</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Projetos em Andamento</CardTitle>
                    <CardDescription className="text-muted-foreground">Status atual dos seus projetos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientProjects.map((project) => (
                        <div key={project.id} className="p-4 bg-muted rounded-lg border border-border">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-foreground">{project.name}</h4>
                            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Progresso</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2 bg-secondary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Mensagens Recentes</CardTitle>
                    <CardDescription className="text-muted-foreground">Comunicação com a equipe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientMessages.slice(0, 3).map((message) => (
                        <div key={message.id} className="p-3 bg-muted rounded-lg border border-border">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-foreground text-sm">{message.from}</p>
                            <span className="text-xs text-muted-foreground">{message.date}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground mb-1">{message.subject}</p>
                          <p className="text-xs text-muted-foreground">{message.preview}</p>
                          {!message.read && (
                            <Badge variant="secondary" className="mt-2 text-xs bg-accent text-accent-foreground">
                              Nova
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="grid gap-6">
                {clientProjects.map((project) => (
                  <Card key={project.id} className="bg-card shadow-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-foreground">{project.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Início</p>
                            <p className="text-xs text-foreground">{project.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Previsão</p>
                            <p className="text-xs text-foreground">{project.expectedEnd}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Orçamento</p>
                            <p className="text-xs text-foreground">{project.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Tarefas</p>
                            <p className="text-xs text-foreground">
                              {project.tasks.completed}/{project.tasks.total}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Progresso do Projeto</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-3 bg-secondary" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card className="bg-card shadow-sm">
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
                          className="mt-3 bg-transparent border-border text-foreground hover:bg-accent"
                        >
                          Ler Mensagem
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invoices Tab */}
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
                            className="border-border text-foreground hover:bg-accent bg-transparent"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Baixar PDF
                          </Button>
                          {invoice.status === "Pendente" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
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

            {/* Agenda Tab */}
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
                    <Button className="mt-4 bg-primary hover:bg-primary-foreground text-primary-foreground hover:text-primary">
                      Adicionar Evento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
