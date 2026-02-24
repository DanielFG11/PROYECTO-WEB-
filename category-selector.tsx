"use client"

import { Calculator, Settings, Apple, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type View = "cotizar" | "configuracion"

interface AppSidebarProps {
  currentView: View
  onViewChange: (view: View) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const navItems = [
  { id: "cotizar" as const, label: "Cotizar", icon: Calculator },
  { id: "configuracion" as const, label: "Configuracion", icon: Settings },
]

export function AppSidebar({ currentView, onViewChange, collapsed, onToggleCollapse }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out relative shrink-0",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-sidebar-primary">
          <Apple className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-base font-semibold tracking-tight text-sidebar-foreground whitespace-nowrap">
            Permutas Apple
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                  title={item.label}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-3 border-t border-sidebar-border">
        <button
          onClick={onToggleCollapse}
          className="flex items-center justify-center w-full rounded-lg py-2 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  )
}
