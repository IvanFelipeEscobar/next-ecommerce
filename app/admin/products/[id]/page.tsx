import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckboxInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'
import PriceInput from '@/components/form/PriceInput'
import TextArea from '@/components/form/TextArea'
import { fetchProductDetails, updateImage, updateProduct } from '@/lib/actions'

const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { name, company, description, featured, price, image, amountInStock } =
    await fetchProductDetails(id)
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          action={updateImage}
          name={name}
          image={image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </ImageInputContainer>
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
            <FormInput
              type="number"
              name="amountInStock"
              label="amount in stock"
              defaultValue={amountInStock.toString()}
            />
            <PriceInput defaultValue={+price} />
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
