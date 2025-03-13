import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
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
         <FormInput name='name' type='text' label='create product' defaultValue={name}/>
          <Button type="submit" size={'lg'}>
            Submit
          </Button>
        </form>
      </div>
    </section>
  )
}
export default CreateProduct
