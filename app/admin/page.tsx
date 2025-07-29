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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


const dashboardStats = [
  {
    title: "Visitas do Site",
    value: "2,847",
    change: "+12.5%",
    icon: Eye,
    color: "text-[#60A5FA]",
  },
  {
    title: "Contatos Realizados",
    value: "156",
    change: "+8.2%",
    icon: Mail,
    color: "text-[#34D399]",
  },
  {
    title: "Mensagens Chat",
    value: "89",
    change: "+23.1%",
    icon: MessageSquare,
    color: "text-[#009FCC]",
  },
  {
    title: "Receita Mensal",
    value: "R$ 45.280",
    change: "+15.3%",
    icon: DollarSign,
    color: "text-[#1F2E4F]",
  },
]


export default function AdminDashboard() {
  // Filtros para a tabela de contatos
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filtros de datas para overview
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modal de adicionar contato
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    type: "",
    project: "",
    message: "",
    date: "",
    status: "Novo",
  });

  // Estado para projetos realizados
  const [realizados, setRealizados] = useState<Project[]>([]);

  // Estado para funções financeiras
  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [financeType, setFinanceType] = useState("Receita");
  const [finances, setFinances] = useState<Array<{
    id: number;
    nome: string;
    observacao: string;
    tipo: string;
    forma: string;
    valor: string;
    freqTipo: string;
    freqPeriodo: string;
    dias?: number;
    tag?: string;
    dataVencimento?: string;
    data?: string;
    diasMes?: string;
    finalRecorrencia?: string;
  }>>([]);
  const today = new Date().toISOString().slice(0, 10);
  const [financeForm, setFinanceForm] = useState({
    nome: "",
    observacao: "",
    tipo: "Receita",
    forma: "Dinheiro",
    valor: "",
    freqTipo: "Fixa",
    freqPeriodo: "Mês",
    dias: "",
    tag: "",
    dataVencimento: today,
    data: "",
    diasMes: "",
    finalRecorrencia: "",
    ateODia: "",
  });

  const handleAddFinance = (e: React.FormEvent) => {
    e.preventDefault();
    setFinances(prev => [
      {
        id: prev.length + 1,
        nome: financeForm.nome,
        observacao: financeForm.observacao,
        tipo: financeForm.tipo,
        forma: financeForm.forma,
        valor: financeForm.valor,
        freqTipo: financeForm.freqTipo,
        freqPeriodo: financeForm.freqPeriodo,
        dias: financeForm.freqTipo === "Recorrente" ? Number(financeForm.dias) : undefined,
        tag: financeForm.tag,
        dataVencimento: financeForm.dataVencimento,
        data: financeForm.data,
        diasMes: financeForm.diasMes,
        finalRecorrencia: financeForm.finalRecorrencia,
        ateODia: financeForm.ateODia,
      },
      ...prev
    ]);
    setFinanceModalOpen(false);
    setFinanceForm({
      nome: "",
      observacao: "",
      tipo: "Receita",
      forma: "Dinheiro",
      valor: "",
      freqTipo: "Fixa",
      freqPeriodo: "Mês",
      dias: "",
      tag: "",
      dataVencimento: today,
      data: "",
      diasMes: "",
      finalRecorrencia: "",
      ateODia: "",
    });
  };
  const [activeTab, setActiveTab] = useState("overview")
  const [userName, setUserName] = useState("Admin") // Default name
  const router = useRouter()

  // Mover os hooks para dentro do componente
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      type: "Orçamento",
      project: "E-commerce",
      message: "Olá, gostaria de um orçamento.",
      date: "2024-01-15",
      status: "Novo",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      type: "Contato",
      project: "App Mobile",
      message: "Tenho dúvidas sobre o app.",
      date: "2024-01-14",
      status: "Em andamento",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      type: "Orçamento",
      project: "Sistema ERP",
      message: "Preciso de um sistema personalizado.",
      date: "2024-01-13",
      status: "Respondido",
    },
  ])

  // Simulação: Mensagens da landing page chegam como contatos (escuta localStorage para comunicação entre abas)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const addLandingContact = (landingMessage: any) => {
      if (
        landingMessage &&
        !contacts.some(
          (c) => c.email === landingMessage.email && c.message === landingMessage.message
        )
      ) {
        setContacts((prev) => [
          {
            id: prev.length + 1,
            name: landingMessage.name,
            email: landingMessage.email,
            type: landingMessage.type || "Landing Page",
            project: landingMessage.project || "-",
            message: landingMessage.message,
            date: landingMessage.date || new Date().toISOString().slice(0, 10),
            status: "Novo",
          },
          ...prev,
        ]);
      }
    };

    // Checa ao carregar
    try {
      const raw = localStorage.getItem("__NEW_LANDING_CONTACT__");
      if (raw) {
        const landingMessage = JSON.parse(raw);
        addLandingContact(landingMessage);
      }
    } catch {}

    // Escuta eventos de storage (outras abas)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "__NEW_LANDING_CONTACT__" && e.newValue) {
        try {
          const landingMessage = JSON.parse(e.newValue);
          addLandingContact(landingMessage);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterName.toLowerCase()) &&
    contact.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
    (filterDate ? contact.date === filterDate : true) &&
    (filterStatus ? contact.status === filterStatus : true)
  );

  // Função para adicionar contato via modal
  const handleAddContactModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContacts(prev => [
      {
        id: prev.length + 1,
        ...newContact,
        date: newContact.date || new Date().toISOString().slice(0, 10),
      },
      ...prev
    ]);
    setOpenAddModal(false);
    setNewContact({ name: "", email: "", type: "", project: "", message: "", date: "", status: "Novo" });
  };

  return (
    <SidebarProvider>
      <Sidebar className="bg-white shadow-2xl border-r border-[#E5E7EB]">
        <SidebarHeader className="p-4 bg-white border-b border-[#E5E7EB]">
          <div className="text-2xl font-extrabold tracking-tight text-[#009dc9]">
            <span style={{ color: '#009dc9' }}>IA</span><span style={{ color: '#1F2E4F' }}> Labs</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto p-2 bg-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "overview"} onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "overview" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <LayoutDashboard className={`h-4 w-4 transition-colors duration-200 ${activeTab === "overview" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Visão Geral</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "contacts"} onClick={() => setActiveTab("contacts")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "contacts" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <Mail className={`h-4 w-4 transition-colors duration-200 ${activeTab === "contacts" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Contatos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "chat"} onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "chat" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <MessageCircle className={`h-4 w-4 transition-colors duration-200 ${activeTab === "chat" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "financial"} onClick={() => setActiveTab("financial")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "financial" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <DollarSign className={`h-4 w-4 transition-colors duration-200 ${activeTab === "financial" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Financeiro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "clients"} onClick={() => setActiveTab("clients")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "clients" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <Users className={`h-4 w-4 transition-colors duration-200 ${activeTab === "clients" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Clientes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "projects"} onClick={() => setActiveTab("projects")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "projects" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <FolderOpen className={`h-4 w-4 transition-colors duration-200 ${activeTab === "projects" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Projetos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "tasks"} onClick={() => setActiveTab("tasks")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "tasks" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <ListChecks className={`h-4 w-4 transition-colors duration-200 ${activeTab === "tasks" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Tarefas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "agenda"} onClick={() => setActiveTab("agenda")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition font-medium ${activeTab === "agenda" ? 'bg-[#009dc9] text-white' : 'text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9]'}`}
              >
                <CalendarDays className={`h-4 w-4 transition-colors duration-200 ${activeTab === "agenda" ? 'text-white' : 'text-[#B0B8C1] group-hover:text-[#009dc9]'}`} />
                <span>Agenda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Configurações Submenu */}
            <SidebarMenuItem>
              <Collapsible className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#1F2E4F] hover:bg-[#F3F4F6] hover:text-[#009dc9] transition font-medium">
                    <Settings className="h-4 w-4 text-[#B0B8C1] group-data-[state=open]/collapsible:text-[#009dc9] transition-colors duration-200 group-hover:text-[#009dc9]" />
                    <span>Configurações</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180 text-[#B0B8C1] group-data-[state=open]/collapsible:text-[#009dc9]" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("landing-page-editor")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Landing Page</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("projects-config")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Projetos Realizados</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("authentication-editor")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Autenticação</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("dashboard-editor")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Dashboard</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("sidebar-editor")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Sidebar</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("colors-editor")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Cores</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("clients-dashboard-editor")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Dashboard Cliente</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton onClick={() => setActiveTab("texts-editor")} className="text-[#1F2E4F] hover:text-[#009dc9]"> 
                        <span>Textos</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      <SidebarFooter className="p-4 bg-white border-t border-[#E5E7EB]">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#34D399] hover:text-[#009dc9] hover:bg-[#F3F4F6] transition font-medium">
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-[#F9FAFB] min-h-screen">
        {/* Header for mobile and content area */}
        <header className="flex h-16 shrink-0 items-center gap-2 bg-white px-4 shadow border-b border-[#E5E7EB]">
          <SidebarTrigger className="-ml-1 text-[#009dc9]" />
          <div className="flex-1 text-lg font-semibold text-[#1F2E4F] tracking-wide">Dashboard <span className='text-[#009dc9]'>Administrativo</span></div>
          <div className="flex items-center space-x-2 text-[#009dc9]">
            <User className="h-4 w-4 text-[#009dc9]" />
            <span className="font-semibold text-[#1F2E4F]">{userName}</span>
          </div>
        </header>

        <div className="p-6 bg-[#F9FAFB] min-h-[calc(100vh-4rem)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* TabsContent for each section */}
            <TabsContent value="projects-config" className="space-y-6">
              <ProjectsConfig projects={realizados} onChange={setRealizados} />
            </TabsContent>
            <TabsContent value="overview" className="space-y-6">
              {/* Filtros de datas */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <div className="flex flex-col">
                    <label
                      htmlFor="start-date"
                      className="block text-xs text-[#009dc9] mb-1 font-semibold tracking-wide cursor-pointer"
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
                      className="bg-white text-[#1F2E4F] border border-[#009dc9] rounded px-2 py-1 outline-none focus:ring-2 focus:ring-[#009dc9] transition"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="end-date"
                      className="block text-xs text-[#009dc9] mb-1 font-semibold tracking-wide cursor-pointer"
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
                      className="bg-white text-[#1F2E4F] border border-[#009dc9] rounded px-2 py-1 outline-none focus:ring-2 focus:ring-[#009dc9] transition"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-[#009dc9] text-white rounded px-4 py-2 font-semibold tracking-wide shadow-md border border-[#009dc9] transition-colors duration-200 hover:bg-[#036b8a] hover:border-[#036b8a] hover:text-white"
                  onClick={() => { setStartDate(""); setEndDate(""); }}
                >
                  Limpar Filtros
                </button>
              </div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="bg-white shadow-lg rounded-xl border border-[#E5E7EB]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-semibold text-[#009dc9] uppercase tracking-wide">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-extrabold text-[#1F2E4F]">{stat.value}</div>
                      <p className="text-xs text-[#34D399] flex items-center font-semibold">
                        <TrendingUp className="h-3 w-3 mr-1 text-[#34D399]" />
                        {stat.change} vs mês anterior
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>


              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg rounded-xl border border-[#E5E7EB]">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-[#009dc9] tracking-wide">Contatos Recentes</CardTitle>
                    <CardDescription className="text-[#6B7280] opacity-80">Últimas solicitações recebidas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contacts.slice(0, 5).map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] shadow-sm"
                        >
                          <div>
                            <p className="font-semibold text-[#1F2E4F]">{contact.name}</p>
                            <p className="text-sm text-[#009dc9]">{contact.email}</p>
                            <p className="text-xs text-[#6B7280] opacity-80">{contact.project}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="default"
                              className={
                                contact.status === "Novo"
                                  ? "bg-[#34D399] hover:bg-[#209e6c] text-white font-semibold shadow transition-colors duration-200"
                                  : contact.status === "Em andamento"
                                  ? "bg-[#bfa100] hover:bg-[#8a7300] text-white font-semibold shadow transition-colors duration-200"
                                  : "bg-[#009dc9] hover:bg-[#036b8a] text-white font-semibold shadow transition-colors duration-200"
                              }
                            >
                              {contact.status}
                            </Badge>
                            <p className="text-xs text-[#009dc9] mt-1">{contact.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg rounded-xl border border-[#E5E7EB]">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-[#009dc9] tracking-wide">Métricas do Mês</CardTitle>
                    <CardDescription className="text-[#6B7280] opacity-80">Performance atual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#1F2E4F]">Taxa de Conversão</span>
                        <span className="font-bold text-[#34D399]">5.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#1F2E4F]">Tempo Médio no Site</span>
                        <span className="font-bold text-[#009dc9]">3m 42s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#1F2E4F]">Projetos Ativos</span>
                        <span className="font-bold text-[#009dc9]">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#1F2E4F]">Satisfação do Cliente</span>
                        <span className="font-bold text-[#34D399]">4.9/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-6">
              <Card className="bg-white shadow-lg rounded-xl border border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#009dc9] tracking-wide">Gerenciamento de Contatos</CardTitle>
                  <CardDescription className="text-[#6B7280] opacity-80">
                    Todos os contatos e solicitações de orçamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Botão Adicionar Contato */}
                  <div className="flex justify-end mb-4">
                    <button
                      className="bg-[#009dc9] text-white rounded px-4 py-2 font-semibold tracking-wide shadow-md border border-[#009dc9] transition-colors duration-200 hover:bg-[#036b8a] hover:border-[#036b8a] hover:text-white"
                      onClick={() => setOpenAddModal(true)}
                    >
                      Adicionar Contato
                    </button>
                  </div>
                  {/* Filtros */}
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-xs text-[#009dc9] font-semibold mb-1">Nome</label>
                      <input value={filterName} onChange={e => setFilterName(e.target.value)} className="w-full border border-[#E5E7EB] rounded px-2 py-1 text-[#1F2E4F] bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#009dc9] font-semibold mb-1">Email</label>
                      <input value={filterEmail} onChange={e => setFilterEmail(e.target.value)} className="w-full border border-[#E5E7EB] rounded px-2 py-1 text-[#1F2E4F] bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#009dc9] font-semibold mb-1">Data</label>
                      <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-full border border-[#E5E7EB] rounded px-2 py-1 text-[#1F2E4F] bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#009dc9] font-semibold mb-1">Status</label>
                      <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full border border-[#E5E7EB] rounded px-2 py-1 text-[#1F2E4F] bg-white">
                        <option value="">Todos</option>
                        <option value="Novo">Novo</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Respondido">Respondido</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-[#E5E7EB] rounded-lg">
                      <thead>
                        <tr className="bg-[#F3F4F6] text-[#1F2E4F] text-xs uppercase">
                          <th className="px-3 py-2 border-b border-[#E5E7EB]">Nome</th>
                          <th className="px-3 py-2 border-b border-[#E5E7EB]">Email</th>
                          <th className="px-3 py-2 border-b border-[#E5E7EB]">Tipo</th>
                          <th className="px-3 py-2 border-b border-[#E5E7EB]">Projeto</th>
                          <th className="px-3 py-2 border-b border-[#E5E7EB]">Mensagem</th>
                          <th className="px-3 py-2 border-b border-[#E5E7EB]">Data</th>
                          <th className="px-3 py-2 border-b border-[#E5E7EB]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContacts.map((contact) => (
                          <tr key={contact.id} className="text-[#1F2E4F] hover:bg-[#F3F4F6] transition">
                            <td className="px-3 py-2 border-b border-[#E5E7EB] font-semibold">{contact.name}</td>
                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{contact.email}</td>
                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{contact.type}</td>
                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{contact.project}</td>
                            <td className="px-3 py-2 border-b border-[#E5E7EB] max-w-xs truncate" title={contact.message}>{contact.message}</td>
                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{contact.date}</td>
                            <td className="px-3 py-2 border-b border-[#E5E7EB]">
                              <Badge
                                variant="default"
                                className={
                                  contact.status === "Novo"
                                    ? "bg-[#34D399] hover:bg-[#209e6c] text-white font-semibold shadow transition-colors duration-200"
                                    : contact.status === "Em andamento"
                                    ? "bg-[#bfa100] hover:bg-[#8a7300] text-white font-semibold shadow transition-colors duration-200"
                                    : "bg-[#009dc9] hover:bg-[#036b8a] text-white font-semibold shadow transition-colors duration-200"
                                }
                              >
                                {contact.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Modal de adicionar contato */}
                  <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
                    <DialogContent className="bg-[#F9FAFB] border border-[#009dc9] rounded-xl shadow-2xl">
                      <form>
                        <DialogHeader>
                          <DialogTitle className="text-[#009dc9] font-bold">Adicionar Contato</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {/* Apenas campos de contato */}
                          <div>
                            <label className="block text-xs text-[#009dc9] font-semibold mb-1">Nome</label>
                            <input required value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                          </div>
                          <div>
                            <label className="block text-xs text-[#009dc9] font-semibold mb-1">Email</label>
                            <input required type="email" value={newContact.email} onChange={e => setNewContact({ ...newContact, email: e.target.value })} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                          </div>
                          <div>
                            <label className="block text-xs text-[#009dc9] font-semibold mb-1">Tipo</label>
                            <input required value={newContact.type} onChange={e => setNewContact({ ...newContact, type: e.target.value })} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                          </div>
                          <div>
                            <label className="block text-xs text-[#009dc9] font-semibold mb-1">Projeto</label>
                            <input value={newContact.project} onChange={e => setNewContact({ ...newContact, project: e.target.value })} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs text-[#009dc9] font-semibold mb-1">Mensagem</label>
                            <textarea required value={newContact.message} onChange={e => setNewContact({ ...newContact, message: e.target.value })} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                          </div>
                          <div>
                            <label className="block text-xs text-[#009dc9] font-semibold mb-1">Data</label>
                            <input type="date" value={newContact.date} onChange={e => setNewContact({ ...newContact, date: e.target.value })} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                          </div>
                          <div>
                            <label className="block text-xs text-[#009dc9] font-semibold mb-1">Status</label>
                            <select value={newContact.status} onChange={e => setNewContact({ ...newContact, status: e.target.value })} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition">
                              <option value="Novo">Novo</option>
                              <option value="Em andamento">Em andamento</option>
                              <option value="Respondido">Respondido</option>
                            </select>
                          </div>
                        </div>
                        <DialogFooter className="mt-6 flex justify-end gap-2">
                          <button type="button" onClick={() => setOpenAddModal(false)} className="px-4 py-2 rounded border border-[#009dc9] text-[#009dc9] bg-white font-semibold hover:bg-[#F3F4F6] hover:text-[#1F2E4F] transition">Cancelar</button>
                          <button type="submit" className="bg-[#009dc9] text-white rounded px-4 py-2 font-semibold tracking-wide shadow-md border border-[#009dc9] transition-colors duration-200 hover:bg-[#036b8a] hover:border-[#036b8a] hover:text-white">Salvar</button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              <Card className="bg-white shadow-lg rounded-xl border border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#009dc9] tracking-wide">Chat</CardTitle>
                  <CardDescription className="text-[#6B7280] opacity-80">Converse com seus clientes em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-2 bg-white rounded-lg border border-[#E5E7EB]">
                    <div className="min-h-[300px] flex flex-col">
                      <ChatInterface />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="flex justify-end mb-4">
                <button
                  className="bg-[#009dc9] text-white rounded px-4 py-2 font-semibold tracking-wide shadow-md border border-[#009dc9] transition-colors duration-200 hover:bg-[#036b8a] hover:border-[#036b8a] hover:text-white"
                  onClick={() => setFinanceModalOpen(true)}
                >
                  Nova Receita/Despesa
                </button>
              </div>
              {/* Modal de adicionar função financeira */}
              <Dialog open={financeModalOpen} onOpenChange={setFinanceModalOpen}>
                <DialogContent className="bg-[#F9FAFB] border border-[#009dc9] rounded-xl shadow-2xl">
                  <form onSubmit={handleAddFinance}>
                    <DialogHeader>
                      <DialogTitle className="text-[#009dc9] font-bold">Nova Receita/Despesa</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-xs text-[#009dc9] font-semibold mb-1">Nome</label>
                        <input required value={financeForm.nome} onChange={e => setFinanceForm(f => ({ ...f, nome: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                      </div>
                      <div>
                        <label className="block text-xs text-[#009dc9] font-semibold mb-1">Observação</label>
                        <input value={financeForm.observacao} onChange={e => setFinanceForm(f => ({ ...f, observacao: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                      </div>
                      <div>
                        <label className="block text-xs text-[#009dc9] font-semibold mb-1">Tipo</label>
                        <select value={financeForm.tipo} onChange={e => setFinanceForm(f => ({ ...f, tipo: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition">
                          <option value="Receita">Receita</option>
                          <option value="Despesa">Despesa</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-[#009dc9] font-semibold mb-1">Forma de Pagamento</label>
                        <select value={financeForm.forma} onChange={e => setFinanceForm(f => ({ ...f, forma: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition">
                          <option value="Dinheiro">Dinheiro</option>
                          <option value="Cartão">Cartão</option>
                          <option value="Pix">Pix</option>
                          <option value="Boleto">Boleto</option>
                          <option value="Transferência">Transferência</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-[#009dc9] font-semibold mb-1">Frequência</label>
                        <div className="flex gap-2">
                          <select value={financeForm.freqTipo} onChange={e => setFinanceForm(f => ({ ...f, freqTipo: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition">
                            <option value="Fixa">Fixa</option>
                            <option value="Recorrente">Recorrente</option>
                          </select>
                          <select value={financeForm.freqPeriodo} onChange={e => setFinanceForm(f => ({ ...f, freqPeriodo: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition">
                            <option value="Mês">Mês</option>
                            <option value="Dia">Dia</option>
                            <option value="Quinzena">Quinzena</option>
                          </select>
                        </div>
                        {/* Instrução para recorrência mensal/quinzenal */}
                        {financeForm.freqTipo === "Recorrente" && financeForm.freqPeriodo === "Mês" && (
                          <span className="text-xs text-[#6B7280] block mt-1">O vencimento será considerado todo mês no mesmo dia selecionado em Data de Vencimento.</span>
                        )}
                        {financeForm.freqTipo === "Recorrente" && financeForm.freqPeriodo === "Quinzena" && (
                          <span className="text-xs text-[#6B7280] block mt-1">O vencimento será considerado 15 dias após a data de vencimento selecionada.</span>
                        )}
                      </div>
                      {financeForm.freqTipo === "Recorrente" && (
                        <div>
                          <label className="block text-xs text-[#009dc9] font-semibold mb-1">A cada</label>
                          <input type="number" min="1" value={financeForm.dias} onChange={e => setFinanceForm(f => ({ ...f, dias: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                        </div>
                      )}

                      {/* Data de Vencimento */}
                      <div>
                        <label className="block text-xs text-[#009dc9] font-semibold mb-1">Data de Vencimento</label>
                        <input type="date" value={financeForm.dataVencimento || today} onChange={e => setFinanceForm(f => ({ ...f, dataVencimento: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                      </div>
                      <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-xs text-[#009dc9] font-semibold mb-1">Tags</label>
                          <input type="text" placeholder="Ex: Aluguel, Internet" value={financeForm.tag || ""} onChange={e => setFinanceForm(f => ({ ...f, tag: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-[#009dc9] font-semibold mb-1">Valor</label>
                          <input type="number" min="0" step="0.01" required value={financeForm.valor} onChange={e => setFinanceForm(f => ({ ...f, valor: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" placeholder="Ex: 1000.00" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-[#009dc9] font-semibold mb-1">Até o dia</label>
                        <input type="number" min="1" max="31" value={financeForm.ateODia || ""} onChange={e => setFinanceForm(f => ({ ...f, ateODia: e.target.value }))} className="w-full border border-[#009dc9] rounded px-2 py-1 text-[#1F2E4F] bg-white focus:ring-2 focus:ring-[#009dc9] transition" placeholder="Ex: 10" />
                      </div>
                      </div>
                    </div>
                    <DialogFooter className="mt-6 flex justify-end gap-2">
                      <button type="button" onClick={() => setFinanceModalOpen(false)} className="px-4 py-2 rounded border border-[#009dc9] text-[#009dc9] bg-white font-semibold hover:bg-[#F3F4F6] hover:text-[#1F2E4F] transition">Cancelar</button>
                      <button type="submit" className="bg-[#009dc9] text-white rounded px-4 py-2 font-semibold tracking-wide shadow-md border border-[#009dc9] transition-colors duration-200 hover:bg-[#036b8a] hover:border-[#036b8a] hover:text-white">Salvar</button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* Tabela de funções financeiras */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border border-[#E5E7EB] rounded-lg">
                  <thead>
                    <tr className="bg-[#F3F4F6] text-[#1F2E4F] text-xs uppercase">
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Nome</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Observação</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Tipo</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Forma</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Valor</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Frequência</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Período</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Dias</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Até o dia</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Data de Vencimento</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Tags</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Data do Lançamento</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Dias do Mês</th>
                      <th className="px-3 py-2 border-b border-[#E5E7EB]">Final da Recorrência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finances.map((f) => (
                      <tr key={f.id} className="text-[#1F2E4F] hover:bg-[#F3F4F6] transition">
                        <td className="px-3 py-2 border-b border-[#E5E7EB] font-semibold">{f.nome}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.observacao}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.tipo}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.forma}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.valor}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.freqTipo}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.freqPeriodo}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.freqTipo === "Recorrente" && f.freqPeriodo === "Dia" ? f.dias : (f.dias || "-")}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.ateODia || "-"}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.dataVencimento || "-"}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.tag || "-"}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.data || "-"}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.diasMes || "-"}</td>
                        <td className="px-3 py-2 border-b border-[#E5E7EB]">{f.finalRecorrencia || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6">
              <Card className="bg-white shadow-lg rounded-xl border border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#009dc9] tracking-wide">Gerenciamento de Clientes</CardTitle>
                  <CardDescription className="text-[#6B7280] opacity-80">
                    Lista de todos os clientes e seus projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-3 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] shadow-sm">
                        <div>
                          <p className="font-semibold text-[#1F2E4F]">{client.name}</p>
                          <p className="text-sm text-[#009dc9]">{client.email}</p>
                          <p className="text-xs text-[#6B7280] opacity-80">{client.projects} projetos</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#1F2E4F]">{client.value}</p>
                          <Badge
                            variant={client.status === "Ativo" ? "default" : "secondary"}
                            className={client.status === "Ativo"
                              ? "bg-[#34D399] hover:bg-[#209e6c] text-white font-semibold shadow transition-colors duration-200"
                              : "bg-[#009dc9] hover:bg-[#036b8a] text-white font-semibold shadow transition-colors duration-200"}
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
