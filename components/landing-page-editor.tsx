"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase-client"
import { ImageIcon, Save, Eye, GitCompare } from "lucide-react" // Importar GitCompare
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LandingPagePreview } from "./landing-page-preview"
import { OriginalLandingPage } from "./original-landing-page"
import { LandingPageComparison } from "./landing-page-comparison" // Importar o novo componente

// No início do arquivo, antes da função LandingPageEditor, defina os valores padrão:
const defaultLandingPageContent = {
  header_logo_text: "IA Code Labs",
  hero_title: "Bem-vindo à IA Code Labs",
  hero_subtitle: "Soluções de software inovadoras com inteligência artificial.",
  hero_button1_text: "Comece Agora",
  hero_button2_text: "Saiba Mais",
  hero_image_url: "/placeholder.svg?height=600&width=1200",
  hero_gradient_from: "#171717", // gray-900
  hero_gradient_to: "#000000", // black
  hero_text_color: "#FFFFFF",
  features_title: "Recursos Poderosos",
  feature1_title: "Desenvolvimento Acelerado",
  feature1_description: "Utilize IA para gerar código, automatizar tarefas e acelerar seu ciclo de desenvolvimento.",
  feature2_title: "Soluções Inovadoras",
  feature2_description: "Crie produtos e serviços inovadores com a ajuda de algoritmos de IA avançados.",
  feature3_title: "Escalabilidade e Performance",
  feature3_description: "Desenvolva aplicações robustas e escaláveis prontas para o futuro.",
  about_section_title: "Sobre Nós",
  about_us_content:
    "Somos uma equipe dedicada a criar software de ponta usando as mais recentes tecnologias de IA para impulsionar o seu negócio.",
  contact_section_title: "Entre em Contato",
  contact_section_description: "Tem alguma pergunta ou quer discutir seu próximo projeto? Entre em contato conosco!",
  contact_button_text: "Enviar E-mail",
  contact_email: "contato@iacodelabs.com",
  footer_text: "© 2023 IA Code Labs. Todos os direitos reservados.",
}

export function LandingPageEditor() {
  const supabase = getSupabaseClient()
  // Dentro da função LandingPageEditor, atualize a inicialização do useState:
  // Substitua:
  // const [siteContent, setSiteContent] = useState({ ... });
  // Por:
  const [siteContent, setSiteContent] = useState(defaultLandingPageContent)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSiteContent = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("site_content").select("*").single()
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching site content:", error)
        setError("Erro ao carregar conteúdo do site.")
      } else if (data) {
        // E dentro do useEffect, ao buscar os dados do Supabase, use COALESCE para garantir que os valores padrão sejam usados se os dados do banco forem nulos:
        // Substitua o bloco `setSiteContent` dentro do `useEffect` por:
        setSiteContent({
          header_logo_text: data.header_logo_text || defaultLandingPageContent.header_logo_text,
          hero_title: data.hero_title || defaultLandingPageContent.hero_title,
          hero_subtitle: data.hero_subtitle || defaultLandingPageContent.hero_subtitle,
          hero_button1_text: data.hero_button1_text || defaultLandingPageContent.hero_button1_text,
          hero_button2_text: data.hero_button2_text || defaultLandingPageContent.hero_button2_text,
          hero_image_url: data.hero_image_url || defaultLandingPageContent.hero_image_url,
          hero_gradient_from: data.hero_gradient_from || defaultLandingPageContent.hero_gradient_from,
          hero_gradient_to: data.hero_gradient_to || defaultLandingPageContent.hero_gradient_to,
          hero_text_color: data.hero_text_color || defaultLandingPageContent.hero_text_color,
          features_title: data.features_title || defaultLandingPageContent.features_title,
          feature1_title: data.feature1_title || defaultLandingPageContent.feature1_title,
          feature1_description: data.feature1_description || defaultLandingPageContent.feature1_description,
          feature2_title: data.feature2_title || defaultLandingPageContent.feature2_title,
          feature2_description: data.feature2_description || defaultLandingPageContent.feature2_description,
          feature3_title: data.feature3_title || defaultLandingPageContent.feature3_title,
          feature3_description: data.feature3_description || defaultLandingPageContent.feature3_description,
          about_section_title: data.about_section_title || defaultLandingPageContent.about_section_title,
          about_us_content: data.about_us_content || defaultLandingPageContent.about_us_content,
          contact_section_title: data.contact_section_title || defaultLandingPageContent.contact_section_title,
          contact_section_description:
            data.contact_section_description || defaultLandingPageContent.contact_section_description,
          contact_button_text: data.contact_button_text || defaultLandingPageContent.contact_button_text,
          contact_email: data.contact_email || defaultLandingPageContent.contact_email,
          footer_text: data.footer_text || defaultLandingPageContent.footer_text,
        })
      }
      setLoading(false)
    }
    fetchSiteContent()
  }, [supabase])

  const handleSave = async () => {
    setLoading(true)
    setMessage("")
    setError("")

    const { data, error } = await supabase
      .from("site_content")
      .upsert(
        {
          id: 1, // Assuming a single row for site content
          header_logo_text: siteContent.header_logo_text,
          hero_title: siteContent.hero_title,
          hero_subtitle: siteContent.hero_subtitle,
          hero_button1_text: siteContent.hero_button1_text,
          hero_button2_text: siteContent.hero_button2_text,
          about_us_content: siteContent.about_us_content,
          contact_email: siteContent.contact_email,
          contact_section_description: siteContent.contact_section_description,
          contact_button_text: siteContent.contact_button_text,
          footer_text: siteContent.footer_text,
          hero_gradient_from: siteContent.hero_gradient_from,
          hero_gradient_to: siteContent.hero_gradient_to,
          hero_text_color: siteContent.hero_text_color,
          hero_image_url: siteContent.hero_image_url,
          features_title: siteContent.features_title,
          feature1_title: siteContent.feature1_title,
          feature1_description: siteContent.feature1_description,
          feature2_title: siteContent.feature2_title,
          feature2_description: siteContent.feature2_description,
          feature3_title: siteContent.feature3_title,
          feature3_description: siteContent.feature3_description,
          about_section_title: siteContent.about_section_title,
          contact_section_title: siteContent.contact_section_title,
        },
        { onConflict: "id" },
      )
      .select()

    if (error) {
      console.error("Error saving site content:", error)
      setError("Erro ao salvar conteúdo: " + error.message)
    } else {
      setMessage("Conteúdo da Landing Page salvo com sucesso!")
    }
    setLoading(false)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setError("Por favor, selecione uma imagem para upload.")
      return
    }

    const file = event.target.files[0]
    const filePath = `public/hero_images/${Date.now()}_${file.name}`

    setLoading(true)
    setMessage("")
    setError("")

    const { data, error: uploadError } = await supabase.storage.from("site-assets").upload(filePath, file)

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      setError("Erro ao fazer upload da imagem: " + uploadError.message)
    } else {
      const { data: publicUrlData } = supabase.storage.from("site-assets").getPublicUrl(filePath)
      if (publicUrlData) {
        setSiteContent((prev) => ({ ...prev, hero_image_url: publicUrlData.publicUrl }))
        setMessage("Imagem de fundo do Hero enviada com sucesso!")
      } else {
        setError("Erro ao obter URL pública da imagem.")
      }
    }
    setLoading(false)
  }

  if (loading && !message && !error) {
    return (
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Carregando Editor da Landing Page...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">Carregando dados...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-lg border text-card-foreground bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Editor da Landing Page</CardTitle>
        <CardDescription className="text-muted-foreground">
          Personalize textos, cores e imagens da sua página inicial.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6" style={{paddingLeft: 20, paddingRight: 20}}>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="header">
            <AccordionTrigger className="hover:!bg-[#009FCC] hover:!text-white rounded-md px-5">Logo e Cabeçalho</AccordionTrigger>
            <AccordionContent className="!bg-[#111827] rounded-md p-4" style={{paddingLeft: 20, paddingRight: 20}}>
              <div className="grid gap-4 pl-3">
                <Label htmlFor="header_logo_text">Texto do Logo no Cabeçalho</Label>
                <Input
                  id="header_logo_text"
                  value={siteContent.header_logo_text}
                  onChange={(e) => setSiteContent({ ...siteContent, header_logo_text: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="hero">
            <AccordionTrigger className="hover:!bg-[#009FCC] hover:!text-white rounded-md px-5">Hero</AccordionTrigger>
            <AccordionContent className="!bg-[#111827] rounded-md p-4" style={{paddingLeft: 20, paddingRight: 20}}>
              <div className="grid gap-4 pl-3">
                <Label htmlFor="hero_title">Título do Hero</Label>
                <Input
                  id="hero_title"
                  value={siteContent.hero_title}
                  onChange={(e) => setSiteContent({ ...siteContent, hero_title: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4 pl-3">
                <Label htmlFor="hero_subtitle">Subtítulo do Hero</Label>
                <Textarea
                  id="hero_subtitle"
                  value={siteContent.hero_subtitle}
                  onChange={(e) => setSiteContent({ ...siteContent, hero_subtitle: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4 pl-3">
                <Label htmlFor="hero_button1_text">Texto do Botão 1 do Hero</Label>
                <Input
                  id="hero_button1_text"
                  value={siteContent.hero_button1_text}
                  onChange={(e) => setSiteContent({ ...siteContent, hero_button1_text: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4 pl-3">
                <Label htmlFor="hero_button2_text">Texto do Botão 2 do Hero</Label>
                <Input
                  id="hero_button2_text"
                  value={siteContent.hero_button2_text}
                  onChange={(e) => setSiteContent({ ...siteContent, hero_button2_text: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="hero_gradient_from">Cor de Início do Gradiente do Hero (Hex)</Label>
                <Input
                  id="hero_gradient_from"
                  type="color"
                  value={siteContent.hero_gradient_from}
                  onChange={(e) => setSiteContent({ ...siteContent, hero_gradient_from: e.target.value })}
                  className="w-full h-10 p-1 border-border rounded-md"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="hero_gradient_to">Cor Final do Gradiente do Hero (Hex)</Label>
                <Input
                  id="hero_gradient_to"
                  type="color"
                  value={siteContent.hero_gradient_to}
                  onChange={(e) => setSiteContent({ ...siteContent, hero_gradient_to: e.target.value })}
                  className="w-full h-10 p-1 border-border rounded-md"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="hero_text_color">Cor do Texto do Hero (Hex)</Label>
                <Input
                  id="hero_text_color"
                  type="color"
                  value={siteContent.hero_text_color}
                  onChange={(e) => setSiteContent({ ...siteContent, hero_text_color: e.target.value })}
                  className="w-full h-10 p-1 border-border rounded-md"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="hero_image">Imagem de Fundo do Hero</Label>
                <div className="flex items-center gap-4">
                  <Input id="hero_image" type="file" onChange={handleImageUpload} className="flex-1" />
                  {siteContent.hero_image_url && (
                    <img
                      src={siteContent.hero_image_url || "/placeholder.svg"}
                      alt="Hero Background Preview"
                      className="w-24 h-16 object-cover rounded-md border border-border"
                    />
                  )}
                </div>
                <CardDescription className="text-muted-foreground flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  Faça upload de uma nova imagem para o fundo da seção Hero.
                </CardDescription>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="features">
            <AccordionTrigger className="hover:!bg-[#009FCC] hover:!text-white rounded-md px-5">Recursos</AccordionTrigger>
            <AccordionContent className="!bg-[#111827] rounded-md p-4" style={{paddingLeft: 20, paddingRight: 20}}>
              <div className="grid gap-4">
                <Label htmlFor="features_title">Título da Seção de Recursos</Label>
                <Input
                  id="features_title"
                  value={siteContent.features_title}
                  onChange={(e) => setSiteContent({ ...siteContent, features_title: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="feature1_title">Título do Recurso 1</Label>
                <Input
                  id="feature1_title"
                  value={siteContent.feature1_title}
                  onChange={(e) => setSiteContent({ ...siteContent, feature1_title: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="feature1_description">Descrição do Recurso 1</Label>
                <Textarea
                  id="feature1_description"
                  value={siteContent.feature1_description}
                  onChange={(e) => setSiteContent({ ...siteContent, feature1_description: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="feature2_title">Título do Recurso 2</Label>
                <Input
                  id="feature2_title"
                  value={siteContent.feature2_title}
                  onChange={(e) => setSiteContent({ ...siteContent, feature2_title: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="feature2_description">Descrição do Recurso 2</Label>
                <Textarea
                  id="feature2_description"
                  value={siteContent.feature2_description}
                  onChange={(e) => setSiteContent({ ...siteContent, feature2_description: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="feature3_title">Título do Recurso 3</Label>
                <Input
                  id="feature3_title"
                  value={siteContent.feature3_title}
                  onChange={(e) => setSiteContent({ ...siteContent, feature3_title: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="feature3_description">Descrição do Recurso 3</Label>
                <Textarea
                  id="feature3_description"
                  value={siteContent.feature3_description}
                  onChange={(e) => setSiteContent({ ...siteContent, feature3_description: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="about">
            <AccordionTrigger className="hover:!bg-[#009FCC] hover:!text-white rounded-md px-5">Sobre Nós</AccordionTrigger>
            <AccordionContent className="!bg-[#111827] rounded-md p-4" style={{paddingLeft: 20, paddingRight: 20}}>
              <div className="grid gap-4">
                <Label htmlFor="about_section_title">Título da Seção Sobre Nós</Label>
                <Input
                  id="about_section_title"
                  value={siteContent.about_section_title}
                  onChange={(e) => setSiteContent({ ...siteContent, about_section_title: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="about_us_content">Conteúdo Sobre Nós</Label>
                <Textarea
                  id="about_us_content"
                  value={siteContent.about_us_content}
                  onChange={(e) => setSiteContent({ ...siteContent, about_us_content: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contact">
            <AccordionTrigger className="hover:!bg-[#009FCC] hover:!text-white rounded-md px-5">Contato</AccordionTrigger>
            <AccordionContent className="!bg-[#111827] rounded-md p-4" style={{paddingLeft: 20, paddingRight: 20}}>
              <div className="grid gap-4">
                <Label htmlFor="contact_section_title">Título da Seção de Contato</Label>
                <Input
                  id="contact_section_title"
                  value={siteContent.contact_section_title}
                  onChange={(e) => setSiteContent({ ...siteContent, contact_section_title: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="contact_section_description">Descrição da Seção de Contato</Label>
                <Textarea
                  id="contact_section_description"
                  value={siteContent.contact_section_description}
                  onChange={(e) => setSiteContent({ ...siteContent, contact_section_description: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="contact_button_text">Texto do Botão de Contato</Label>
                <Input
                  id="contact_button_text"
                  value={siteContent.contact_button_text}
                  onChange={(e) => setSiteContent({ ...siteContent, contact_button_text: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="contact_email">E-mail de Contato</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={siteContent.contact_email}
                  onChange={(e) => setSiteContent({ ...siteContent, contact_email: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="footer">
            <AccordionTrigger className="hover:!bg-[#009FCC] hover:!text-white rounded-md px-5">Rodapé</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <Label htmlFor="footer_text">Texto do Rodapé</Label>
                <Input
                  id="footer_text"
                  value={siteContent.footer_text}
                  onChange={(e) => setSiteContent({ ...siteContent, footer_text: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-4" style={{paddingLeft: 20, paddingRight: 20, background: '#111827', borderRadius: 8}}>
          {/* Use flex-wrap para botões em telas menores */}
          <Button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-[#009FCC] text-[#FAFAFA] font-medium hover:bg-[#1F2E4F] hover:text-[#009FCC] min-w-[180px] transition"
          >
            <Save className="mr-2 h-4 w-4" /> {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-[#1F2E4F] hover:text-[#009FCC] min-w-[180px] transition"
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar Landing Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Pré-visualização da Landing Page</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é uma pré-visualização das suas alterações.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <LandingPagePreview siteContent={siteContent} />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-[#1F2E4F] hover:text-[#009FCC] min-w-[180px] transition"
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar Página Original
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Página Original</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é a versão original da landing page do sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <OriginalLandingPage />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border text-foreground hover:bg-[#1F2E4F] hover:text-[#009FCC] min-w-[180px] transition"
              >
                <GitCompare className="mr-2 h-4 w-4" /> Comparar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-xl h-[90vh] p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b border-border">
                <DialogTitle className="text-foreground">Comparação da Landing Page</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Esta é a página original com suas alterações destacadas.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <LandingPageComparison editedContent={siteContent} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
