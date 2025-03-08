import hero1 from '@/public/images/hero1.jpg'
import hero2 from '@/public/images/hero2.jpg'
import hero3 from '@/public/images/hero3.jpg'
import hero4 from '@/public/images/hero4.jpg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

const imgArr = [hero1, hero2, hero3, hero4]
const HeroCarousel = () => {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {imgArr.map((img, i) => (
            <CarouselItem key={i}>
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={img}
                    alt={`hero-${i}`}
                    className="p-2 w-full h-[24rem] rounded-md object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext />
      </Carousel>
    </div>
  )
}
export default HeroCarousel
