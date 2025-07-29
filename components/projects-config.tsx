import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

interface ProjectsConfigProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsConfig({ projects, onChange }: ProjectsConfigProps) {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Project>>({});

  const handleAdd = () => {
    setEditingId("new");
    setDraft({ title: "", description: "", imageUrl: "", link: "" });
    setModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setDraft({ ...project });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!draft.title || !draft.description) return;
    if (editingId === "new") {
      const newProject: Project = {
        id: Date.now().toString(),
        title: draft.title!,
        description: draft.description!,
        imageUrl: draft.imageUrl || "",
        link: draft.link || "",
      };
      const updated = [...localProjects, newProject];
      setLocalProjects(updated);
      onChange(updated);
    } else if (editingId) {
      const updated = localProjects.map((p) =>
        p.id === editingId ? { ...p, ...draft } : p
      );
      setLocalProjects(updated);
      onChange(updated);
    }
    setEditingId(null);
    setDraft({});
    setModalOpen(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraft({});
    setModalOpen(false);
  };

  const handleRemove = (id: string) => {
    const updated = localProjects.filter((p) => p.id !== id);
    setLocalProjects(updated);
    onChange(updated);
    if (editingId === id) {
      setEditingId(null);
      setDraft({});
    }
  };

  const handleDraftChange = (field: keyof Project, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projetos Realizados</h2>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="bg-[#009FCC] text-white">Adicionar Projeto</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="w-full max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-4 text-[#009FCC]">{editingId === "new" ? "Adicionar Projeto" : "Editar Projeto"}</h3>
              <input
                className="w-full font-bold text-base bg-transparent border-b border-[#009FCC] focus:outline-none mb-2"
                placeholder="Título do Projeto"
                value={draft.title || ""}
                onChange={(e) => handleDraftChange("title", e.target.value)}
              />
              <input
                className="w-full mb-2 bg-transparent border-b border-[#009FCC] focus:outline-none text-sm"
                placeholder="Descrição"
                value={draft.description || ""}
                onChange={(e) => handleDraftChange("description", e.target.value)}
              />
              <input
                className="w-full mb-2 bg-transparent border-b border-[#009FCC] focus:outline-none text-sm"
                placeholder="URL da Imagem"
                value={draft.imageUrl || ""}
                onChange={(e) => handleDraftChange("imageUrl", e.target.value)}
              />
              <input
                className="w-full mb-2 bg-transparent border-b border-[#009FCC] focus:outline-none text-sm"
                placeholder="Link do Projeto (opcional)"
                value={draft.link || ""}
                onChange={(e) => handleDraftChange("link", e.target.value)}
              />
              <div className="flex gap-2 mt-3 justify-end">
                <Button onClick={handleSave} className="bg-[#009FCC] text-white px-4 py-1 text-sm">Salvar</Button>
                <Button onClick={handleCancel} className="bg-gray-300 text-[#009FCC] px-4 py-1 text-sm">Cancelar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de projetos com preview igual landing page */}
      <div className="grid gap-8 md:grid-cols-3">
        {localProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl bg-card shadow-lg overflow-hidden flex flex-col border border-[#009FCC]"
          >
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={project.imageUrl || "/placeholder.svg"}
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
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#009FCC] text-[#009FCC]" onClick={() => handleEdit(project)}>
                    Editar
                  </Button>
                  <Button size="sm" className="bg-red-500 text-white" onClick={() => handleRemove(project.id)}>
                    Remover
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-left mb-4">{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#009FCC] underline text-sm mt-auto">Ver Projeto</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
