import { AuthenticationPreview } from "./authentication-preview"

const defaultAuthSettings = {
  background_image_url: "/images/signup-background.png",
  login_title: "Entrar",
  login_description: "Acesse sua conta IA Code Labs",
  register_title: "Cadastre-se",
  register_description: "Crie sua conta IA Code Labs",
  card_bg_color: "#1F2937", // Cor de fundo do card no tema escuro
  text_color: "#F9FAFB", // Cor do texto no tema escuro
  button_bg_color: "#9333EA", // Cor do botão principal
  button_text_color: "#FFFFFF",
}

export function OriginalAuthentication() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold text-foreground p-4 border-b border-border">Página de Login Original</h3>
      <div className="flex-1 overflow-y-auto">
        <AuthenticationPreview settings={defaultAuthSettings} type="login" />
      </div>
      <h3 className="text-lg font-semibold text-foreground p-4 border-t border-border mt-4">
        Página de Registro Original
      </h3>
      <div className="flex-1 overflow-y-auto">
        <AuthenticationPreview settings={defaultAuthSettings} type="register" />
      </div>
    </div>
  )
}
