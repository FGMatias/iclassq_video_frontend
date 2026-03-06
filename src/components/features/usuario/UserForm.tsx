import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Loader2 } from 'lucide-react'

import { useCompanies } from '@/hooks/queries/useCompany'
import { createCompanyAdminSchema, type CreateCompanyAdminFormData } from '@/schemas/usuario.schema'
import type { UserResponse } from '@/types/user.types'

interface UserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateCompanyAdminFormData) => void
  user?: UserResponse | null
  isLoading?: boolean
}

export function UserForm({ open, onOpenChange, onSubmit, user, isLoading }: UserFormProps) {
  const { data: companies = [] } = useCompanies()
  const isEditing = !!user

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCompanyAdminFormData>({
    resolver: zodResolver(createCompanyAdminSchema),
  })

  useEffect(() => {
    if (open && user) {
      reset({
        companyId: undefined,
        username: user.username,
        password: '',
        name: user.name,
        paternalSurname: user.paternalSurname ?? '',
        maternalSurname: user.maternalSurname ?? '',
        documentNumber: user.documentNumber ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
      })
    } else if (open && !user) {
      reset({
        companyId: undefined,
        username: '',
        password: '',
        name: '',
        paternalSurname: '',
        maternalSurname: '',
        documentNumber: '',
        email: '',
        phone: '',
      })
    }
  }, [open, user, reset])

  const handleFormSubmit = (data: CreateCompanyAdminFormData) => {
    onSubmit(data)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? 'Modifica los datos del administrador de empresa.'
              : 'Crea un nuevo administrador de empresa.'}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
          <form id="user-form" onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-5">
            {!isEditing && (
              <div className="space-y-2">
                <Label>Empresa *</Label>
                <Select onValueChange={(val) => setValue('companyId', Number(val))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies
                      .filter((c) => c.isActive)
                      .map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.companyId && (
                  <p className="text-destructive text-sm">{errors.companyId.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                placeholder="admin_empresa"
                disabled={isLoading}
                {...register('username')}
              />
              {errors.username && (
                <p className="text-destructive text-sm">{errors.username.message}</p>
              )}
            </div>

            {!isEditing && (
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  disabled={isLoading}
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input id="name" placeholder="Juan" disabled={isLoading} {...register('name')} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paternalSurname">Apellido Paterno</Label>
              <Input
                id="paternalSurname"
                placeholder="Pérez"
                disabled={isLoading}
                {...register('paternalSurname')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maternalSurname">Apellido Materno</Label>
              <Input
                id="maternalSurname"
                placeholder="García"
                disabled={isLoading}
                {...register('maternalSurname')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentNumber">Documento de Identidad</Label>
              <Input
                id="documentNumber"
                placeholder="12345678"
                disabled={isLoading}
                {...register('documentNumber')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@empresa.com"
                disabled={isLoading}
                {...register('email')}
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                placeholder="987654321"
                disabled={isLoading}
                {...register('phone')}
              />
              {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
            </div>
          </form>
        </ScrollArea>

        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" form="user-form" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : isEditing ? (
              'Guardar cambios'
            ) : (
              'Crear usuario'
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
