'use client'

import { useState } from 'react'
import SelectProductAmount, {
  InputMode,
} from '../single-product/SelectProductAmount'
import FormContainer from '../form/FormContainer'
import { removeCartItemAction, updateCartItemAction } from '@/lib/actions'
import { SubmitButton } from '../form/Buttons'
import { toast } from 'sonner'

const CartThirdComponent = ({
  id,
  qty,
  amountInStock,
  productId,
}: {
  id: string
  qty: number
  amountInStock: number
  productId: string
}) => {
  const [amount, setAmount] = useState(qty)
  const [isLoading, setIsLoading] = useState(false)
  const handleAmountChange = async (val: number) => {
    setIsLoading(true)
    const res = await updateCartItemAction({
      amount: val,
      cartItemId: id,
      productId,
    })
    toast('updating...')
    setAmount(val)
    toast(res.message)
    setIsLoading(false)
  }
  console.log(amountInStock)
  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={InputMode.CartItem}
        isLoading={isLoading}
        amountInStock={amountInStock}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="productId" value={productId} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  )
}
export default CartThirdComponent
