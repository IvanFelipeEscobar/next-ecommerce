import { auth } from '@clerk/nextjs/server'
import { CardSigninButton } from '../form/Buttons'
import { fetchFavId } from '@/lib/actions'
import FavoriteToggleForm from './FavoriteToggleForm'

const FavoriteToggleButton = async ({productId} : { productId: string}) => {
  const {userId} = await auth()
   if (!userId) return <CardSigninButton />

   const favId = await fetchFavId({productId})
  return <FavoriteToggleForm favoriteId={favId} productId={productId} />
}
export default FavoriteToggleButton
