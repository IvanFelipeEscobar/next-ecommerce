'use server'
import { redirect } from 'next/navigation'
import prisma from './prisma'
import { currentUser } from '@clerk/nextjs/server'
import { imageSchema, productSchema, validateWithSchema } from './schema'
import { uploadImage } from './supabase'

const getAuth = async () => {
  const user = await currentUser()
  if (!user) redirect('/')

  return user
}

const renderError = (error: unknown): { message: string } => {
  console.error(error)
  return {
    message: error instanceof Error ? error.message : 'there was an error...',
  }
}
export const fetchFeatured = async () =>
  await prisma.product.findMany({ where: { featured: true } })

export const fetchProducts = async ({ search = '' }: { search: string }) =>
  await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  })

export const fetchSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  })
  if (!product) redirect('/products')

  return product
}
export const createProduct = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuth()
  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File
    const validatedData = validateWithSchema(productSchema, rawData)
    const validateImage = validateWithSchema(imageSchema, { image: file })
    const imgPath = await uploadImage(validateImage.image)
    await prisma.product.create({
      data: {
        ...validatedData,
        image: imgPath,
        clerkId: user.id,
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/admin/products')
}
