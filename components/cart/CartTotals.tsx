import { formatCurrency } from '@/lib/utils'
import { Cart } from '@prisma/client'
import { Separator } from '../ui/separator'
import { Card, CardTitle } from '../ui/card'
import FormContainer from '../form/FormContainer'
import { createOrder } from '@/lib/actions'
import { SubmitButton } from '../form/Buttons'

const CartTotalField = ({
  label,
  amount,
  lastRow,
}: {
  label: string
  amount: number
  lastRow?: boolean
}) => {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span className="capitalize">{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator />}
    </>
  )
}

const CartTotals = ({ cart }: { cart: Cart }) => {
  return (
    <div>
      <Card className="p-8">
        <CartTotalField label="subtotal" amount={+cart.cartTotal} />
        <CartTotalField label="shipping" amount={+cart.shipping} />
        <CartTotalField label="tax" amount={+cart.tax} />
        <CardTitle className="mt-8">
          <CartTotalField
            label="order total"
            amount={+cart.orderTotal}
            lastRow
          />
        </CardTitle>
      </Card>
      <FormContainer action={createOrder}>
        <SubmitButton text='place order' className='w-full mt-8'/>
      </FormContainer>
    </div>
  )
}

export default CartTotals
