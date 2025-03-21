import { formatCurrency } from '@/lib/utils'
import type { Product } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import FavoriteToggleButton from './FavoriteToggleButton'

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { name, price, image, id, amountInStock } = product
        const productId = id
        const dollarPrice = formatCurrency(price)
        return (
          <article key={id} className="group relative">
            <Link href={amountInStock > 0 ? `/products/${productId}` : {}}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent>
                  <div className="relative h-64 md:h-48 rounded-bl-md overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="capitalize text-lg">{name}</h2>
                    <p className="text-muted-foreground mt-2">{dollarPrice}</p>
                  </div>
                 { amountInStock === 0 ?
                  <p className='absolute top-9 -left-2 -rotate-45 bg-red-400 rounded-full px-3 font-mono text-xs'>out of stock</p>
                : amountInStock === 1 ?
                  <p className='absolute top-9 -left-2 -rotate-45 bg-yellow-300 rounded-full px-3 font-mono text-xs'>only 1 left</p> : ''
                 }
                  
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-9 right-9 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}
export default ProductsGrid
