import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ImageInput = () => {
    const name = 'image'
  return (
    <div className="mb-2">
        <Label htmlFor={name} className='capitalize'>{name}</Label>
        <Input id={name} name={name} type='file' required accept='image/*'/>
    </div>
  )
}
export default ImageInput