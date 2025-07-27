import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Lightbulb, Rocket } from "lucide-react"

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
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-50">
      <header className="container mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="text-2xl font-bold text-purple-500">{siteContent.header_logo_text}</div>
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
              <Button className="bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700">
                {siteContent.hero_button1_text}
              </Button>
              <Button
                className="border-purple-600 bg-transparent px-8 py-3 text-lg font-semibold text-purple-400 hover:bg-purple-600 hover:text-white"
                variant="outline"
              >
                {siteContent.hero_button2_text}
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-12 text-4xl font-bold text-purple-400">{siteContent.features_title}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="bg-gray-800 text-gray-50 shadow-lg">
                <CardHeader>
                  <Code className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                  <CardTitle className="text-2xl font-semibold">{siteContent.feature1_title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{siteContent.feature1_description}</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 text-gray-50 shadow-lg">
                <Lightbulb className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">{siteContent.feature2_title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{siteContent.feature2_description}</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 text-gray-50 shadow-lg">
                <Rocket className="mx-auto mb-4 h-12 w-12 text-red-400" />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">{siteContent.feature3_title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{siteContent.feature3_description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold text-purple-400">{siteContent.about_section_title}</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-300">{siteContent.about_us_content}</p>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold text-purple-400">{siteContent.contact_section_title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">{siteContent.contact_section_description}</p>
            <Button className="mt-8 bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700">
              <Link href={`mailto:${siteContent.contact_email}`}>{siteContent.contact_button_text}</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>{siteContent.footer_text}</p>
        </div>
      </footer>
    </div>
  )
}
