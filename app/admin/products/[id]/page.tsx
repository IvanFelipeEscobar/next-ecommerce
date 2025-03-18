import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckboxInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import PriceInput from '@/components/form/PriceInput'
import TextArea from '@/components/form/TextArea'
import { fetchProductDetails, updateProduct } from '@/lib/actions'

const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { name, company, description, featured, price } =
    await fetchProductDetails(id)
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={updateProduct}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company name"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextArea
            name="description"
            label="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}
export default EditProduct
