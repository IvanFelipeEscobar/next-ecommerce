import { CartItemWithProduct } from "@/lib/types"
import { Card } from "../ui/card"
import { CardFirstComponent, CardFourthComponent, CardSecondComponent } from "./CartCardComponents"
import CartThirdComponent from "./CartCardThirdComponent"

const CartItemsContainer = ({cartItems} :{ cartItems: CartItemWithProduct[]}) => {
  
  return (
    <div>
      {cartItems.map(item => {
        const { id, amount, product} = item
        const { image, name, company, price, id: productId } = product
        return <Card key={id} className="flex flex-col gap-4 md:flex-row flex-wrap p-6 mb-8">
          <CardFirstComponent image={image} name={name} />
          <CardSecondComponent name={name} company={company} productId={productId} />
          <CartThirdComponent id={id} qty={amount} />
          <CardFourthComponent price={+price}/>
        </Card>
      })}
    </div>
  )
}
export default CartItemsContainer