"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { LandingPagePreview } from "@/components/landing-page-preview"

export default function LandingPage() {
  const supabase = getSupabaseClient()
  const [siteContent, setSiteContent] = useState({
    header_logo_text: "IA Code Labs",
    hero_title: "Bem-vindo à IA Code Labs",
    hero_subtitle: "Soluções de software inovadoras com inteligência artificial.",
    hero_button1_text: "Comece Agora",
    hero_button2_text: "Saiba Mais",
    hero_image_url: "/placeholder.svg?height=600&width=1200",
    hero_gradient_from: "#171717", // Cor de início do gradiente (gray-900)
    hero_gradient_to: "#000000", // Cor final do gradiente (black)
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
  })

  useEffect(() => {
    const fetchSiteContent = async () => {
      const { data, error } = await supabase.from("site_content").select("*").single()
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching site content:", error)
      } else if (data) {
        setSiteContent({
          header_logo_text: data.header_logo_text || "IA Code Labs",
          hero_title: data.hero_title || "Bem-vindo à IA Code Labs",
          hero_subtitle: data.hero_subtitle || "Soluções de software inovadoras com inteligência artificial.",
          hero_button1_text: data.hero_button1_text || "Comece Agora",
          hero_button2_text: data.hero_button2_text || "Saiba Mais",
          hero_image_url: data.hero_image_url || "/placeholder.svg?height=600&width=1200",
          hero_gradient_from: data.hero_gradient_from || "#171717",
          hero_gradient_to: data.hero_gradient_to || "#000000",
          hero_text_color: data.hero_text_color || "#FFFFFF",
          features_title: data.features_title || "Recursos Poderosos",
          feature1_title: data.feature1_title || "Desenvolvimento Acelerado",
          feature1_description:
            data.feature1_description ||
            "Utilize IA para gerar código, automatizar tarefas e acelerar seu ciclo de desenvolvimento.",
          feature2_title: data.feature2_title || "Soluções Inovadoras",
          feature2_description:
            data.feature2_description ||
            "Crie produtos e serviços inovadores com a ajuda de algoritmos de IA avançados.",
          feature3_title: data.feature3_title || "Escalabilidade e Performance",
          feature3_description:
            data.feature3_description || "Desenvolva aplicações robustas e escaláveis prontas para o futuro.",
          about_section_title: data.about_section_title || "Sobre Nós",
          about_us_content:
            data.about_us_content ||
            "Somos uma equipe dedicada a criar software de ponta usando as mais recentes tecnologias de IA para impulsionar o seu negócio.",
          contact_section_title: data.contact_section_title || "Entre em Contato",
          contact_section_description:
            data.contact_section_description ||
            "Tem alguma pergunta ou quer discutir seu próximo projeto? Entre em contato conosco!",
          contact_button_text: data.contact_button_text || "Enviar E-mail",
          contact_email: data.contact_email || "contato@iacodelabs.com",
          footer_text: data.footer_text || "© 2023 IA Code Labs. Todos os direitos reservados.",
        })
      }
    }
    fetchSiteContent()
  }, [supabase])

  return <LandingPagePreview siteContent={siteContent} />
}
