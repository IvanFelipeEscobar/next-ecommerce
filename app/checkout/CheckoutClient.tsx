'use client'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)
const Checkout = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const cartId = searchParams.get('cartId')

  const fetchClientSecret = useCallback(async () => {
    const { data } = await axios.post('/api/payment', {
      orderId,
      cartId,
    })
    return data.clientSecret
  }, [orderId, cartId])
  const options = { fetchClientSecret }
  return (
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

  )
}
export default Checkout
