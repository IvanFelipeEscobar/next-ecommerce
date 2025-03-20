'use client'
import { toggleFavorite } from '@/lib/actions'
import { usePathname } from 'next/navigation'
import FormContainer from '../form/FormContainer'
import { CardSubmitButton } from '../form/Buttons'

const FavoriteToggleForm = ({
  favoriteId,
  productId,
}: {
  favoriteId: string | null
  productId: string
}) => {
  const pathName = usePathname()

  const toggleAction = toggleFavorite.bind(null, {
    productId,
    favoriteId,
    pathName,
  })

  return (
    <FormContainer action={toggleAction}>
      
      <CardSubmitButton isFav={!!favoriteId} />
      
    </FormContainer>
  )
}
export default FavoriteToggleForm
