import Image from 'next/image'
import { Card, CardContent, CardHeader } from '../ui/card'
import Rating from './Rating'
import Comment from './Comment'

type ReviewCardProps = {
  comment: string
  rating: number
  name: string
  img: string
  children?: React.ReactNode
}
const ReviewCard = ({
  comment,
  rating,
  name,
  img,
  children,
}: ReviewCardProps) => {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <Image
            width={48}
            height={48}
            src={img}
            alt={name}
            className="size-12 rounded-full object-cover"
          />
      
        <div className="ml-4">
          <h2 className="text-sm font-bold capitalize mb-1">{name}</h2>
          <Rating rating={rating} />
        </div>  </div>
      </CardHeader>
      <CardContent>
        <Comment comment={comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  )
}
export default ReviewCard
