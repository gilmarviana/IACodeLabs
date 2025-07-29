"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

interface RegistrationSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function RegistrationSuccessModal({ isOpen, onClose, email }: RegistrationSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registro Concluído!</DialogTitle>
          <DialogDescription>
            Sua conta foi criada com sucesso. Por favor, verifique seu e-mail para confirmar seu endereço e ativar sua
            conta.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">
            Um e-mail de confirmação foi enviado para: <span className="font-medium text-gray-900">{email}</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">Se você não o encontrar, verifique sua pasta de spam.</p>
        </div>
        <DialogFooter>
          <Button asChild>
            <Link href="/auth/login">Ir para o Login</Link>
          </Button>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
