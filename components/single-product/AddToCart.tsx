'use client'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import SelectProductAmount, { InputMode } from './SelectProductAmount'
import { ProductSigninButton, SubmitButton } from '../form/Buttons'
import FormContainer from '../form/FormContainer'
import { addToCartAction } from '@/lib/actions'

const AddToCart = ({
  productId,
  amountInStock,
}: {
  productId: string
  amountInStock: number
}) => {
  const [amount, setAmount] = useState(1)
  const { userId } = useAuth()
  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={InputMode.SingleProduct}
        amount={amount}
        amountInStock={amountInStock}
        setAmount={setAmount}
      />
      {!userId ? (
        <ProductSigninButton />
      ) : (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text='add to cart'className='mt-8' />
        </FormContainer>
      )}
    </div>
  )
}
export default AddToCart
