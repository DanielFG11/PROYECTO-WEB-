"use client"

import { Calculator, Settings, Apple } from "lucide-react"
import { cn } from "@/lib/utils"

type View = "cotizar" | "configuracion"

interface MobileNavProps {
  currentView: View
  onViewChange: (view: View) => void
}

const navItems = [
  { id: "cotizar" as const, label: "Cotizar", icon: Calculator },
  { id: "configuracion" as const, label: "Configuracion", icon: Settings },
]

export function MobileNav({ currentView, onViewChange }: MobileNavProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary">
          <Apple className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-sidebar-foreground">
          Permutas Apple
        </span>
      </div>
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-muted hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
