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
  amountInStock: z.coerce.number().min(0, {message: 'amount must be a positive number'}),
  price: z.coerce.number().min(0, {
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
    .refine(
      (file) => {
        return !file || file.size <= maxSize
      },
      { message: 'File size must be less than 1MB' }
    )
    .refine(
      (file) => {
        return (
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        )
      },
      { message: 'File must be an image' }
    )
}

export const imageSchema = z.object({
  image: validateImageFile(),
})

export const reviewSchema = z.object({
  productId: z.string().refine((val) => val !== '', {
    message: 'Product ID can not be empty',
  }),
  authorName: z.string().refine((val) => val !== '', {
    message: 'Author name can not be empty',
  }),
  authorAvatar: z.string().refine((val) => val !== '', {
    message: 'User Avatar URL can not be empty',
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating can not be more than 5' }),
  comment: z
    .string()
    .min(10, { message: 'comment must be atleast 10 character long' })
    .max(1000, { message: 'comment can not be more than 1000 character long' }),
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
