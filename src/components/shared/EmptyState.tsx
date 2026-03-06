import { InboxIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title = 'Sin resultados',
  description = 'No se encontraron registros',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-muted-foreground mb-4">
        {icon ?? <InboxIcon className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
