import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckboxInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import PriceInput from '@/components/form/PriceInput'
import TextArea from '@/components/form/TextArea'
import { createProduct } from '@/lib/actions'
import { faker } from '@faker-js/faker'

const CreateProduct = () => {
  const name = faker.commerce.productName()
  const company = faker.company.name()
  const description = faker.lorem.paragraph({ min: 10, max: 12 })
  return (
    <section>
      <h1 className="text-2xl font-semi-bold capitalize mb-8">
        create product
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProduct}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
            <TextArea
              name="description"
              label="product description"
              defaultValue={description}
            />
            <div className="mt-6">
              <CheckboxInput name="featured" label="featured" />
            </div>
            <SubmitButton text="create product" className="mt-8" />{' '}
          </div>
        </FormContainer>
      </div>
    </section>
  )
}
export default CreateProduct
