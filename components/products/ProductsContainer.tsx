import { fetchProducts } from "@/lib/actions"
import ProductsList from "./ProductsList"
import ProductsGrid from "./ProductsGrid"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import Link from "next/link"
import { LuLayoutGrid, LuList } from "react-icons/lu"

const ProductsContainer = async ({
  layout,
  search,
}: {
  layout: string
  search: string
}) => {
  const products = await fetchProducts({search})
  const totalProducts = products.length
  const searchTerm = search ? `&search=${search}` : ''

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && 's'}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  )
}
export default ProductsContainer
