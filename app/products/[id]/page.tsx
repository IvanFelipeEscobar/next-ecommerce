import FavoriteToggleButton from '@/components/products/FavoriteToggleButton'
import ProductReviews from '@/components/reviews/ProductReviews'
import SubmitReview from '@/components/reviews/SubmitReview'
import AddToCart from '@/components/single-product/AddToCart'
import BreadCrumbs from '@/components/single-product/BreadCrumbs'
import ProductRating from '@/components/single-product/ProductRating'
import ShareButton from '@/components/single-product/ShareButton'
import { Button } from '@/components/ui/button'
import { fetchSingleProduct, findReview } from '@/lib/actions'
import { formatCurrency } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const product = await fetchSingleProduct(id)
  const { name, price, image, company, description, amountInStock } = product
  const dollarPrice = formatCurrency(price)
  const { userId } = await auth()
  const noReviewFromUser = userId && !(await findReview(userId, id))
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
            <div className="flex items-center gap-x-2">
              <FavoriteToggleButton productId={id} />
              <ShareButton productId={id} name={name} />
            </div>
          </div>
          <ProductRating productId={id} />
          <h2 className="text-xl mt-2">{company}</h2>
          <div className="flex items-center justify-between">
            <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
              {dollarPrice}
            </p>{' '}
            <p className="text-muted-foreground">
              <span className="font-extrabold">Items in stock:</span>{' '}
              {amountInStock}
            </p>
          </div>

          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          {amountInStock > 0 ? (
            <AddToCart productId={id} amountInStock={amountInStock}/>
          ) : (
            <Button className="capitalize mt-8" variant={'outline'} disabled>
              Currently out of Stock
            </Button>
          )}
        </div>
      </div>
      <ProductReviews productId={id} />
      {noReviewFromUser && <SubmitReview productId={id} />}
    </section>
  )
}
export default SingleProduct
