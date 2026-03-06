import { Badge } from '../ui/badge'

interface StatusBadgeProps {
  isActive: boolean
  activeLabel?: string
  inactiveLabel?: string
}

export function StatusBadge({
  isActive,
  activeLabel = 'Activo',
  inactiveLabel = 'Inactivo',
}: StatusBadgeProps) {
  return (
    <Badge variant={isActive ? 'default' : 'secondary'}>
      {isActive ? activeLabel : inactiveLabel}
    </Badge>
  )
}
