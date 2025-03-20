import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import SectionTitle from '@/components/global/SectionTitle'
import ReviewCard from '@/components/reviews/ReviewCard'
import { deleteReview, fetchReviewsFromUser } from '@/lib/actions'

const Reviews = async () => {
  const reviews = await fetchReviewsFromUser()
  if (reviews.length === 0)
    return <SectionTitle text="you have not made any reviews yet..." />

  return (
    <>
      <SectionTitle text="your reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const info = {
            comment: review.comment,
            rating: review.rating,
            name: review.product.name,
            img: review.product.image,
          }
          return (
            <ReviewCard key={review.id} {...info}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </section>
    </>
  )
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteAction = deleteReview.bind(null, { reviewId })
  return (
    <FormContainer action={deleteAction}>
      <IconButton actionType="delete" />
    </FormContainer>
  )
}
export default Reviews
