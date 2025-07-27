"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit } from "lucide-react"

type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Configurar ambiente de desenvolvimento",
      description: "Instalar Node.js, npm, Next.js e dependências do projeto.",
      status: "todo",
      priority: "high",
    },
    {
      id: "2",
      title: "Desenvolver componente de login",
      description: "Criar a interface de usuário e integrar com a API de autenticação.",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "3",
      title: "Implementar dashboard do cliente",
      description: "Desenvolver a interface e as funcionalidades do painel do cliente.",
      status: "done",
      priority: "medium",
    },
    {
      id: "4",
      title: "Revisar código e otimizar performance",
      description: "Realizar code review e aplicar otimizações de performance.",
      status: "todo",
      priority: "medium",
    },
  ])

  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  })

  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now().toString() }])
      setNewTask({ title: "", description: "", status: "todo", priority: "medium" })
    }
  }

  const handleUpdateTask = (id: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleSaveEdit = () => {
    if (editingTask) {
      setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
      setEditingTask(null)
    }
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 text-gray-50">
        <CardHeader>
          <CardTitle>Adicionar Nova Tarefa</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Título da Tarefa"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400"
          />
          <Textarea
            placeholder="Descrição da Tarefa"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="bg-gray-800 border-gray-700 text-gray-50 placeholder:text-gray-400"
          />
          <Select
            value={newTask.priority}
            onValueChange={(value: Task["priority"]) => setNewTask({ ...newTask, priority: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-50">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-50">
              <SelectItem value="low">Baixa</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newTask.status}
            onValueChange={(value: Task["status"]) => setNewTask({ ...newTask, status: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-50">
              <SelectItem value="todo">A Fazer</SelectItem>
              <SelectItem value="in-progress">Em Progresso</SelectItem>
              <SelectItem value="done">Concluído</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddTask} className="col-span-full bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Adicionar Tarefa
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {["todo", "in-progress", "done"].map((status) => (
          <Card key={status} className="bg-gray-900 text-gray-50">
            <CardHeader>
              <CardTitle className="capitalize text-purple-400">
                {status === "todo" && "A Fazer"}
                {status === "in-progress" && "Em Progresso"}
                {status === "done" && "Concluído"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getTasksByStatus(status as Task["status"]).map((task) => (
                <Card key={task.id} className="bg-gray-800 border-gray-700 p-4 shadow-md">
                  {editingTask?.id === task.id ? (
                    <div className="space-y-2">
                      <Input
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-gray-50"
                      />
                      <Textarea
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-gray-50"
                      />
                      <Select
                        value={editingTask.priority}
                        onValueChange={(value: Task["priority"]) => setEditingTask({ ...editingTask, priority: value })}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-50">
                          <SelectValue placeholder="Prioridade" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-gray-50">
                          <SelectItem value="low">Baixa</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={editingTask.status}
                        onValueChange={(value: Task["status"]) => setEditingTask({ ...editingTask, status: value })}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-50">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-gray-50">
                          <SelectItem value="todo">A Fazer</SelectItem>
                          <SelectItem value="in-progress">Em Progresso</SelectItem>
                          <SelectItem value="done">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleSaveEdit} className="w-full bg-green-600 hover:bg-green-700">
                        Salvar
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-50">{task.title}</h4>
                        <Badge className={`${getPriorityColor(task.priority)} text-white capitalize`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300">{task.description}</p>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditTask(task)}>
                          <Edit className="h-4 w-4 text-blue-400" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                      <Select
                        value={task.status}
                        onValueChange={(value: Task["status"]) => handleUpdateTask(task.id, value)}
                      >
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-50">
                          <SelectValue placeholder="Mudar Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-gray-50">
                          <SelectItem value="todo">A Fazer</SelectItem>
                          <SelectItem value="in-progress">Em Progresso</SelectItem>
                          <SelectItem value="done">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
