'use server'
import { redirect } from 'next/navigation'
import prisma from './prisma'
import { currentUser } from '@clerk/nextjs/server'
import { imageSchema, productSchema, validateWithSchema } from './schema'
import { deleteImage, uploadImage } from './supabase'
import { revalidatePath } from 'next/cache'


const getAuth = async () => {
  const user = await currentUser()
  if (!user) redirect('/')
  return user
}

const getAdminUser = async () => {
  const admin = await getAuth()
  if (admin.id !== process.env.ADMIN_USER_ID) redirect('/')
  return admin
}

const renderError = (error: unknown): { message: string } => {
  console.log(error)
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

export const fetchAdminProduct = async () => {
  await getAdminUser()
  return await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
}

export const deleteProduct = async (prevState: { productId: string }) => {
  const { productId } = prevState
  await getAdminUser()
  try {
    const product = await prisma.product.delete({ where: { id: productId } })
    await deleteImage(product.image)
    revalidatePath('/admin/products')
    return { message: 'product removed' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductDetails = async (productId: string) => {
  await getAdminUser()
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) redirect('/admin/products')
  return product
}

export const updateProduct = async (prevState: unknown, formData: FormData) => {
  await getAdminUser()

  try {
    const id = formData.get('id') as string
    const data = Object.fromEntries(formData)
    const productData = validateWithSchema(productSchema, data)
    await prisma.product.update({
      where: { id },
      data: { ...productData },
    })
    revalidatePath(`/admin/products/${id}`)
  } catch (error) {
    return renderError(error)
  }

  return { message: 'product updated succesfully' }
}
export const updateImage = async (prevState: unknown, formData: FormData) => {
  await getAdminUser()
  try {
    const img = formData.get('image') as File
    const oldImg = formData.get('url') as string
    const id = formData.get('id') as string
    const validFile = validateWithSchema(imageSchema, { image: img })
    const imgPath = await uploadImage(validFile.image)
    await deleteImage(oldImg)
    await prisma.product.update({
      where: { id },
      data: { image: imgPath },
    })
    revalidatePath(`/admin/products/${id}`)
    return { message: 'product image updated succesfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavId = async (productId: string) => {
  const user = await getAuth()
  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  })
  return favorite?.id || null
}

export const toggleFavorite = async (prevState: {
  productId: string
  favoriteId: string | null
  pathName: string
}) => {
  const user = await getAuth()
  const { productId, favoriteId, pathName } = prevState
  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    } else {
      await prisma.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      })
    }
    revalidatePath(pathName)
    return {
      message: favoriteId ? 'removed from favorites' : 'added to favorites',
    }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavorites = async() => {
  const user = await getAuth()
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id
    },
    include: {
      product: true
    }
  })
return favorites
}

export const createReview = async (prevState: unknown, formData: FormData) => {
  const user = getAuth()
try {
  const data = Object.fromEntries(formData)
  console.log(user, data)

return { message: 'Your review has been submitted' }
} catch (error) {
  return renderError(error)
}
}

export const fetchReviews = async () => {}
export const fetchReviewsFromUser = async () => {}
export const deleteReview = async () => {}
export const findReview = async () => {}
export const fetchRating = async () => {}