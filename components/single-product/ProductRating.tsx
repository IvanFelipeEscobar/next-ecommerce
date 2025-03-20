import { fetchRating } from '@/lib/actions'
import { FaStar } from 'react-icons/fa'
const ProductRating = async ({ productId }: { productId: string }) => {
  
  const { count, rating } = await fetchRating(productId)

  const className = `flex gap-1 items-center text-md mt-1 mb-4`
  const countValue = `(${count}) review${count > 1 ? 's' : ''}`
  return (
    <span className={className}>
      <FaStar className="size-3" />
      {rating} {countValue}
    </span>
  )
}
export default ProductRating
