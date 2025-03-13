import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
type TextAreaProps = {
  name: string
  label: string
  defaultValue?: string
}

const TextArea = ({ name, label, defaultValue }: TextAreaProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
        className="leading-loose"
      />
    </div>
  )
}
export default TextArea
