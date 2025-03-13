'use server'
import { redirect } from 'next/navigation'
import prisma from './prisma'

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProduct = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData)
  console.log(data)
  return {message: 'product'}
}
