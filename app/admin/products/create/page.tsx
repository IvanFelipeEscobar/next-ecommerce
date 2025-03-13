import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createProduct } from '@/lib/actions'
import {faker} from '@faker-js/faker'

const CreateProduct = () => {
  const name = faker.commerce.productName()
  // const company = faker.company.name()
  // const description = faker.lorem.paragraph({min: 10, max: 12})
  return (
    <section>
      <h1 className="text-2xl font-semi-bold capitalize mb-8">
        create product
      </h1>
      <div className="border p-8 rounded-md">
        <form action={createProduct}>
          <div className="mb-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id='name' name='name' type='text' defaultValue={name}></Input>
            <Button type='submit' size={'lg'}>Submit</Button>
          </div>
        </form>
      </div>
    </section>
  )
}
export default CreateProduct
