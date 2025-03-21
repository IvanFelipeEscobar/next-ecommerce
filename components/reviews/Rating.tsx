import { FaRegStar, FaStar } from 'react-icons/fa'

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating)

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((star, i) => {
        const className = `size-3 ${star ? 'text-primary' : 'text-gray-400'}`
        return star ? (
          <FaStar className={className} key={i} />
        ) : (
          <FaRegStar className={className} key={i} />
        )
      })}
    </div>
  )
}
export default Rating
