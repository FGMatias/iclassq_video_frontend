import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import type { NavGroup } from './sidebar-nav'

interface NavMainProps {
  groups: NavGroup[]
}

export function NavMain({ groups }: NavMainProps) {
  const location = useLocation()

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.label} className="space-y-1">
          <p className="text-muted-foreground px-3 text-[11px] font-semibold tracking-wider uppercase">
            {group.label}
          </p>
          {group.items.map((item) => {
            const isActive =
              location.pathname === item.url ||
              (item.url !== '/' && location.pathname.startsWith(item.url))

            return (
              <Link
                key={item.url}
                to={item.url}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </div>
      ))}
    </div>
  )
}
