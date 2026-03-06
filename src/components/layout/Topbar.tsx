import { Bell, Settings } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { routeGroups, routeLabels } from '@/constants/routes'

export function Topbar() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const firstSegment = segments[0] ?? ''
  const group = routeGroups[firstSegment] ?? ''
  const label = routeLabels[firstSegment] ?? firstSegment

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          {group && (
            <>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>{group}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="size-4" />
        </Button>
      </div>
    </header>
  )
}
