import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export enum InputMode {
  SingleProduct = 'single product',
  CartItem = 'cartItem',
}
type SelectProductAmountProps = {
  mode: InputMode.SingleProduct
  amountInStock: number
  amount: number
  setAmount: (val: number) => void
}
type SelectCartItemAmountProps = {
  mode: InputMode.CartItem
  amountInStock: number
  amount: number
  setAmount: (val: number) => Promise<void>
  isLoading: boolean
}
const SelectProductAmount = (
  props: SelectProductAmountProps | SelectCartItemAmountProps
) => {
  const { mode, amount, setAmount, amountInStock } = props
  const cartItem = mode === InputMode.CartItem
  return (
    <>
      <h4 className="mb-2">Amount</h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(val) => setAmount(+val)}
        disabled={cartItem && props.isLoading}
      >
        <SelectTrigger className={cartItem ? 'w-[100px]' : 'w-[150px]'}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: amountInStock < 20 ? (amountInStock + amount) : 20}, (_, i) => {
            const selectValue = (i + 1).toString()
            return (
              <SelectItem key={selectValue} value={selectValue}>
                {selectValue}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </>
  )
}
export default SelectProductAmount
