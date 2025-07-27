"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  MessageSquare,
  DollarSign,
  Eye,
  Mail,
  TrendingUp,
  Settings,
  User,
  LogOut,
  LayoutDashboard,
  Users,
  FolderOpen,
  ListChecks,
  MessageCircle,
  CalendarDays,
  ChevronDown,
} from "lucide-react"
import { KanbanBoard } from "@/components/kanban-board"
import { ProjectsManager } from "@/components/projects-manager"
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getSupabaseClient } from "@/lib/supabase-client"
import { ChatInterface } from "@/components/chat-interface"
import { LandingPageEditor } from "@/components/landing-page-editor"
import { AuthenticationEditor } from "@/components/authentication-editor"
import { AdminDashboardEditor } from "@/components/admin-dashboard-editor"
import { SidebarEditor } from "@/components/sidebar-editor"
import { ColorsEditor } from "@/components/colors-editor"
import { ClientDashboardEditor } from "@/components/client-dashboard-editor"
import { TextsEditor } from "@/components/texts-editor"

const dashboardStats = [
  {
    title: "Visitas do Site",
    value: "2,847",
    change: "+12.5%",
    icon: Eye,
    color: "text-blue-400",
  },
  {
    title: "Contatos Realizados",
    value: "156",
    change: "+8.2%",
    icon: Mail,
    color: "text-green-400",
  },
  {
    title: "Mensagens Chat",
    value: "89",
    change: "+23.1%",
    icon: MessageSquare,
    color: "text-purple-400",
  },
  {
    title: "Receita Mensal",
    value: "R$ 45.280",
    change: "+15.3%",
    icon: DollarSign,
    color: "text-emerald-400",
  },
]

const recentContacts = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    type: "Orçamento",
    project: "E-commerce",
    date: "2024-01-15",
    status: "Novo",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    type: "Contato",
    project: "App Mobile",
    date: "2024-01-14",
    status: "Em andamento",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    type: "Orçamento",
    project: "Sistema ERP",
    date: "2024-01-13",
    status: "Respondido",
  },
]

const clients = [
  {
    id: 1,
    name: "TechCorp Ltda",
    email: "contato@techcorp.com",
    projects: 3,
    value: "R$ 85.000",
    status: "Ativo",
  },
  {
    id: 2,
    name: "StartupXYZ",
    email: "hello@startupxyz.com",
    projects: 1,
    value: "R$ 25.000",
    status: "Ativo",
  },
  {
    id: 3,
    name: "Empresa ABC",
    email: "admin@empresaabc.com",
    projects: 2,
    value: "R$ 45.000",
    status: "Concluído",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userName, setUserName] = useState("Admin") // Default name
  const router = useRouter()
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

      const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (profile?.role) {
        setUserName(user.email?.split("@")[0] || "Admin") // Usar email como fallback
      } else if (error) {
        console.error("Error fetching user name:", error)
        setUserName(user.email?.split("@")[0] || "Admin") // Usar email como fallback
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
              <SidebarMenuButton isActive={activeTab === "contacts"} onClick={() => setActiveTab("contacts")}>
                <Mail className="h-4 w-4 text-blue-400" />
                <span>Contatos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "chat"} onClick={() => setActiveTab("chat")}>
                <MessageCircle className="h-4 w-4 text-green-400" />
                <span>Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "financial"} onClick={() => setActiveTab("financial")}>
                <DollarSign className="h-4 w-4 text-yellow-400" />
                <span>Financeiro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "clients"} onClick={() => setActiveTab("clients")}>
                <Users className="h-4 w-4 text-cyan-400" />
                <span>Clientes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "projects"} onClick={() => setActiveTab("projects")}>
                <FolderOpen className="h-4 w-4 text-orange-400" />
                <span>Projetos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "tasks"} onClick={() => setActiveTab("tasks")}>
                <ListChecks className="h-4 w-4 text-red-400" />
                <span>Tarefas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "agenda"} onClick={() => setActiveTab("agenda")}>
                <CalendarDays className="h-4 w-4 text-pink-400" />
                <span>Agenda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Configurações Submenu */}
            <SidebarMenuItem>
              {" "}
              {/* SidebarMenuItem é o filho direto de SidebarMenu */}
              <Collapsible className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("projects")}>
                        <FolderOpen className="h-4 w-4" />
                        <span>Projetos do Site</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("landing-page-editor")}>
                        <span>Landing Page</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("authentication-editor")}>
                        <span>Autenticação</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("dashboard-editor")}>
                        <span>Dashboard</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("sidebar-editor")}>
                        <span>Sidebar</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("colors-editor")}>
                        <span>Cores</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("clients-dashboard-editor")}>
                        <span>Dashboard Cliente</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("texts-editor")}>
                        <span>Textos</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
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
          <div className="flex-1 text-lg font-semibold text-foreground">Dashboard Administrativo</div>
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
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="bg-card shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <p className="text-xs text-green-400 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change} vs mês anterior
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Contatos Recentes</CardTitle>
                    <CardDescription className="text-muted-foreground">Últimas solicitações recebidas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
                        >
                          <div>
                            <p className="font-medium text-foreground">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            <p className="text-xs text-muted-foreground">{contact.project}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={contact.status === "Novo" ? "default" : "secondary"}
                              className="bg-primary text-primary-foreground"
                            >
                              {contact.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{contact.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Métricas do Mês</CardTitle>
                    <CardDescription className="text-muted-foreground">Performance atual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">Taxa de Conversão</span>
                        <span className="font-medium text-foreground">5.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">Tempo Médio no Site</span>
                        <span className="font-medium text-foreground">3m 42s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">Projetos Ativos</span>
                        <span className="font-medium text-foreground">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">Satisfação do Cliente</span>
                        <span className="font-medium text-foreground">4.9/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-6">
              <Card className="bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Gerenciamento de Contatos</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Todos os contatos e solicitações de orçamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-muted"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-medium text-foreground">{contact.name}</p>
                              <p className="text-sm text-muted-foreground">{contact.email}</p>
                            </div>
                            <Badge variant="outline" className="border-border text-foreground">
                              {contact.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">Projeto: {contact.project}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={contact.status === "Novo" ? "default" : "secondary"}
                            className="bg-primary text-primary-foreground"
                          >
                            {contact.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border text-foreground hover:bg-accent bg-transparent"
                          >
                            Responder
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              <ChatInterface />
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Receita Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400">R$ 245.680</div>
                    <p className="text-sm text-muted-foreground">+18.2% vs mês anterior</p>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Projetos Faturados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">28</div>
                    <p className="text-sm text-muted-foreground">Este mês</p>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground">Ticket Médio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">R$ 8.774</div>
                    <p className="text-sm text-muted-foreground">Por projeto</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6">
              <Card className="bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Gerenciamento de Clientes</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Lista de todos os clientes e seus projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted">
                        <div>
                          <p className="font-medium text-foreground">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                          <p className="text-xs text-muted-foreground">{client.projects} projetos</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{client.value}</p>
                          <Badge
                            variant={client.status === "Ativo" ? "default" : "secondary"}
                            className="bg-primary text-primary-foreground"
                          >
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <ProjectsManager />
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6">
              <KanbanBoard />
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

            {/* Customization Tabs */}
            <TabsContent value="landing-page-editor" className="space-y-6">
              <LandingPageEditor />
            </TabsContent>

            <TabsContent value="authentication-editor" className="space-y-6">
              <AuthenticationEditor />
            </TabsContent>

            <TabsContent value="dashboard-editor" className="space-y-6">
              <AdminDashboardEditor />
            </TabsContent>

            <TabsContent value="sidebar-editor" className="space-y-6">
              <SidebarEditor />
            </TabsContent>

            <TabsContent value="colors-editor" className="space-y-6">
              <ColorsEditor />
            </TabsContent>

            <TabsContent value="clients-dashboard-editor" className="space-y-6">
              <ClientDashboardEditor />
            </TabsContent>

            <TabsContent value="texts-editor" className="space-y-6">
              <TextsEditor />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
