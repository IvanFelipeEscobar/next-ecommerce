import { formatCurrency } from '@/lib/utils'
import type { Product } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import FavoriteToggleButton from './FavoriteToggleButton'

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { name, price, image, company, id, amountInStock } = product
        const productId = id
        const dollarPrice = formatCurrency(price)
        return (
          <article key={productId} className="group relative">
            <Link href={ amountInStock > 0 ? `/products/${productId}` : {}}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64 md:size-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {dollarPrice}
                  </p>
                  {amountInStock === 0 ? (
                    <p className="absolute top-9 -left-2 -rotate-45 bg-red-400 rounded-full px-3 font-mono text-xs">
                      out of stock
                    </p>
                  ) : amountInStock === 1 ? (
                    <p className="absolute top-9 -left-2 -rotate-45 bg-yellow-300 rounded-full px-3 font-mono text-xs">
                      only 1 left
                    </p>
                  ) : (
                    ''
                  )}
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}
export default ProductsList
