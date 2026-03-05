import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'El usuario es obligatorio')
    .min(4, 'El usuario debe tener al menos 4 caracteres'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>
