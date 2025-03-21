import CartItemsContainer from '@/components/cart/CartItemsContainer'
import CartTotals from '@/components/cart/CartTotals'
import SectionTitle from '@/components/global/SectionTitle'
import { fetchOrCreateCart, updateCart } from '@/lib/actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Cart = async () => {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const previousCart = await fetchOrCreateCart({ userId })
  const cart = await updateCart(previousCart)
  if (cart.numItemsInCart === 0)
    return <SectionTitle text="you car is currently empty" />

  return <>
  <SectionTitle text='shopping cart' />
  <div className="mt-8 grid gap-4 lg:grid-cols-12">
    <div className="lg:col-span-8">
      <CartItemsContainer cartItems={cart.cartItems} />
    </div>
    <div className="lg:col-span-4">
      <CartTotals cart={cart} />
    </div>
  </div>
  </>
}
export default Cart
