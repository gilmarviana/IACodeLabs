
import Link from "next/link"
import { useState, useEffect } from "react"
import { ProjectsManager } from "@/components/projects-manager"
import { ProjectsShowcase } from "@/components/projects-showcase"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Lightbulb, Rocket, Sun, Moon } from "lucide-react"

interface LandingPageContent {
  header_logo_text: string
  hero_title: string
  hero_subtitle: string
  hero_button1_text: string
  hero_button2_text: string
  hero_image_url: string
  hero_gradient_from: string
  hero_gradient_to: string
  hero_text_color: string
  features_title: string
  feature1_title: string
  feature1_description: string
  feature2_title: string
  feature2_description: string
  feature3_title: string
  feature3_description: string
  about_section_title: string
  about_us_content: string
  contact_section_title: string
  contact_section_description: string
  contact_button_text: string
  contact_email: string
  footer_text: string
}

interface LandingPagePreviewProps {
  siteContent: LandingPageContent
}

export function LandingPagePreview({ siteContent }: LandingPagePreviewProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setActiveHash(window.location.hash);
    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const bgColor = "bg-[#009FCC]";
  const textColor = darkMode ? "text-white" : "text-[#131C2E]";
  const cardBg = darkMode ? "bg-[#009FCC]" : "bg-[#F3F4F6]";
  const cardText = darkMode ? "text-white" : "text-[#131C2E]";
  const borderColor = darkMode ? "border-white" : "border-[#009FCC]";
  const buttonBg = darkMode ? "bg-white text-[#009FCC]" : "bg-[#009FCC] text-white";
  const buttonHover = darkMode ? "hover:bg-white" : "hover:bg-[#00BFFF]";
  if (!mounted) {
    // Evita renderização até o componente estar montado no cliente
    return null;
  }
  return (
    <div className={`flex min-h-screen flex-col ${bgColor} ${textColor} transition-colors duration-300`}>
      <header className="w-full px-0 py-6 fixed top-0 left-0 right-0 z-50 bg-[#009FCC] bg-opacity-90 backdrop-blur">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-4">
          <div className="text-2xl font-bold flex-shrink-0" style={{color:'#025066'}}>{siteContent.header_logo_text}</div>
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-6">
              <li>
                <Link
                  className={`text-white hover:text-white${activeHash === '#features' ? ' font-bold underline' : ''}`}
                  href="#features"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  className={`text-white hover:text-white${activeHash === '#projects' ? ' font-bold underline' : ''}`}
                  href="#projects"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  className={`text-white hover:text-white${activeHash === '#about' ? ' font-bold underline' : ''}`}
                  href="#about"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  className={`text-white hover:text-white${activeHash === '#contact' ? ' font-bold underline' : ''}`}
                  href="#contact"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex-shrink-0 ml-6 flex items-center gap-2">
            {/* Ícone de alternância de tema ocultado */}
            <Link href="/auth/login">
              <button className="px-4 py-2 rounded font-semibold border border-[#025066] bg-[#025066] text-white hover:bg-[#0377a6] transition-colors">
                Login
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        <section
          className="relative flex h-[600px] items-center justify-center overflow-hidden py-20 text-center"
          style={{
            backgroundImage: `linear-gradient(to right, ${siteContent.hero_gradient_from}, ${siteContent.hero_gradient_to})`,
            color: siteContent.hero_text_color,
          }}
        >
          <Image
            src={siteContent.hero_image_url || "/placeholder.svg?height=600&width=1200&query=hero background"}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0 opacity-30"
          />
          <div className="relative z-10 max-w-4xl px-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">{siteContent.hero_title}</h1>
            <p className="mt-6 text-xl">{siteContent.hero_subtitle}</p>
            <div className="mt-10 flex justify-center space-x-4">
              <Button className="bg-[#FFFFFF] px-8 py-3 text-lg font-semibold text-[#009FCC] hover:bg-[#00BFFF]">
                {siteContent.hero_button1_text}
              </Button>
              <Button
                className="border-[#FFFFFF] bg-transparent px-8 py-3 text-lg font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#009FCC]"
                variant="outline"
              >
                {siteContent.hero_button2_text}
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20" style={{ backgroundColor: '#111827' }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-12 text-4xl font-bold" style={{color:'#009FCC'}}>{siteContent.features_title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {/* Card 1 - Desenvolvimento Acelerado */}
              <Card className="bg-gray-800 text-gray-50 shadow-lg flex flex-col items-center py-10 px-6 h-full">
                <CardHeader className="flex flex-col items-center">
                  <Code className="mb-4 h-12 w-12 text-blue-400" />
                  <CardTitle className="text-2xl font-semibold mb-2">Desenvolvimento Acelerado</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <CardDescription className="text-gray-300 text-base text-center max-w-xs">
                    Utilize IA para gerar código, automatizar tarefas e acelerar seu ciclo de desenvolvimento.
                  </CardDescription>
                </CardContent>
              </Card>
              {/* Card 2 - Soluções Inovadoras */}
              <Card className="bg-gray-800 text-gray-50 shadow-lg flex flex-col items-center py-10 px-6 h-full">
                <CardHeader className="flex flex-col items-center">
                  <Lightbulb className="mb-4 h-12 w-12 text-yellow-400" />
                  <CardTitle className="text-2xl font-semibold mb-2">Soluções Inovadoras</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <CardDescription className="text-gray-300 text-base text-center max-w-xs">
                    Crie produtos e serviços inovadores com a ajuda de algoritmos de IA avançados.
                  </CardDescription>
                </CardContent>
              </Card>
              {/* Card 3 - Escalabilidade e Performance */}
              <Card className="bg-gray-800 text-gray-50 shadow-lg flex flex-col items-center py-10 px-6 h-full">
                <CardHeader className="flex flex-col items-center">
                  <Rocket className="mb-4 h-12 w-12 text-red-400" />
                  <CardTitle className="text-2xl font-semibold mb-2">Escalabilidade e Performance</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <CardDescription className="text-gray-300 text-base text-center max-w-xs">
                    Desenvolva aplicações robustas e escaláveis prontas para o futuro.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção de Projetos Realizados - layout showcase */}
        <ProjectsShowcase />

        <section id="about" className="bg-gray-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold" style={{color:'#009FCC'}}>{siteContent.about_section_title}</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-300">{siteContent.about_us_content}</p>
          </div>
        </section>

        <section id="contact" className="py-20" style={{ backgroundColor: '#1F2E4F' }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold" style={{color:'#009FCC'}}>{siteContent.contact_section_title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">{siteContent.contact_section_description}</p>
            <Button className="mt-8 bg-[#FFFFFF] px-8 py-3 text-lg font-semibold text-[#009FCC] hover:bg-[#00BFFF]">
              <Link href={`mailto:${siteContent.contact_email}`}>{siteContent.contact_button_text}</Link>
            </Button>
            {/* Formulário de contato */}
            <form className="mt-12 max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 text-left" style={{color:'#131C2E'}} onSubmit={e => e.preventDefault()}>
              <h3 className="text-2xl font-bold mb-6 text-center">Envie uma mensagem</h3>
              <div className="mb-4">
                <label htmlFor="nome" className="block mb-2 font-semibold">Nome</label>
                <input id="nome" name="nome" type="text" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#009FCC] bg-white border-[#009FCC]" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                <input id="email" name="email" type="email" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#009FCC] bg-white border-[#009FCC]" />
              </div>
              <div className="mb-4">
                <label htmlFor="mensagem" className="block mb-2 font-semibold">Mensagem</label>
                <textarea id="mensagem" name="mensagem" rows={4} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#009FCC] bg-white border-[#009FCC]" />
              </div>
              <button type="submit" className="w-full bg-[#009FCC] text-white font-semibold py-3 rounded hover:bg-[#00BFFF] transition-colors">Enviar</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>© 2025 IA Code Labs. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Balão flutuante do WhatsApp */}
      <a
        href="https://wa.me/5511977942784"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.21-3.69.97.99-3.59-.23-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
        </svg>
      </a>
    </div>
  )
}
