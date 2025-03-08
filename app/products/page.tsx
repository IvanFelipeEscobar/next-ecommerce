import ProductsContainer from '@/components/products/ProductsContainer'

const Products = async ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string }
}) => {
  const sP = await searchParams
  const layout = sP.layout || 'grid'
  const search = sP.search || ''
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  )
}
export default Products
