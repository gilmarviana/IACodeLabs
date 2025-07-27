"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Search } from "lucide-react"

type Project = {
  id: string
  name: string
  description: string
  status: "planning" | "in-progress" | "completed" | "on-hold"
  client: string
  startDate: string
  endDate?: string
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Plataforma E-commerce B2B",
      description: "Desenvolvimento de uma plataforma de e-commerce para vendas entre empresas.",
      status: "in-progress",
      client: "Tech Solutions Ltda.",
      startDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Aplicativo Mobile para Delivery",
      description: "Criação de um aplicativo iOS/Android para serviço de entrega de alimentos.",
      status: "planning",
      client: "Food Express S.A.",
      startDate: "2024-02-01",
    },
    {
      id: "3",
      name: "Sistema de Gestão Financeira",
      description: "Sistema web para controle financeiro e emissão de relatórios.",
      status: "completed",
      client: "Financier Corp.",
      startDate: "2023-09-10",
      endDate: "2023-12-20",
    },
  ])

  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    status: "planning",
    client: "",
    startDate: "",
  })

  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddProject = () => {
    if (newProject.name.trim() && newProject.client.trim() && newProject.startDate.trim()) {
      setProjects([...projects, { ...newProject, id: Date.now().toString() }])
      setNewProject({ name: "", description: "", status: "planning", client: "", startDate: "" })
    }
  }

  const handleUpdateProjectStatus = (id: string, newStatus: Project["status"]) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, status: newStatus } : project)))
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
  }

  const handleSaveEdit = () => {
    if (editingProject) {
      setProjects(projects.map((project) => (project.id === editingProject.id ? editingProject : project)))
      setEditingProject(null)
    }
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "planning":
        return "bg-blue-500"
      case "in-progress":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      case "on-hold":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 text-gray-50">
        <CardHeader>
          <CardTitle>Adicionar Novo Projeto</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Nome do Projeto"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400"
          />
          <Input
            placeholder="Cliente"
            value={newProject.client}
            onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
            className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400"
          />
          <Input
            type="date"
            placeholder="Data de Início"
            value={newProject.startDate}
            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
            className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400"
          />
          <Select
            value={newProject.status}
            onValueChange={(value: Project["status"]) => setNewProject({ ...newProject, status: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-50">
              <SelectItem value="planning">Planejamento</SelectItem>
              <SelectItem value="in-progress">Em Progresso</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="on-hold">Em Espera</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Descrição do Projeto"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="col-span-full bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400"
          />
          <Button onClick={handleAddProject} className="col-span-full bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Adicionar Projeto
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 text-gray-50">
        <CardHeader>
          <CardTitle>Meus Projetos</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-gray-400">Nenhum projeto encontrado.</p>
          ) : (
            filteredProjects.map((project) => (
              <Card key={project.id} className="bg-gray-800 border-gray-700 p-4 shadow-md">
                {editingProject?.id === project.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editingProject.name}
                      onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-gray-50"
                    />
                    <Input
                      value={editingProject.client}
                      onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-gray-50"
                    />
                    <Input
                      type="date"
                      value={editingProject.startDate}
                      onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-gray-50"
                    />
                    <Select
                      value={editingProject.status}
                      onValueChange={(value: Project["status"]) =>
                        setEditingProject({ ...editingProject, status: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-50">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-gray-50">
                        <SelectItem value="planning">Planejamento</SelectItem>
                        <SelectItem value="in-progress">Em Progresso</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="on-hold">Em Espera</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-gray-50"
                    />
                    <Button onClick={handleSaveEdit} className="w-full bg-green-600 hover:bg-green-700">
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-50">{project.name}</h4>
                      <Badge className={`${getStatusColor(project.status)} text-white capitalize`}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300">Cliente: {project.client}</p>
                    <p className="text-sm text-gray-300">Início: {project.startDate}</p>
                    {project.endDate && <p className="text-sm text-gray-300">Fim: {project.endDate}</p>}
                    <p className="text-sm text-gray-300">{project.description}</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                        <Edit className="h-4 w-4 text-blue-400" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                    <Select
                      value={project.status}
                      onValueChange={(value: Project["status"]) => handleUpdateProjectStatus(project.id, value)}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-50">
                        <SelectValue placeholder="Mudar Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-gray-50">
                        <SelectItem value="planning">Planejamento</SelectItem>
                        <SelectItem value="in-progress">Em Progresso</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="on-hold">Em Espera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
