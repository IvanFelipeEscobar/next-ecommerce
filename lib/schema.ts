import { z, ZodSchema } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length
      return wordCount >= 10 && wordCount <= 1000
    },
    {
      message: 'description must be between 10 and 1000 words.',
    }
  ),
})

const validateImageFile = () => {
  const maxSize = 1024 * 1024
  const acceptedFileTypes = ['image/']
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxSize
    }, 'File size must be less than 1MB')
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      )
    }, 'File must be an image')
}

export const imageSchema = z.object({
  image: validateImageFile(),
})

export const validateWithSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  const validatedData = schema.safeParse(data)
  if (!validatedData.success) {
    const err = validatedData.error.errors.map((e) => e.message)
    throw new Error(err.join(', '))
  }
  return validatedData.data
}
