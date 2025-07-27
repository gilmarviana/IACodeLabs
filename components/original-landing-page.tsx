import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Lightbulb, Rocket } from "lucide-react"

export function OriginalLandingPage() {
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

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-50">
      <header className="container mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="text-2xl font-bold text-purple-500">{defaultContent.header_logo_text}</div>
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
            backgroundImage: `linear-gradient(to right, ${defaultContent.hero_gradient_from}, ${defaultContent.hero_gradient_to})`,
            color: defaultContent.hero_text_color,
          }}
        >
          <Image
            src={defaultContent.hero_image_url || "/placeholder.svg?height=600&width=1200&query=hero background"}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0 opacity-30"
          />
          <div className="relative z-10 max-w-4xl px-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              {defaultContent.hero_title}
            </h1>
            <p className="mt-6 text-xl">{defaultContent.hero_subtitle}</p>
            <div className="mt-10 flex justify-center space-x-4">
              <Button className="bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700">
                {defaultContent.hero_button1_text}
              </Button>
              <Button
                className="border-purple-600 bg-transparent px-8 py-3 text-lg font-semibold text-purple-400 hover:bg-purple-600 hover:text-white"
                variant="outline"
              >
                {defaultContent.hero_button2_text}
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-12 text-4xl font-bold text-purple-400">{defaultContent.features_title}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="bg-gray-800 text-gray-50 shadow-lg">
                <CardHeader>
                  <Code className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                  <CardTitle className="text-2xl font-semibold">{defaultContent.feature1_title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{defaultContent.feature1_description}</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 text-gray-50 shadow-lg">
                <Lightbulb className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">{defaultContent.feature2_title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{defaultContent.feature2_description}</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 text-gray-50 shadow-lg">
                <Rocket className="mx-auto mb-4 h-12 w-12 text-red-400" />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">{defaultContent.feature3_title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{defaultContent.feature3_description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold text-purple-400">{defaultContent.about_section_title}</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-300">{defaultContent.about_us_content}</p>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold text-purple-400">{defaultContent.contact_section_title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">{defaultContent.contact_section_description}</p>
            <Button className="mt-8 bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700">
              <Link href={`mailto:${defaultContent.contact_email}`}>{defaultContent.contact_button_text}</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>{defaultContent.footer_text}</p>
        </div>
      </footer>
    </div>
  )
}
