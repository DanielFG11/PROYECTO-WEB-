"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface SettingsPanelProps {
  marginPercent: number
  onMarginChange: (value: number) => void
  businessName: string
  onBusinessNameChange: (value: string) => void
}

export function SettingsPanel({
  marginPercent,
  onMarginChange,
  businessName,
  onBusinessNameChange,
}: SettingsPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <h1 className="text-lg font-semibold text-foreground">Configuracion</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Ajusta los parametros de cotizacion
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col gap-8 max-w-lg">
          {/* Business name */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
              Nombre del Negocio
            </Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => onBusinessNameChange(e.target.value)}
              placeholder="Ej: iStore RD"
              className="bg-card border-border"
            />
            <p className="text-xs text-muted-foreground">
              Se mostrara en las cotizaciones generadas
            </p>
          </div>

          <Separator />

          {/* Margin */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">
                Margen de Ganancia
              </Label>
              <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5">
                <span className="text-lg font-bold text-primary">{marginPercent}%</span>
              </div>
            </div>
            <Slider
              value={[marginPercent]}
              onValueChange={(val) => onMarginChange(val[0])}
              min={5}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5%</span>
              <span>50%</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              El margen de ganancia se descuenta del precio estimado de venta para calcular el
              monto que se ofrece al cliente por su producto.
            </p>
          </div>

          <Separator />

          {/* Pricing info */}
          <div className="rounded-xl border border-border bg-secondary/50 p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Como funciona</h3>
            <ol className="flex flex-col gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <li className="flex gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">1</span>
                <span>Se calcula el <strong className="text-foreground">precio de venta estimado</strong> segun modelo, almacenamiento y estado.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">2</span>
                <span>Se aplica el <strong className="text-foreground">margen de ganancia</strong> ({marginPercent}%) al precio de venta.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">3</span>
                <span>El resultado es el <strong className="text-foreground">pago al cliente</strong>, que es el precio de venta menos la ganancia.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
