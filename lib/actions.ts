import prisma from './prisma'

export const fetchFeatured = async () =>
  await prisma.product.findMany({ where: { featured: true } })

export const fetchProducts = async () =>
  await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
