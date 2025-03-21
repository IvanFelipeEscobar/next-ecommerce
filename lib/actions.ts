'use server'
import { redirect } from 'next/navigation'
import prisma from './prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithSchema,
} from './schema'
import { deleteImage, uploadImage } from './supabase'
import { revalidatePath } from 'next/cache'
import { Cart } from '@prisma/client'

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

export const fetchFavorites = async () => {
  const user = await getAuth()
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  })
  return favorites
}

export const createReview = async (prevState: unknown, formData: FormData) => {
  const user = await getAuth()
  try {
    const data = Object.fromEntries(formData)
    const reviewData = validateWithSchema(reviewSchema, data)
    await prisma.review.create({
      data: { ...reviewData, clerkId: user.id },
    })
    revalidatePath(`/products/${reviewData.productId}`)
    return { message: 'Your review has been submitted' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchReviews = async (productId: string) =>
  await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' },
  })

export const fetchRating = async (productId: string) => {
  const ratings = await prisma.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: { productId },
  })
  return {
    rating: ratings[0]?._avg.rating?.toFixed(1) ?? 0,
    count: ratings[0]?._count.rating ?? 0,
  }
}

export const fetchReviewsFromUser = async () => {
  const user = await getAuth()
  return await prisma.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  })
}
export const deleteReview = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState
  const user = await getAuth()
  try {
    await prisma.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    })
    revalidatePath('/reviews')
    return { message: 'Review has been deleted' }
  } catch (error) {
    return renderError(error)
  }
}
export const findReview = async (userId: string, productId: string) =>
  await prisma.review.findFirst({
    where: { clerkId: userId, productId },
  })

export const fetchCartItems = async () => {
  const { userId } = await auth()
  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? '',
    },
    select: {
      numItemsInCart: true,
    },
  })
  return cart?.numItemsInCart || 0
}

const fetchProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  })
  if (!product || product.amountInStock === 0)
    throw new Error('product not found')
  return product
}

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string
  errorOnFailure?: boolean
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  })
  if (!cart && errorOnFailure) throw new Error('Cart not found')

  if (!cart) {
    cart = await prisma.cart.create({
      data: { clerkId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    })
  }
  return cart
}

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  })

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    })
  } else {
    cartItem = await prisma.cartItem.create({
      data: { amount, productId, cartId },
    })
  }
}

export const updateCart = async (cart: Cart) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  })
  let cartItemsAmt = 0
  let cartTotal = 0
  for (const item of cartItems) {
    cartItemsAmt += item.amount
    cartTotal += item.amount * +item.product.price
  }
  const tax = +cart.taxRate * cartTotal
  const shipping = cartTotal ? +cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping

  const currentCart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart: cartItemsAmt,
      cartTotal,
      tax,
      orderTotal,
    },
    include: {
      cartItems: {
        include: {
          product: true
        }
      }
    }
  })
  return currentCart
}

export const addToCartAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await getAuth()
  try {
    const productId = formData.get('productId') as string
    const amount = Number(formData.get('amount'))
    await fetchProduct(productId)
    const cart = await fetchOrCreateCart({ userId: user.id })
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount })
    await updateCart(cart)
    await prisma.product.update({
      where: {id: productId},
      data: {
        amountInStock: { decrement: amount}
      }
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/cart')
}

export const removeCartItemAction = async () => {}

export const updateCartItemAction = async () => {}

export const createOrder = async (prevState: unknown, formData: FormData) => {
  console.log(prevState, formData)
  return {message: 'order created'}
}