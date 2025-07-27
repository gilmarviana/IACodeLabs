import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Lightbulb, Rocket } from "lucide-react"
import { cn } from "@/lib/utils" // Importar cn para classes condicionais

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

interface LandingPageComparisonProps {
  editedContent: LandingPageContent
}

export function LandingPageComparison({ editedContent }: LandingPageComparisonProps) {
  const defaultContent = {
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

  const isChanged = (key: keyof LandingPageContent) => editedContent[key] !== defaultContent[key]

  const HighlightBadge = () => (
    <span className="ml-2 inline-flex items-center rounded-md bg-yellow-400/20 px-2 py-0.5 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20">
      Alterado
    </span>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-50">
      <header className="container mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        <div
          className={cn(
            "text-2xl font-bold text-purple-500",
            isChanged("header_logo_text") && "bg-yellow-900/30 p-1 rounded",
          )}
        >
          {editedContent.header_logo_text}
          {isChanged("header_logo_text") && <HighlightBadge />}
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-6">
            <li>
              <Link className="hover:text-purple-400" href="#features">
                Recursos
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" href="#about">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" href="#contact">
                Contato
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" href="/auth/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section
          className="relative flex h-[600px] items-center justify-center overflow-hidden py-20 text-center"
          style={{
            backgroundImage: `linear-gradient(to right, ${editedContent.hero_gradient_from}, ${editedContent.hero_gradient_to})`,
            color: editedContent.hero_text_color,
          }}
        >
          <Image
            src={editedContent.hero_image_url || "/placeholder.svg?height=600&width=1200&query=hero background"}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className={cn(
              "absolute inset-0 z-0 opacity-30",
              isChanged("hero_image_url") && "border-4 border-yellow-500",
            )}
          />
          <div className="relative z-10 max-w-4xl px-4">
            <h1
              className={cn(
                "text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl",
                isChanged("hero_title") && "bg-yellow-900/30 p-1 rounded",
              )}
            >
              {editedContent.hero_title}
              {isChanged("hero_title") && <HighlightBadge />}
            </h1>
            <p className={cn("mt-6 text-xl", isChanged("hero_subtitle") && "bg-yellow-900/30 p-1 rounded")}>
              {editedContent.hero_subtitle}
              {isChanged("hero_subtitle") && <HighlightBadge />}
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Button
                className={cn(
                  "bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700",
                  isChanged("hero_button1_text") && "border-2 border-yellow-500",
                )}
              >
                {editedContent.hero_button1_text}
                {isChanged("hero_button1_text") && <HighlightBadge />}
              </Button>
              <Button
                className={cn(
                  "border-purple-600 bg-transparent px-8 py-3 text-lg font-semibold text-purple-400 hover:bg-purple-600 hover:text-white",
                  isChanged("hero_button2_text") && "border-2 border-yellow-500",
                )}
                variant="outline"
              >
                {editedContent.hero_button2_text}
                {isChanged("hero_button2_text") && <HighlightBadge />}
              </Button>
            </div>
            {(isChanged("hero_gradient_from") || isChanged("hero_gradient_to") || isChanged("hero_text_color")) && (
              <div className="mt-4 text-sm text-yellow-400 bg-yellow-900/30 p-2 rounded">
                Cores do gradiente ou texto do Hero alteradas. <HighlightBadge />
              </div>
            )}
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2
              className={cn(
                "mb-12 text-4xl font-bold text-purple-400",
                isChanged("features_title") && "bg-yellow-900/30 p-1 rounded",
              )}
            >
              {editedContent.features_title}
              {isChanged("features_title") && <HighlightBadge />}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card
                className={cn(
                  "bg-gray-800 text-gray-50 shadow-lg",
                  (isChanged("feature1_title") || isChanged("feature1_description")) && "border-2 border-yellow-500",
                )}
              >
                <CardHeader>
                  <Code className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                  <CardTitle
                    className={cn(
                      "text-2xl font-semibold",
                      isChanged("feature1_title") && "bg-yellow-900/30 p-1 rounded",
                    )}
                  >
                    {editedContent.feature1_title}
                    {isChanged("feature1_title") && <HighlightBadge />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={cn("text-gray-300", isChanged("feature1_description") && "bg-yellow-900/30 p-1 rounded")}
                  >
                    {editedContent.feature1_description}
                    {isChanged("feature1_description") && <HighlightBadge />}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card
                className={cn(
                  "bg-gray-800 text-gray-50 shadow-lg",
                  (isChanged("feature2_title") || isChanged("feature2_description")) && "border-2 border-yellow-500",
                )}
              >
                <Lightbulb className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "text-2xl font-semibold",
                      isChanged("feature2_title") && "bg-yellow-900/30 p-1 rounded",
                    )}
                  >
                    {editedContent.feature2_title}
                    {isChanged("feature2_title") && <HighlightBadge />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={cn("text-gray-300", isChanged("feature2_description") && "bg-yellow-900/30 p-1 rounded")}
                  >
                    {editedContent.feature2_description}
                    {isChanged("feature2_description") && <HighlightBadge />}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card
                className={cn(
                  "bg-gray-800 text-gray-50 shadow-lg",
                  (isChanged("feature3_title") || isChanged("feature3_description")) && "border-2 border-yellow-500",
                )}
              >
                <Rocket className="mx-auto mb-4 h-12 w-12 text-red-400" />
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "text-2xl font-semibold",
                      isChanged("feature3_title") && "bg-yellow-900/30 p-1 rounded",
                    )}
                  >
                    {editedContent.feature3_title}
                    {isChanged("feature3_title") && <HighlightBadge />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={cn("text-gray-300", isChanged("feature3_description") && "bg-yellow-900/30 p-1 rounded")}
                  >
                    {editedContent.feature3_description}
                    {isChanged("feature3_description") && <HighlightBadge />}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2
              className={cn(
                "mb-8 text-4xl font-bold text-purple-400",
                isChanged("about_section_title") && "bg-yellow-900/30 p-1 rounded",
              )}
            >
              {editedContent.about_section_title}
              {isChanged("about_section_title") && <HighlightBadge />}
            </h2>
            <p
              className={cn(
                "mx-auto max-w-3xl text-lg text-gray-300",
                isChanged("about_us_content") && "bg-yellow-900/30 p-1 rounded",
              )}
            >
              {editedContent.about_us_content}
              {isChanged("about_us_content") && <HighlightBadge />}
            </p>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2
              className={cn(
                "mb-8 text-4xl font-bold text-purple-400",
                isChanged("contact_section_title") && "bg-yellow-900/30 p-1 rounded",
              )}
            >
              {editedContent.contact_section_title}
              {isChanged("contact_section_title") && <HighlightBadge />}
            </h2>
            <p
              className={cn(
                "mx-auto max-w-2xl text-lg text-gray-300",
                isChanged("contact_section_description") && "bg-yellow-900/30 p-1 rounded",
              )}
            >
              {editedContent.contact_section_description}
              {isChanged("contact_section_description") && <HighlightBadge />}
            </p>
            <Button
              className={cn(
                "mt-8 bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700",
                (isChanged("contact_button_text") || isChanged("contact_email")) && "border-2 border-yellow-500",
              )}
            >
              <Link href={`mailto:${editedContent.contact_email}`}>{editedContent.contact_button_text}</Link>
              {(isChanged("contact_button_text") || isChanged("contact_email")) && <HighlightBadge />}
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p className={cn("", isChanged("footer_text") && "bg-yellow-900/30 p-1 rounded")}>
            {editedContent.footer_text}
            {isChanged("footer_text") && <HighlightBadge />}
          </p>
        </div>
      </footer>
    </div>
  )
}
