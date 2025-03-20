import { fetchReviews } from '@/lib/actions'
import SectionTitle from '../global/SectionTitle'
import ReviewCard from './ReviewCard'

const ProductReviews = async ({ productId }: { productId: string }) => {
  const reviews = await fetchReviews(productId)

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />
      <div className='grid md:grid-cols-2 gap-8 my-8'>
      {reviews.map((review) => {
        const { comment, rating, authorAvatar, authorName, id } = review
        const reviewInfo = {
          comment,
          rating,
          img: authorAvatar,
          name: authorName,
        }
        return <ReviewCard key={id} {...reviewInfo}/>
      })}</div>
    </div>
  )
}
export default ProductReviews
