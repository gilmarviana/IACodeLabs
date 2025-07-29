"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit, GripVertical } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  rectIntersection,
  useDroppable,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
}

// Componente de tarefa arrastável
function SortableTask({ task, onEdit, onDelete, onStatusChange, editingTask, setEditingTask, handleSaveEdit }: {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: Task["status"]) => void
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
  handleSaveEdit: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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
    <div 
      ref={setNodeRef} 
      style={style} 
      className="mb-4"
    >
      <Card 
        className="bg-gray-800 border-gray-700 p-4 shadow-md cursor-grab active:cursor-grabbing hover:bg-gray-750 transition-colors"
        {...listeners}
        {...attributes}
      >
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
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <h4 className="font-semibold text-gray-50">{task.title}</h4>
              </div>
              <Badge className={`${getPriorityColor(task.priority)} text-white capitalize`}>
                {task.priority}
              </Badge>
            </div>
            <p className="text-sm text-gray-300">{task.description}</p>
            <div className="flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(task)
                }}
                className="hover:bg-gray-700"
              >
                <Edit className="h-4 w-4 text-blue-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(task.id)
                }}
                className="hover:bg-gray-700"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
            <Select
              value={task.status}
              onValueChange={(value: Task["status"]) => onStatusChange(task.id, value)}
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
    </div>
  )
}

// Componente de coluna arrastável
function DroppableColumn({ 
  status, 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  editingTask, 
  setEditingTask, 
  handleSaveEdit 
}: {
  status: Task["status"]
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: Task["status"]) => void
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
  handleSaveEdit: () => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `column-${status}` })

  const getStatusTitle = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "A Fazer"
      case "in-progress":
        return "Em Progresso"
      case "done":
        return "Concluído"
      default:
        return status
    }
  }

  return (
    <Card
      className={`bg-gray-900 text-gray-50 h-fit min-h-[400px] border-2 border-dashed transition-colors ${isOver ? "border-purple-500 bg-purple-950/30" : "border-gray-700 hover:border-purple-500"}`}
    >
      <CardHeader>
        <CardTitle className="capitalize text-purple-400">
          {getStatusTitle(status)}
        </CardTitle>
      </CardHeader>
      <CardContent ref={setNodeRef} className="min-h-[300px] p-4 flex flex-col gap-2">
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              handleSaveEdit={handleSaveEdit}
            />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-500 border-2 border-dashed border-gray-600 rounded-lg">
            <p className="text-sm">Solte tarefas aqui</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
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
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reduzido para ativação mais fácil
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Se está arrastando sobre uma coluna
    if (overId.startsWith('column-')) {
      const newStatus = overId.replace('column-', '') as Task["status"]
      setTasks(tasks.map(task => 
        task.id === activeId ? { ...task, status: newStatus } : task
      ))
      return
    }

    // Se está arrastando sobre outra tarefa
    if (activeId !== overId) {
      const oldIndex = tasks.findIndex(task => task.id === activeId)
      const newIndex = tasks.findIndex(task => task.id === overId)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setTasks(arrayMove(tasks, oldIndex, newIndex))
      }
    }
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
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

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(["todo", "in-progress", "done"] as const).map((status) => (
            <DroppableColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleUpdateTask}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              handleSaveEdit={handleSaveEdit}
            />
          ))}
        </div>
        
        <DragOverlay>
          {activeTask ? (
            <Card className="bg-gray-800 border-gray-700 p-4 shadow-lg opacity-90">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-50">{activeTask.title}</h4>
                  <Badge className={`${
                    activeTask.priority === "high" ? "bg-red-500" : 
                    activeTask.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                  } text-white capitalize`}>
                    {activeTask.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-300">{activeTask.description}</p>
              </div>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
