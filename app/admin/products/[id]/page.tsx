const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  console.log(id)
  return <div>EditProduct</div>
}
export default EditProduct
