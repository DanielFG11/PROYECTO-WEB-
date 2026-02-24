"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, ArrowRight, RotateCcw, DollarSign, Package, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategorySelector } from "@/components/category-selector"
import { StepIndicator } from "@/components/step-indicator"
import { cn } from "@/lib/utils"
import {
  categories,
  productModels,
  storageOptions,
  conditionOptions,
  calculatePrice,
  type Category,
} from "@/lib/product-data"

const steps = [
  { label: "Producto" },
  { label: "Detalles" },
  { label: "Cotizacion" },
]

interface QuoteFormProps {
  marginPercent: number
}

export function QuoteForm({ marginPercent }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [clientName, setClientName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedStorage, setSelectedStorage] = useState<string>("")
  const [selectedCondition, setSelectedCondition] = useState<string>("")

  const hasStorage = selectedCategory ? storageOptions[selectedCategory]?.length > 0 : false

  const canGoNext = useCallback(() => {
    if (currentStep === 0) return !!selectedCategory
    if (currentStep === 1) {
      if (!selectedModel || !selectedCondition) return false
      if (hasStorage && !selectedStorage) return false
      return true
    }
    return false
  }, [currentStep, selectedCategory, selectedModel, selectedCondition, selectedStorage, hasStorage])

  const pricing = selectedCategory && selectedModel && selectedCondition
    ? calculatePrice(
        selectedCategory,
        selectedModel,
        hasStorage ? selectedStorage : null,
        selectedCondition,
        marginPercent
      )
    : null

  const handleReset = () => {
    setCurrentStep(0)
    setClientName("")
    setSelectedCategory(null)
    setSelectedModel("")
    setSelectedStorage("")
    setSelectedCondition("")
  }

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat)
    setSelectedModel("")
    setSelectedStorage("")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Producto del Cliente
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {currentStep === 0
              ? "Informacion del producto que el cliente entrega"
              : currentStep === 1
              ? "Selecciona el modelo y estado del producto"
              : "Resumen de la cotizacion"}
          </p>
        </div>
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {currentStep === 0 && (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex flex-col gap-2">
              <Label htmlFor="clientName" className="text-sm font-medium text-foreground">
                Nombre del Cliente (Opcional)
              </Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej: Juan Perez"
                className="bg-card border-border"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-foreground">
                Categoria
              </Label>
              <CategorySelector
                selected={selectedCategory}
                onSelect={handleCategorySelect}
                categories={categories}
              />
            </div>
          </div>
        )}

        {currentStep === 1 && selectedCategory && (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Modelo
              </Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  {productModels[selectedCategory].map((model) => (
                    <SelectItem key={model.name} value={model.name}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasStorage && (
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Almacenamiento
                </Label>
                <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder="Selecciona almacenamiento" />
                  </SelectTrigger>
                  <SelectContent>
                    {storageOptions[selectedCategory].map((opt) => (
                      <SelectItem key={opt.label} value={opt.label}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-foreground">
                Estado del producto
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conditionOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedCondition(opt.label)}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3.5 text-left transition-all",
                      selectedCondition === opt.label
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        selectedCondition === opt.label ? "text-primary" : "text-foreground"
                      )}
                    >
                      {opt.label}
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      {opt.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && pricing && (
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Summary card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Resumen del Producto
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                {clientName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cliente</span>
                    <span className="font-medium text-foreground">{clientName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoria</span>
                  <span className="font-medium text-foreground">{selectedCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modelo</span>
                  <span className="font-medium text-foreground">{selectedModel}</span>
                </div>
                {hasStorage && selectedStorage && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Almacenamiento</span>
                    <span className="font-medium text-foreground">{selectedStorage}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado</span>
                  <span className="font-medium text-foreground">{selectedCondition}</span>
                </div>
              </div>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border-2 border-primary bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Pago al cliente
                  </span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  ${pricing.clientPrice.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                    <Package className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Precio de venta
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${pricing.salePrice.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Ganancia
                  </span>
                </div>
                <p className="text-2xl font-bold text-accent">
                  ${pricing.profit.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Margen aplicado: {marginPercent}% | Los precios son estimaciones y pueden variar.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-card">
        <div>
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {currentStep === 2 ? (
            <Button onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Nueva Cotizacion
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!canGoNext()}
              className="gap-2"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
