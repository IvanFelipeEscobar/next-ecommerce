import FavoriteToggleButton from '@/components/products/FavoriteToggleButton'
import AddToCart from '@/components/single-product/AddToCart'
import BreadCrumbs from '@/components/single-product/BreadCrumbs'
import ProductRating from '@/components/single-product/ProductRating'
import { fetchSingleProduct } from '@/lib/actions'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

const SingleProduct = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params
  const product = await fetchSingleProduct(id)
  const { name, price, image, company, description } = product
  const dollarPrice = formatCurrency(price)

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 lg:h-3/4">
        <div className="relative h-[500px] lg:h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton productId={id} />
          </div>
          <ProductRating productId={id} />
          <h2 className="text-xl mt-2">{company}</h2>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {dollarPrice}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
    </section>
  )
}
export default SingleProduct
