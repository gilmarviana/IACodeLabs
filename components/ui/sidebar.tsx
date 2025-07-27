"use client"

import * as React from "react"
import * as RovingFocusGroupPrimitive from "@radix-ui/react-roving-focus"
import { Slot } from "@radix-ui/react-slot" // Certifique-se de que Slot está importado
import { DynamicLucideIcon } from "@/components/dynamic-lucide-icon"

import { cn } from "@/lib/utils"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined)

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>
}

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <aside
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-background transition-transform duration-300 ease-in-out lg:translate-x-0", // Removida a borda direita
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
        {...props}
      />
    )
  },
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => {
    const { setIsOpen } = useSidebar()
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:hidden",
          className,
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
        <span className="sr-only">Toggle sidebar</span>
      </button>
    )
  },
)
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex min-h-screen w-full flex-col lg:pl-64", className)} {...props} />
  },
)
SidebarInset.displayName = "SidebarInset"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto p-4", className)} {...props} />
  ),
)
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between p-4", className)} {...props} /> // Removida a borda inferior
  ),
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} /> // Removida a borda superior
  ),
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef<
  React.ElementRef<typeof RovingFocusGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RovingFocusGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RovingFocusGroupPrimitive.Root
    ref={ref}
    orientation="vertical"
    loop
    className={cn("flex flex-col space-y-1 list-none", className)} // Adicionado list-none para remover os pontos
    {...props}
  />
))
SidebarMenu.displayName = RovingFocusGroupPrimitive.Root.displayName

// SidebarMenuItem is now the RovingFocusGroupPrimitive.Item, using asChild to pass props to the li
const SidebarMenuItem = React.forwardRef<
  React.ElementRef<typeof RovingFocusGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RovingFocusGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <RovingFocusGroupPrimitive.Item
    ref={ref}
    asChild // Pass RovingFocusGroupItem props to the li element
    {...props}
  >
    <li className={cn("relative", className)}>{children}</li>
  </RovingFocusGroupPrimitive.Item>
))
SidebarMenuItem.displayName = RovingFocusGroupPrimitive.Item.displayName

// SidebarMenuButton is a regular button/slot, it receives focus props via asChild from SidebarMenuItem or CollapsibleTrigger
const SidebarMenuButton = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & {
    isActive?: boolean
    asChild?: boolean
    iconName?: string // Adicionado para o nome do ícone
  }
>(({ className, isActive, asChild, iconName, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      ref={ref}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors hover:bg-purple-600 hover:text-white", // Alterado hover
        isActive && "bg-purple-600 text-white", // Alterado isActive
        className,
      )}
      {...props}
    >
      {iconName && <DynamicLucideIcon name={iconName} className="h-4 w-4" />} {/* Renderiza o ícone dinamicamente */}
      {children}
    </Comp>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuSub = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ml-4 flex flex-col space-y-1", className)} {...props} />
  ),
)
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
}
