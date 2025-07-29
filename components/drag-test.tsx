"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  rectIntersection,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical } from "lucide-react"

type TestItem = {
  id: string
  text: string
  status: "coluna1" | "coluna2" | "coluna3"
}

const initialItems: TestItem[] = [
  { id: "1", text: "Item 1", status: "coluna1" },
  { id: "2", text: "Item 2", status: "coluna1" },
  { id: "3", text: "Item 3", status: "coluna2" },
  { id: "4", text: "Item 4", status: "coluna2" },
  { id: "5", text: "Item 5", status: "coluna3" },
  { id: "6", text: "Item 6", status: "coluna3" },
]

function SortableItem({ item }: { item: TestItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="mb-2 bg-gray-800 border-gray-700 cursor-grab active:cursor-grabbing hover:bg-gray-750 transition-colors"
      {...listeners}
      {...attributes}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400" />
          <span className="text-gray-50">{item.text}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function DroppableColumn({ 
  status, 
  items, 
  title 
}: { 
  status: TestItem["status"]
  items: TestItem[]
  title: string
}) {
  const {
    setNodeRef,
  } = useSortable({ id: `column-${status}` })

  return (
    <Card ref={setNodeRef} className="bg-gray-900 text-gray-50 h-fit min-h-[300px] border-2 border-dashed border-gray-700 hover:border-purple-500 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-purple-400 text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] p-4">
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item.id} item={item} />
          ))}
        </SortableContext>
        {items.length === 0 && (
          <div className="flex items-center justify-center h-24 text-gray-500 border-2 border-dashed border-gray-600 rounded-lg">
            <p className="text-sm">Solte itens aqui</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function DragTest() {
  const [items, setItems] = useState<TestItem[]>(initialItems)

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Se está arrastando sobre uma coluna
    if (overId.startsWith('column-')) {
      const newStatus = overId.replace('column-', '') as TestItem["status"]
      setItems(items.map(item => 
        item.id === activeId ? { ...item, status: newStatus } : item
      ))
      return
    }

    // Se está arrastando sobre outro item
    if (activeId !== overId) {
      const oldIndex = items.findIndex(item => item.id === activeId)
      const newIndex = items.findIndex(item => item.id === overId)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setItems(arrayMove(items, oldIndex, newIndex))
      }
    }
  }

  const getItemsByStatus = (status: TestItem["status"]) => {
    return items.filter((item) => item.status === status)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-50 mb-4">Teste de Drag and Drop Entre Colunas</h2>
      <p className="text-gray-300 mb-6">Clique e arraste qualquer card para movê-lo entre as colunas:</p>
      
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DroppableColumn 
            status="coluna1" 
            items={getItemsByStatus("coluna1")} 
            title="Coluna 1" 
          />
          <DroppableColumn 
            status="coluna2" 
            items={getItemsByStatus("coluna2")} 
            title="Coluna 2" 
          />
          <DroppableColumn 
            status="coluna3" 
            items={getItemsByStatus("coluna3")} 
            title="Coluna 3" 
          />
        </div>
      </DndContext>
    </div>
  )
} 