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
import { ProjectsConfig, Project } from "@/components/projects-config"

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
  // Estado para filtros de data
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Estado para projetos realizados
  const [realizados, setRealizados] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("overview")
  const [userName, setUserName] = useState("Admin") // Default name
  const router = useRouter()

  useEffect(() => {
    document.body.classList.add("dark-theme")
    return () => {
      document.body.classList.remove("dark-theme")
    }
  }, [])

  useEffect(() => {
    const supabase = getSupabaseClient()
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
  }, [router])

  const handleLogout = async () => {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="bg-[#1F2E4F] shadow-lg">
        <SidebarHeader className="p-4 bg-[#000000]">
          <div className="text-xl font-bold text-[#FAFAFA]">
            <span style={{ color: '#009FCC' }}>IA</span> Labs
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto p-2 bg-[#1F2E4F]">
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
                      <SidebarMenuSubButton onClick={() => setActiveTab("landing-page-editor")}> 
                        <span>Landing Page</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("projects-config")}> 
                        <span>Projetos Realizados</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
            {/* O conteúdo de ProjectsConfig deve estar dentro do Tabs principal, não aqui */}
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
        <SidebarFooter className="p-4 bg-[#000000]">
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

      <SidebarInset className="bg-[#1F2E4F]">
        {/* Header for mobile and content area */}
        <header className="flex h-16 shrink-0 items-center gap-2 bg-[#000000] px-4 shadow-sm">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <div className="flex-1 text-lg font-semibold text-foreground">Dashboard Administrativo</div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{userName}</span>
          </div>
        </header>

        <div className="p-6 bg-[#1F2E4F]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* TabsContent for each section */}
            <TabsContent value="projects-config" className="space-y-6">
              <ProjectsConfig projects={realizados} onChange={setRealizados} />
            </TabsContent>
            <TabsContent value="overview" className="space-y-6">
              {/* Filtros de datas */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
                <div className="flex flex-col md:flex-row gap-2">
                  <div>
                    <label
                      htmlFor="start-date"
                      className="block text-xs text-[#FAFAFA] mb-1 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById('start-date');
                        if (input) input.focus();
                      }}
                    >
                      Data Inicial
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      className="bg-[#1F2E4F] text-[#FAFAFA] rounded px-2 py-1 outline-none border-none"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="end-date"
                      className="block text-xs text-[#FAFAFA] mb-1 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById('end-date');
                        if (input) input.focus();
                      }}
                    >
                      Data Final
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      className="bg-[#1F2E4F] text-[#FAFAFA] rounded px-2 py-1 outline-none border-none"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-[#009FCC] text-[#FAFAFA] rounded px-4 py-2 font-medium hover:bg-[#1F2E4F] transition"
                  onClick={() => { setStartDate(""); setEndDate(""); }}
                >
                  Limpar Filtros
                </button>
              </div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="bg-[#000000] shadow-sm rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#FAFAFA]">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#FAFAFA]">{stat.value}</div>
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
                <Card className="bg-[#000000] shadow-sm rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-[#FAFAFA]">Contatos Recentes</CardTitle>
                    <CardDescription className="text-[#FAFAFA]">Últimas solicitações recebidas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 bg-[#1F2E4F] rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-[#FAFAFA]">{contact.name}</p>
                            <p className="text-sm text-[#FAFAFA]">{contact.email}</p>
                            <p className="text-xs text-[#FAFAFA]">{contact.project}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={contact.status === "Novo" ? "default" : "secondary"}
                              className="bg-[#009FCC] text-[#FAFAFA]"
                            >
                              {contact.status}
                            </Badge>
                            <p className="text-xs text-[#FAFAFA] mt-1">{contact.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#000000] shadow-sm rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-[#FAFAFA]">Métricas do Mês</CardTitle>
                    <CardDescription className="text-[#FAFAFA]">Performance atual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#FAFAFA]">Taxa de Conversão</span>
                        <span className="font-medium text-[#009FCC]">5.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#FAFAFA]">Tempo Médio no Site</span>
                        <span className="font-medium text-[#009FCC]">3m 42s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#FAFAFA]">Projetos Ativos</span>
                        <span className="font-medium text-[#009FCC]">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#FAFAFA]">Satisfação do Cliente</span>
                        <span className="font-medium text-[#009FCC]">4.9/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-6">
              <Card className="bg-[#000000] shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-[#FAFAFA]">Gerenciamento de Contatos</CardTitle>
                  <CardDescription className="text-[#FAFAFA]">
                    Todos os contatos e solicitações de orçamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-3 bg-[#1F2E4F] rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-[#FAFAFA]">{contact.name}</p>
                          <p className="text-sm text-[#FAFAFA]">{contact.email}</p>
                          <p className="text-xs text-[#FAFAFA]">{contact.project}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={contact.status === "Novo" ? "default" : "secondary"}
                            className="bg-[#009FCC] text-[#FAFAFA]"
                          >
                            {contact.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              <Card className="bg-[#000000] shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-[#FAFAFA]">Chat</CardTitle>
                  <CardDescription className="text-[#FAFAFA]">Converse com seus clientes em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-2 bg-[#1F2E4F] rounded-lg">
                    <ChatInterface />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="bg-[#000000] shadow-sm rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-[#FAFAFA]">Receita Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400">R$ 245.680</div>
                    <p className="text-sm text-[#FAFAFA]">+18.2% vs mês anterior</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#000000] shadow-sm rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-[#FAFAFA]">Projetos Faturados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#FAFAFA]">28</div>
                    <p className="text-sm text-[#FAFAFA]">Este mês</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#000000] shadow-sm rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-[#FAFAFA]">Ticket Médio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#FAFAFA]">R$ 8.774</div>
                    <p className="text-sm text-[#FAFAFA]">Por projeto</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6">
              <Card className="bg-[#000000] shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-[#FAFAFA]">Gerenciamento de Clientes</CardTitle>
                  <CardDescription className="text-[#FAFAFA]">
                    Lista de todos os clientes e seus projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-3 bg-[#1F2E4F] rounded-lg">
                        <div>
                          <p className="font-medium text-[#FAFAFA]">{client.name}</p>
                          <p className="text-sm text-[#FAFAFA]">{client.email}</p>
                          <p className="text-xs text-[#FAFAFA]">{client.projects} projetos</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#FAFAFA]">{client.value}</p>
                          <Badge
                            variant={client.status === "Ativo" ? "default" : "secondary"}
                            className="bg-[#009FCC] text-[#FAFAFA]"
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
              <Card className="bg-[#000000] shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-[#FAFAFA]">Projetos</CardTitle>
                  <CardDescription className="text-[#FAFAFA]">Gerencie todos os projetos cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-2 bg-[#1F2E4F] rounded-lg">
                    <ProjectsManager />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6">
              <Card className="bg-[#000000] shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-[#FAFAFA]">Quadro de Tarefas</CardTitle>
                  <CardDescription className="text-[#FAFAFA]">Organize e acompanhe suas tarefas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-2 bg-[#1F2E4F] rounded-lg">
                    <KanbanBoard />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agenda Tab */}
            <TabsContent value="agenda" className="space-y-6">
              <Card className="bg-[#000000] shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-[#FAFAFA]">Agenda</CardTitle>
                  <CardDescription className="text-[#FAFAFA]">
                    Gerencie seus compromissos e prazos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CalendarDays className="h-12 w-12 text-[#009FCC] mx-auto mb-4" />
                    <p className="text-[#FAFAFA]">Sua agenda está vazia.</p>
                    <p className="text-sm text-[#FAFAFA]">
                      Adicione novos eventos ou sincronize com seu calendário.
                    </p>
                    <Button className="mt-4 bg-[#009FCC] hover:bg-[#1F2E4F] text-[#FAFAFA] hover:text-[#009FCC]">
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
