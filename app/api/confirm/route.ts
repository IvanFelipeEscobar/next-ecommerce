import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const session_id = searchParams.get('session_id') as string

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    const orderId = session.metadata?.orderBy
    const cartId = session.metadata?.cartId

    if (session.status === 'complete') {
      await prisma.order.update({
        where: { id: orderId },
        data: { isPaid: true },
      })
      await prisma.cart.delete({
        where: { id: cartId },
      })
    }
  } catch (error) {
    console.log(error)
    return Response.json(null, {
      status: 500,
      statusText: 'Internal server error',
    })
  }
  redirect('/orders')
}
