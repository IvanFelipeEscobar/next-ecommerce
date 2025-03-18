import EmptyList from '@/components/global/EmptyList'
import { fetchFeatured } from '@/lib/actions'

const Favorites = async () => {
  const featured = await fetchFeatured()

  if (featured.length === 0)
    return <EmptyList heading="You have no favorites..." />
    
  return <div>Favorites</div>
}
export default Favorites
