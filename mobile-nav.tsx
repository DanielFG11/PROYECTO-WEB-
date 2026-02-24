"use client"

import { Smartphone, Tablet, Laptop, Headphones, Pen, Watch } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/product-data"

const categoryIcons: Record<Category, React.ElementType> = {
  iPhone: Smartphone,
  iPad: Tablet,
  MacBook: Laptop,
  AirPods: Headphones,
  "Apple Pencil": Pen,
  Accesorios: Watch,
}

interface CategorySelectorProps {
  selected: Category | null
  onSelect: (category: Category) => void
  categories: Category[]
}

export function CategorySelector({ selected, onSelect, categories }: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {categories.map((cat) => {
        const Icon = categoryIcons[cat]
        const isSelected = selected === cat
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "flex flex-col items-center gap-2.5 rounded-xl border-2 px-4 py-5 text-sm font-medium transition-all duration-200",
              isSelected
                ? "border-primary bg-primary/5 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground hover:shadow-sm"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                isSelected ? "bg-primary/10" : "bg-muted"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span>{cat}</span>
          </button>
        )
      })}
    </div>
  )
}
