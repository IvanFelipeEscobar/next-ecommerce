import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

const CheckoutPage = () => {
  return (
    <Suspense>
      <CheckoutClient />
    </Suspense>
  )
}

export default CheckoutPage
