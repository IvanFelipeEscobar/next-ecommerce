import Link from 'next/link'
import { Button } from '../ui/button'
import HeroCarousel from './HeroCarousel'

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          Forget everything you thought you knew about e-commerce
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur eius
          saepe velit modi, optio iusto consequuntur ex quis officia placeat
          adipisci, eligendi accusamus ut sapiente, voluptatem deserunt.
        </p>
        <Button asChild size={'lg'} className="mt-10">
          <Link href={'/products'}>Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}
export default Hero
