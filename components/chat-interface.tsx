"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area" // Assumindo que ScrollArea está disponível ou será adicionado
import { Send, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  sender: "agent" | "client"
  text: string
  timestamp: string
}

type Conversation = {
  id: string
  clientName: string
  lastMessage: string
  messages: Message[]
  unreadCount: number
}

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv1",
      clientName: "João Silva",
      lastMessage: "Ok, obrigado!",
      unreadCount: 1,
      messages: [
        { id: "msg1", sender: "client", text: "Olá, preciso de ajuda com meu projeto.", timestamp: "10:00" },
        { id: "msg2", sender: "agent", text: "Claro, como posso ajudar?", timestamp: "10:01" },
        { id: "msg3", sender: "client", text: "Minha integração com a API não está funcionando.", timestamp: "10:05" },
        { id: "msg4", sender: "agent", text: "Poderia me dar mais detalhes sobre o erro?", timestamp: "10:06" },
        { id: "msg5", sender: "client", text: "Recebo um erro 401 de autenticação.", timestamp: "10:07" },
        { id: "msg6", sender: "agent", text: "Verifique suas credenciais e o token de acesso.", timestamp: "10:08" },
        { id: "msg7", sender: "client", text: "Ok, obrigado!", timestamp: "10:09" },
      ],
    },
    {
      id: "conv2",
      clientName: "Maria Souza",
      lastMessage: "Entendido, vou verificar.",
      unreadCount: 0,
      messages: [
        { id: "msg8", sender: "client", text: "Quando o novo recurso estará disponível?", timestamp: "Ontem 14:30" },
        { id: "msg9", sender: "agent", text: "Estamos finalizando os testes, em breve!", timestamp: "Ontem 14:35" },
        { id: "msg10", sender: "client", text: "Entendido, vou verificar.", timestamp: "Ontem 14:40" },
      ],
    },
    {
      id: "conv3",
      clientName: "Pedro Almeida",
      lastMessage: "Perfeito!",
      unreadCount: 0,
      messages: [
        { id: "msg11", sender: "client", text: "Gostaria de agendar uma reunião.", timestamp: "23/01 09:00" },
        { id: "msg12", sender: "agent", text: "Qual sua disponibilidade?", timestamp: "23/01 09:05" },
        { id: "msg13", sender: "client", text: "Perfeito!", timestamp: "23/01 09:10" },
      ],
    },
  ])

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(conversations[0]?.id || null)
  const [newMessageText, setNewMessageText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedConversation = conversations.find((conv) => conv.id === selectedConversationId)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation?.messages])

  const handleSendMessage = () => {
    if (newMessageText.trim() && selectedConversationId) {
      const now = new Date()
      const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "agent", // Assuming admin is the agent
        text: newMessageText.trim(),
        timestamp: timestamp,
      }

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: newMessage.text,
                unreadCount: 0, // Mark as read when agent sends message
              }
            : conv,
        ),
      )
      setNewMessageText("")
    }
  }

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id)
    setConversations((prevConversations) =>
      prevConversations.map((conv) => (conv.id === id ? { ...conv, unreadCount: 0 } : conv)),
    )
  }

  return (
    <Card className="flex h-[calc(100vh-150px)] bg-card shadow-sm overflow-hidden">
      {/* Left Panel: Conversation List */}
      <div className="w-1/3 border-r border-border bg-muted/50 overflow-y-auto">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-lg text-foreground">Conversas</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-70px)]">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer hover:bg-accent transition-colors",
                selectedConversationId === conv.id && "bg-accent",
              )}
              onClick={() => handleSelectConversation(conv.id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40&query=${conv.clientName}`} />
                <AvatarFallback>{conv.clientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-foreground">{conv.clientName}</p>
                  {conv.unreadCount > 0 && (
                    <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right Panel: Chat Area */}
      <div className="flex flex-col flex-1">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b border-border py-4">
              <CardTitle className="text-lg text-foreground">{selectedConversation.clientName}</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex items-end gap-2", message.sender === "agent" ? "justify-end" : "justify-start")}
                >
                  {message.sender === "client" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&query=${selectedConversation.clientName}`}
                      />
                      <AvatarFallback>{selectedConversation.clientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] p-3 rounded-lg",
                      message.sender === "agent"
                        ? "bg-purple-600 text-white"
                        : "bg-muted text-foreground border border-border",
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={cn(
                        "text-xs mt-1 block",
                        message.sender === "agent" ? "text-purple-200" : "text-muted-foreground",
                      )}
                    >
                      {message.timestamp}
                    </span>
                  </div>
                  {message.sender === "agent" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <div className="border-t border-border p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mr-2" />
            Selecione uma conversa para começar a conversar.
          </div>
        )}
      </div>
    </Card>
  )
}
