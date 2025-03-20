import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/products/ProductsGrid'
import { fetchFavorites } from '@/lib/actions'

const Favorites = async () => {
  const favorites = await fetchFavorites()

  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites..." />

  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favorites.map((fav) => fav.product)} />
    </div>
  )
}
export default Favorites
