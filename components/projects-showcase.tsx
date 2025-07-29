import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export type ShowcaseProject = {
  id: string
  title: string
  description: string
  image?: string
  category: string
  tags: string[]
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Plataforma completa de e-commerce com painel administrativo",
    image: "/placeholder.svg", // Substitua por imagem real
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description: "Aplicativo bancário com segurança avançada e UX intuitiva",
    image: "/placeholder.svg",
    category: "Mobile Development",
    tags: ["React Native", "Firebase", "Biometrics"],
  },
  {
    id: "3",
    title: "AI Analytics Dashboard",
    description: "Dashboard inteligente para análise de dados empresariais",
    image: "/placeholder.svg",
    category: "AI & Analytics",
    tags: ["Python", "TensorFlow", "React", "PostgreSQL"],
  },
]

export function ProjectsShowcase() {
  return (
    <section id="projects" className="py-20" style={{ backgroundColor: '#1F2E4F' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-4xl font-bold" style={{ color: '#009FCC' }}>Projetos Realizados</h2>
        <p className="mb-12 text-lg text-muted-foreground">
          Conheça alguns dos projetos que desenvolvemos para nossos clientes
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {showcaseProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-card shadow-lg overflow-hidden flex flex-col border border-border"
            >
              <div className="h-48 w-full bg-muted flex items-center justify-center">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={300}
                  height={192}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold flex-1 text-left" style={{ color: '#009FCC' }}>
                    {project.title}
                  </h3>
                  <Badge className="text-sm font-medium" style={{ backgroundColor: '#E0F2FE', color: '#009FCC' }}>
                    {project.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-left mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="px-3 py-1 text-xs font-medium border border-border"
                      style={{ backgroundColor: '#E0F2FE', color: '#009FCC' }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* Botão de exemplo com cor #009FCC */}
                <button
                  className="inline-flex mt-4 px-6 py-2 rounded-lg font-semibold text-white shadow"
                  style={{ backgroundColor: '#009FCC' }}
                >
                  Saiba mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
