import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const name = 'price'

const PriceInput = ({ defaultValue }: { defaultValue?: number }) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {name} ($)
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        step='any'
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  )
}
export default PriceInput
